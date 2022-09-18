import clsx from 'clsx';
import classes from './Label.module.sass';

export interface LabelProps {
  layout?: 'horizontal' | 'vertical';
  name: string;
  value: string;
}

export function Label({
  layout = 'horizontal',
  name,
  value,
}: LabelProps): JSX.Element {
  return (
    <div className={clsx(classes.label, classes[`label--${layout}`])}>
      <span className={classes.label__name}>{name}</span>
      <span className={classes.label__value}>{value}</span>
    </div>
  );
}
