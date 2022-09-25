import { ButtonColors } from '@nc-core/interfaces/ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../Badge';
import classes from './IconButton.module.sass';

interface IconButtonCommonProps {
  active?: boolean;
  color?: ButtonColors;
  counter?: number;
  disabled?: boolean;
  size?: 'normal' | 'small';
  variant?: 'contained' | 'transparent';
}

interface IconButtonLinkProps extends IconButtonCommonProps {
  link: true;
  external?: true;
  to: string;
}

interface IconButtonNormalProps extends IconButtonCommonProps {
  link?: false;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export type IconButtonProps = IconButtonLinkProps | IconButtonNormalProps;

export function IconButton({
  active = false,
  color = 'primary',
  counter = 0,
  children,
  disabled,
  size = 'normal',
  variant = 'contained',
  ...props
}: React.PropsWithChildren<IconButtonProps>): JSX.Element {
  const [isRippling, setRippling] = useState<boolean>(false);
  const [ripplePos, setRipplePos] = useState<[number, number] | null>(null);

  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    const rect = e.currentTarget.getBoundingClientRect();

    setRipplePos([e.clientX - rect.left, e.clientY - rect.top]);

    if (props.link) {
      if (props.external) window.open(props.to, '_blank');
      else navigate(props.to);
    } else props.onClick(e);
  }

  useEffect(() => {
    if (ripplePos) {
      setRippling(true);
      setTimeout(() => setRippling(false), 600);
    } else {
      setRippling(false);
    }
  }, [ripplePos]);

  useEffect(() => {
    if (!isRippling) setRipplePos(null);
  }, [isRippling]);

  return (
    <button
      className={clsx(
        classes.iconButton,
        classes[`iconButton--color${color[0].toUpperCase() + color.slice(1)}`],
        classes[`iconButton--${size}`],
        classes[`iconButton--${variant}`],
        {
          [classes['iconButton--active']]: active,
        },
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      <div className={classes.iconButton__button}>
        {isRippling && ripplePos && (
          <div
            className={classes.iconButton__button__rippleEffect}
            style={{ left: ripplePos[0], top: ripplePos[1] }}
          />
        )}
        <div>{children}</div>
      </div>
      {counter > 0 && (
        <Badge className={classes.iconButton__counter} counter={counter} />
      )}
    </button>
  );
}
