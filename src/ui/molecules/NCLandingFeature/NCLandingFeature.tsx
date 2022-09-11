import clsx from "clsx";
import { NCButton, NCButtonProps } from "../../atoms";
import classes from './NCLandingFeature.module.sass';

export interface NCLandingFeatureProps {
  action?: NCButtonProps & { message: string };
  description: string;
  icon: React.ReactNode;
  position?: 'left' | 'right';
  title: string;
}

export const NCLandingFeature: React.FC<NCLandingFeatureProps> = ({
  action,
  description,
  icon,
  position = 'left',
  title
}) => {
  return (
    <div
      className={clsx(classes.ncLandingFeature, {
        [classes['ncLandingFeature--right']]: position === 'right'
      })}
    >
      <div className={classes.ncLandingFeature__icon}>{icon}</div>
      <div className={classes.ncLandingFeature__content}>
        <h2>{title}</h2>
        <span>{description}</span>
        {action && (
          <NCButton {...action}>
            {action.message}
          </NCButton>
        )}
      </div>
    </div>
  );
};
