import { NextChatIcon } from "@nc-icons";
import clsx from "clsx";
import classes from './NCLogo.module.sass';

export interface NCLogoProps {
  color?: 'primary' | 'white';
  onlyIcon?: boolean;
  size?: 'big' | 'small';
}

export const NCLogo: React.FC<NCLogoProps> = ({ color = 'primary', onlyIcon = false, size = 'small' }) => (
  <div
    className={clsx(classes.ncLogo, {
      [classes['ncLogo--colorPrimary']]: color === 'primary',
      [classes['ncLogo--colorWhite']]: color === 'white'
    })}
  >
    <NextChatIcon size={size === 'big' ? 120 : 48} />
    {!onlyIcon && <h1 style={{ fontSize: size === 'big' ? 108 : 36 }}>NextChat</h1>}
  </div>
);
