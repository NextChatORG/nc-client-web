// This plugin is based on https://github.com/hmsk/vite-plugin-markdown

import { transformSync } from '@babel/core';
import { Element, Node as DOMHandlerNode } from 'domhandler';
import Frontmatter from 'front-matter';
import { DomUtils, parseDocument } from 'htmlparser2';
import { marked } from 'marked';
import { TransformResult } from 'rollup';
import { Plugin } from 'vite';

interface TOCData {
  children: TOCData[];
  content: string;
  id: string;
  level: number;
}

function parser(code: string, id: string): TransformResult {
  if (!id.endsWith('.md')) return null;

  const fm = Frontmatter<unknown>(code);

  const html = marked.parse(fm.body);

  const reactRoot = parseDocument(html, { lowerCaseTags: false });
  const TOCRoot = parseDocument(html);

  function markCodeAsPre(node: DOMHandlerNode) {
    if (node instanceof Element) {
      if (node.tagName.match(/^[A-Z].+/)) {
        node.tagName = `SubReactComponent.${node.tagName}`;
      }

      if (['pre', 'code'].includes(node.tagName) && node.attribs?.class) {
        node.attribs.className = node.attribs.class;
        delete node.attribs.class;
      }

      if (node.tagName === 'code') {
        const codeContent = DomUtils.getInnerHTML(node, {
          decodeEntities: true,
        });

        node.attribs.dangerouslySetInnerHTML = `vfm{{ __html: \`${codeContent.replace(
          /([\\`])/g,
          '\\$1',
        )}\`}}vfm`;

        node.childNodes = [];
      }

      if (node.childNodes.length > 0) {
        node.childNodes.forEach(markCodeAsPre);
      }
    }
  }

  reactRoot.children.forEach(markCodeAsPre);

  const h = DomUtils.getOuterHTML(reactRoot, { selfClosingTags: true })
    .replace(/"vfm{{/g, '{{')
    .replace(/}}vfm"/g, '}}');

  const reactCode = `const markdown = <>${h}</>`;

  const compiledReactCode = `
    function (props) {
      Object.keys(props ?? {}).forEach(function (key) {
        SubReactComponent[key] = props[key];
      });

      ${
        transformSync(reactCode, {
          ast: false,
          presets: ['@babel/preset-react'],
        }).code
      }

      return markdown;
    }
  `;

  const indexes = TOCRoot.children.filter(
    (el) =>
      el instanceof Element &&
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(el.tagName),
  ) as unknown as Element[];

  let curLevel = 0;
  let curIndex: number[] = [];

  const toc: TOCData[] = indexes
    .map((el) => ({
      content: DomUtils.getInnerHTML(el),
      id: el.attribs['id'],
      level: Number(el.tagName.replace('h', '')),
    }))
    .reduce((prev: TOCData[], cur) => {
      if (cur.level === 1) {
        const i = prev.push({ children: [], ...cur });
        curIndex = [i - 1];
        curLevel = 2;
        return prev;
      }

      if (cur.level < curLevel) {
        for (let i = 0; i < curLevel - cur.level; i++) {
          curIndex.pop();
        }

        curLevel = cur.level;
      }

      if (curIndex.length != cur.level - 1) return prev;

      let toAdd: TOCData;
      for (const index of curIndex) {
        if (!toAdd) {
          toAdd = prev[index];
          continue;
        }

        toAdd = toAdd.children[index];
      }

      const i = toAdd.children.push({ children: [], ...cur });

      curIndex.push(i - 1);
      curLevel = cur.level + 1;

      return prev;
    }, []);

  return {
    code: `
      import React from 'react';

      export const toc = ${JSON.stringify(toc)};

      const SubReactComponent = {};

      export default ${compiledReactCode}
    `,
  };
}

export default function MarkdownParser(): Plugin {
  return {
    name: 'nextchat-plugin-markdown',
    enforce: 'pre',
    transform(code, id) {
      return parser(code, id);
    },
  };
}
