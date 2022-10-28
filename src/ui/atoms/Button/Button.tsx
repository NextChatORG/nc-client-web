import { ButtonColors } from '@nc-core/interfaces/ui';
import { capitalize } from '@nc-core/utils';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Button.module.sass';

interface ButtonCommonProps {
  color?: ButtonColors;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  size?: 'extra-small' | 'normal' | 'small';
  startIcon?: React.ReactNode;
  style?: React.CSSProperties;
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

export type ButtonPropsWithMessage = ButtonProps & { message: string };

export function Button(
  props: React.PropsWithChildren<ButtonProps>,
): JSX.Element {
  const {
    color = 'primary',
    size = 'normal',
    type = 'button',
    variant = 'contained',
  } = props;

  const [isRippling, setRippling] = useState<boolean>(false);
  const [ripplePos, setRipplePos] = useState<[number, number] | null>(null);

  const navigate = useNavigate();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    const rect = e.currentTarget.getBoundingClientRect();

    setRipplePos([e.clientX - rect.left, e.clientY - rect.top]);

    if (!props.link) return props.onClick(e);
    if (!props.external) return navigate(props.to);

    window.open(props.to, '_blank');
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
        classes.button,
        classes[`button--color${capitalize(color)}`],
        classes[`button--${size}`],
        classes[`button--${variant}`],
        {
          [classes['button--disabled']]: props.disabled || props.loading,
          [classes['button--fullWidth']]: props.fullWidth,
        },
      )}
      disabled={props.disabled || props.loading}
      onClick={handleClick}
      style={props.style}
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
