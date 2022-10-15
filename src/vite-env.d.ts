/// <reference types="vite/client" />

import type { TOCData } from '@nc-core/interfaces/markdown';

declare module '*.md' {
  const toc: TOCData[];

  import React from 'react';
  const ReactComponent: React.FC;

  export { toc };
  export default ReactComponent;
}
