import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './NCButton.module.sass';

interface NCButtonCommonProps {
  color?: 'black' | 'default' | 'primary' | 'success' | 'white';
  disabled?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: 'contained' | 'input-icon' | 'outlined' | 'text';
}

interface NCButtonLinkProps extends NCButtonCommonProps {
  link: true;
  external?: true;
  to: string;
}

interface NCButtonNormalProps extends NCButtonCommonProps {
  link?: false;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export type NCButtonProps = NCButtonLinkProps | NCButtonNormalProps;

export const NCButton: React.FC<React.PropsWithChildren<NCButtonProps>> = (props) => {
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
      className={clsx(classes.ncButton, {
        [classes['ncButton--colorBlack']]: color === 'black',
        [classes['ncButton--colorDefault']]: color === 'default',
        [classes['ncButton--colorPrimary']]: color === 'primary',
        [classes['ncButton--colorSuccess']]: color === 'success',
        [classes['ncButton--colorWhite']]: color === 'white',
        [classes['ncButton--contained']]: variant === 'contained',
        [classes['ncButton--inputIcon']]: variant === 'input-icon',
        [classes['ncButton--outlined']]: variant === 'outlined',
        [classes['ncButton--text']]: variant === 'text'
      })}
      disabled={props.disabled}
      onClick={handleClick}
      role="button"
      type={type}
    >
      {isRippling && ripplePos && (
        <div
          className={classes.ncButton__rippleEffect}
          style={{ left: ripplePos[0], top: ripplePos[1] }}
        />
      )}
      {props.startIcon && (
        <div className={classes.ncButton__icon}>
          {props.startIcon}
        </div>
      )}
      <span className={classes.ncButton__text}>
        {props.children}
      </span>
      {props.endIcon && (
        <div className={classes.ncButton__icon}>
          {props.endIcon}
        </div>
      )}
    </button>
  );
}
