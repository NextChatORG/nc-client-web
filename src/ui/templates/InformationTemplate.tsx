import { useAuth } from '@nc-core/hooks';
import { Footer, Header } from '@nc-ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { MainTemplate } from '../';

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
      <li key={`nav_item_${i}_${title.id}`}>
        <a
          className="block tracking-wide hover:font-bold hover:no-underline"
          dangerouslySetInnerHTML={{ __html: title.content }}
          href={`#${title.id}`}
        />
        {title.children.length > 0 && (
          <ul className="flex flex-col gap-[8px] pl-1 not-first:mt-[8px]">
            {title.children.map(renderTitle)}
          </ul>
        )}
      </li>
    );
  }

  const content = (
    <div
      className={clsx(
        '<md:(flex flex-wrap gap-y-2) lg:(flex flex-wrap items-start)',
        isLogged ? 'p-4' : 'px-2 sm:px-5 pb-3 sm:pb-6 pt-1 sm:pt-2',
      )}
    >
      <nav
        className={clsx(
          'basis-full @md:(float-left mr-3 mb-2) bg-black/25 rounded-2xl p-2',
          'lg:(basis-1/3 sticky top-2) xl:basis-1/4',
        )}
      >
        <h2 className="block text-title text-center tracking-wide border-b-1 border-white/10 pb-[18px] mb-2">
          Navegación
        </h2>
        <ul className="flex flex-col gap-[8px]">{titles.map(renderTitle)}</ul>
      </nav>
      <div className="markdown basis-full <lg:px-1 lg:(basis-2/3 pl-3 pt-1) xl:basis-3/4">
        {markdown}
      </div>
    </div>
  );

  if (isLogged) {
    return (
      <MainTemplate noPadding>
        <section className="basis-full">{content}</section>
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
