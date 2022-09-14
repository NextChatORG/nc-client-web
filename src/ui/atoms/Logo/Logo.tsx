import { NextChatIcon } from '@nc-icons';
import clsx from 'clsx';
import classes from './Logo.module.sass';

export interface LogoProps {
  color?: 'primary' | 'white';
  onlyIcon?: boolean;
  size?: 'big' | 'small';
}

export function Logo({
  color = 'primary',
  onlyIcon = false,
  size = 'small',
}: LogoProps): JSX.Element {
  return (
    <div
      className={clsx(classes.logo, {
        [classes['logo--colorPrimary']]: color === 'primary',
        [classes['logo--colorWhite']]: color === 'white',
      })}
    >
      <NextChatIcon size={size === 'big' ? 120 : 48} />
      {!onlyIcon && (
        <h1 style={{ fontSize: size === 'big' ? 108 : 36 }}>NextChat</h1>
      )}
    </div>
  );
}
