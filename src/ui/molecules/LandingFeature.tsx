import { Button, ButtonProps } from '@nc-ui';
import clsx from 'clsx';

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
      className={clsx(
        'flex flex-col items-center max-w-[90%]',
        'sm:flex-row sm:gap-3 sm:max-w-[80%]',
        'lg:max-w-[70%] xl:max-w-[53%]',
        { 'sm:flex-row-reverse': position === 'right' },
      )}
    >
      <div className="w-[60%] sm:w-[500px]">{icon}</div>
      <div className="flex flex-col items-center sm:items-start">
        <h2 className="text-[24px] text-center font-medium sm:text-left">
          {title}
        </h2>
        <p className="text-center mt-1 sm:text-left">{description}</p>
        {action && (
          <Button {...action} className={clsx(action.className, 'mt-2')}>
            {action.message}
          </Button>
        )}
      </div>
    </div>
  );
}
