import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Button.module.sass';

interface ButtonCommonProps {
  color?: 'black' | 'default' | 'primary' | 'success' | 'white';
  disabled?: boolean;
  endIcon?: React.ReactNode;
  loading?: boolean;
  startIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'input-icon' | 'outlined' | 'text';
}

interface ButtonLinkProps extends ButtonCommonProps {
  link: true;
  external?: true;
  to: string;
}

interface ButtonNormalProps extends ButtonCommonProps {
  link?: false;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export type ButtonProps = ButtonLinkProps | ButtonNormalProps;

export function Button(
  props: React.PropsWithChildren<ButtonProps>,
): JSX.Element {
  const { color = 'primary', type = 'button', variant = 'contained' } = props;

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
      className={clsx(classes.button, {
        [classes['button--colorBlack']]: color === 'black',
        [classes['button--colorDefault']]: color === 'default',
        [classes['button--colorPrimary']]: color === 'primary',
        [classes['button--colorSuccess']]: color === 'success',
        [classes['button--colorWhite']]: color === 'white',
        [classes['button--contained']]: variant === 'contained',
        [classes['button--inputIcon']]: variant === 'input-icon',
        [classes['button--outlined']]: variant === 'outlined',
        [classes['button--text']]: variant === 'text',
      })}
      disabled={props.disabled || props.loading}
      onClick={handleClick}
      type={type}
    >
      {isRippling && ripplePos && (
        <div
          className={classes.button__rippleEffect}
          style={{ left: ripplePos[0], top: ripplePos[1] }}
        />
      )}
      {props.startIcon && (
        <div className={classes.button__icon}>{props.startIcon}</div>
      )}
      <span className={classes.button__text}>{props.children}</span>
      {props.endIcon && (
        <div className={classes.button__icon}>{props.endIcon}</div>
      )}
    </button>
  );
}
