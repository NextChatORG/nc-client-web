import clsx from 'clsx';
import classes from './Badge.module.sass';

export interface BadgeProps {
  className?: string;
  color?: 'error' | 'primary';
  counter: number;
  style?: React.CSSProperties;
}

export function Badge({
  className,
  color = 'primary',
  counter,
  style,
}: BadgeProps): JSX.Element {
  return (
    <div
      className={clsx(
        className,
        classes.badge,
        classes[`badge--color${color[0].toUpperCase() + color.slice(1)}`],
      )}
      style={style}
    >
      {counter > 99 ? '+99' : counter}
    </div>
  );
}
