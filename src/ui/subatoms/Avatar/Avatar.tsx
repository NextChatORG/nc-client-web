import { PersonIcon } from '@nc-icons';
import clsx from 'clsx';
import classes from './Avatar.module.sass';

export interface AvatarProps {
  clickable?: boolean;
  size?: 'big' | 'normal' | 'small';
  url?: string;
}

export function Avatar({
  clickable = false,
  size = 'normal',
  url,
}: AvatarProps): JSX.Element {
  return (
    <div
      className={clsx(classes.avatar, classes[`avatar--${size}`], {
        [classes['avatar--clickable']]: clickable,
        [classes['avatar--icon']]: !url,
      })}
    >
      {url ? <img alt="Avatar" src={url} /> : <PersonIcon size="1em" />}
    </div>
  );
}
