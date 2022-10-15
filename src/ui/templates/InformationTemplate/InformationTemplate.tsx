import { useAuth } from '@nc-core/hooks';
import { Footer, Grid, Header, Typography } from '@nc-ui';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { MainTemplate } from '../';
import classes from './InformationTemplate.module.sass';

interface TOCData {
  children: TOCData[];
  content: string;
  id: string;
  level: number;
}

export interface InformationTemplateProps {
  id: string;
}

export function InformationTemplate({
  id,
}: InformationTemplateProps): JSX.Element | null {
  const [markdown, setMarkdown] = useState<React.ReactElement | null>(null);
  const [titles, setTitles] = useState<TOCData[]>([]);

  const { isLogged } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const file = await import(`../../../core/i18n/es/md/${id}.md`);

        const Component = file.default;

        setMarkdown(<Component />);
        setTitles(file.toc);
      } catch (error) {
        console.error(error);

        setMarkdown(null);
        setTitles([]);
      }
    })();
  }, []);

  if (!markdown) return null;

  function renderTitle(title: TOCData, i: number): React.ReactElement {
    return (
      <li
        className={classes.informationTemplate__nav__ul__li}
        key={`nav_item_${i}_${title.id}`}
      >
        <a
          className={classes.informationTemplate__nav__ul__li__a}
          dangerouslySetInnerHTML={{ __html: title.content }}
          href={`#${title.id}`}
        />
        {title.children.length > 0 && (
          <ul
            className={classes.informationTemplate__nav__ul}
            data-level={title.level + 1}
          >
            {title.children.map(renderTitle)}
          </ul>
        )}
      </li>
    );
  }

  const content = (
    <div
      className={clsx(classes.informationTemplate, {
        [classes['informationTemplate--logged']]: isLogged,
      })}
    >
      <Grid
        container
        direction={isLogged ? 'row-reverse' : undefined}
        spacing={isLogged ? 48 : 60}
      >
        <Grid item xs={3}>
          <nav className={classes.informationTemplate__nav}>
            <Typography
              withLetterSpacing
              className={classes.informationTemplate__nav__title}
              variant="title"
            >
              Navegación
            </Typography>
            <ul className={classes.informationTemplate__nav__ul} data-level="1">
              {titles.map(renderTitle)}
            </ul>
          </nav>
        </Grid>
        <Grid item xs={9}>
          <div className={classes.informationTemplate__markdown}>
            {markdown}
          </div>
        </Grid>
      </Grid>
    </div>
  );

  if (isLogged) {
    return (
      <MainTemplate noPadding>
        <Grid item xs={12}>
          {content}
        </Grid>
        <Footer />
      </MainTemplate>
    );
  }

  return (
    <>
      <Header
        auth={{
          navButtons: [
            {
              color: 'white',
              link: true,
              message: 'Inicia sesión',
              to: '/login',
              variant: 'text',
            },
            {
              color: 'white',
              link: true,
              message: 'Regístrate',
              to: '/signup',
              variant: 'outlined',
            },
          ],
        }}
      />
      {content}
      <Footer
        actionButton={{
          color: 'white',
          link: true,
          message: 'Regístrate',
          to: '/signup',
          variant: 'outlined',
        }}
      />
    </>
  );
}
