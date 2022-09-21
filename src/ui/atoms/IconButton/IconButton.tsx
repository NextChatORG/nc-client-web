import { ButtonColors } from '@nc-core/interfaces/ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './IconButton.module.sass';

interface IconButtonCommonProps {
  color?: ButtonColors;
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
  color = 'primary',
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
      className={clsx(classes.iconButton, {
        [classes['iconButton--colorDefault']]: color === 'default',
        [classes['iconButton--colorError']]: color === 'error',
        [classes['iconButton--colorPrimary']]: color === 'primary',
        [classes['iconButton--colorSuccess']]: color === 'success',
        [classes['iconButton--colorWarning']]: color === 'warning',
        [classes['iconButton--colorWhite']]: color === 'white',
        [classes['iconButton--normal']]: size === 'normal',
        [classes['iconButton--small']]: size === 'small',
        [classes['iconButton--contained']]: variant === 'contained',
        [classes['iconButton--transparent']]: variant === 'transparent',
      })}
      disabled={disabled}
      onClick={handleClick}
    >
      {isRippling && ripplePos && (
        <div
          className={classes.iconButton__rippleEffect}
          style={{ left: ripplePos[0], top: ripplePos[1] }}
        />
      )}
      <div className={classes.iconButton__text}>{children}</div>
    </button>
  );
}
