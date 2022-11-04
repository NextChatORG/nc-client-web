import { NextChatIcon } from '@nc-icons';
import clsx from 'clsx';

export interface LogoProps {
  color?: 'primary' | 'white';
  id?: string;
  onlyIcon?: boolean;
  size?: 'big' | 'small';
}

export function Logo({
  color = 'primary',
  id,
  onlyIcon = false,
  size = 'small',
}: LogoProps): JSX.Element {
  return (
    <div
      className={clsx('flex items-center gap-1', {
        'text-primary': color === 'primary',
      })}
      id={id}
    >
      <NextChatIcon id={`${id}-icon`} size={size === 'big' ? 120 : 45} />
      {!onlyIcon && (
        <h1
          className="font-bold"
          id={id && `${id}-text`}
          style={{ fontSize: size === 'big' ? 108 : 36 }}
        >
          NextChat
        </h1>
      )}
    </div>
  );
}
