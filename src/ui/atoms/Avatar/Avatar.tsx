import clsx from 'clsx';
import { PersonIcon } from '@nc-icons';
import classes from './Avatar.module.sass';

export interface AvatarProps {
  size?: 'big' | 'normal' | 'small';
  url?: string;
}

export function Avatar({ size = 'normal', url }: AvatarProps): JSX.Element {
  return (
    <div
      className={clsx(classes.avatar, {
        [classes['avatar--big']]: size === 'big',
        [classes['avatar--normal']]: size === 'normal',
        [classes['avatar--small']]: size === 'small',
        [classes['avatar--icon']]: !url,
      })}
    >
      {url ? <img alt="Avatar" src={url} /> : <PersonIcon size="1em" />}
    </div>
  );
}
