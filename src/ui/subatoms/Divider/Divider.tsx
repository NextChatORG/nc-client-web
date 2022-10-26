import clsx from 'clsx';
import classes from './Divider.module.sass';

export interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps): JSX.Element {
  return <div className={clsx(classes.divider, className)} />;
}
