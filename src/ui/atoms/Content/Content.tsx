import clsx from 'clsx';
import classes from './Content.module.sass';

export interface ContentProps {
  fullHeight?: boolean;
  noPadding?: boolean;
}

export function Content({
  children,
  fullHeight,
  noPadding,
}: React.PropsWithChildren<ContentProps>): JSX.Element {
  return (
    <section
      className={clsx(classes.content, {
        [classes['content--fullHeight']]: fullHeight,
        [classes['content--padding']]: !noPadding,
      })}
    >
      {children}
    </section>
  );
}
