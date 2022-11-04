import {
  BLOG_ROUTE,
  DEV_API_ROUTE,
  DEV_DOCS_ROUTE,
  DEV_OPEN_SOURCE_ROUTE,
  FAQS_ROUTE,
  HELP_ROUTE,
  PRIVACY_POLICY_ROUTE,
  TERMS_ROUTE,
} from '@nc-core/constants/routes';
import { Button, ButtonProps, Logo } from '@nc-ui';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const FOOTER_SECTIONS = [
  {
    children: [
      { title: 'Descarga', to: '/download' },
      { title: 'Nuestro equipo', to: '/team' },
      { title: 'Blog', to: BLOG_ROUTE },
      { title: 'Opiniones', to: '/feedback' },
    ],
    title: 'General',
  },
  {
    children: [
      { title: 'Documentación', to: DEV_DOCS_ROUTE },
      { title: 'Referencias del API', to: DEV_API_ROUTE },
      { title: 'Código abierto', to: DEV_OPEN_SOURCE_ROUTE },
    ],
    title: 'Desarrolladores',
  },
  {
    children: [
      { title: 'Preguntas frecuentes', to: FAQS_ROUTE },
      { title: 'Soporte técnico', to: '/support' },
      { title: 'Centro de Ayuda', to: HELP_ROUTE },
    ],
    title: 'Recursos',
  },
  {
    children: [
      { title: 'Compañía', to: '/about' },
      { title: 'Agradecimientos', to: '/agrees' },
    ],
    title: 'Acerca de',
  },
];

export interface FooterProps {
  actionButton?: ButtonProps & { message: string };
}

export function Footer({ actionButton }: FooterProps): JSX.Element {
  return (
    <footer className="bg-dark-700 w-full px-2">
      <div
        className={clsx(
          'flex flex-col sm:flex-row sm:items-start sm:justify-between',
          'gap-2 sm:gap-4 px-1 sm:px-3 py-3 sm:py-4',
        )}
      >
        <div className="flex-1 flex flex-row flex-wrap gap-2 sm:gap-x-0 sm:gap-y-4">
          {FOOTER_SECTIONS.map((data, i) => (
            <section
              className="flex flex-col gap-1 basis-full sm:basis-1/2 lg:basis-1/4"
              key={`footer_section_${i}`}
            >
              <p className="text-[21px] font-medium">{data.title}</p>
              {data.children.map((child, j) => (
                <Link
                  className="text-white/60 text-[14px]"
                  key={`footer_section_${i}_url_${j}`}
                  to={child.to}
                >
                  {child.title}
                </Link>
              ))}
            </section>
          ))}
        </div>
        <section className="hidden sm:flex flex-col items-center gap-2">
          <Logo onlyIcon size="big" />
          {actionButton && (
            <Button {...actionButton}>{actionButton.message}</Button>
          )}
        </section>
      </div>
      <section
        className={clsx(
          'text-[14px] border-t-[1px] border-white p-1 pb-2 lg:pb-1 sm:px-3',
          'flex flex-col sm:flex-row items-center sm:justify-between gap-1',
        )}
      >
        <p className="font-medium">&copy; NextChat 2022 ~ v0.1.0</p>
        <div className="flex flex-wrap items-center justify-center gap-1">
          <Link to={TERMS_ROUTE}>Términos y Condiciones</Link>
          <Link to={PRIVACY_POLICY_ROUTE}>Políticas de Privacidad</Link>
        </div>
      </section>
    </footer>
  );
}
