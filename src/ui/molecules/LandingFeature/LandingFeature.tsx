import clsx from 'clsx';
import { Button, ButtonProps } from '../../atoms';
import classes from './LandingFeature.module.sass';

export interface LandingFeatureProps {
  action?: ButtonProps & { message: string };
  description: string;
  icon: React.ReactNode;
  position?: 'left' | 'right';
  title: string;
}

export function LandingFeature({
  action,
  description,
  icon,
  position = 'left',
  title,
}: LandingFeatureProps): JSX.Element {
  return (
    <div
      className={clsx(classes.landingFeature, {
        [classes['landingFeature--right']]: position === 'right',
      })}
    >
      <div className={classes.landingFeature__icon}>{icon}</div>
      <div className={classes.landingFeature__content}>
        <h2>{title}</h2>
        <span>{description}</span>
        {action && <Button {...action}>{action.message}</Button>}
      </div>
    </div>
  );
}
