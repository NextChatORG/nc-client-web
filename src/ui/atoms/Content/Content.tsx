import clsx from 'clsx';
import classes from './Content.module.sass';

export interface ContentProps {
  className?: string;
  fullHeight?: boolean;
  noPadding?: boolean;
  style?: React.CSSProperties;
}

export function Content({
  children,
  className,
  fullHeight,
  noPadding,
  style,
}: React.PropsWithChildren<ContentProps>): JSX.Element {
  return (
    <section
      className={clsx(className, classes.content, {
        [classes['content--fullHeight']]: fullHeight,
        [classes['content--padding']]: !noPadding,
      })}
      style={style}
    >
      {children}
    </section>
  );
}
