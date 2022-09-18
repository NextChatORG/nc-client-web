import clsx from 'clsx';
import classes from './Content.module.sass';

export interface ContentProps {
  className?: string;
  fullHeight?: boolean;
  noPadding?: boolean;
}

export function Content({
  children,
  className,
  fullHeight,
  noPadding,
}: React.PropsWithChildren<ContentProps>): JSX.Element {
  return (
    <section
      className={clsx(className, classes.content, {
        [classes['content--fullHeight']]: fullHeight,
        [classes['content--padding']]: !noPadding,
      })}
    >
      {children}
    </section>
  );
}
