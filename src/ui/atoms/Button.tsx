import { ButtonColors } from '@nc-core/interfaces/ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ButtonVariants = 'contained' | 'input-icon' | 'outlined' | 'text';

interface ButtonCommonProps {
  className?: string;
  color?: ButtonColors;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  size?: 'extra-small' | 'normal' | 'small';
  startIcon?: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariants;
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

const BUTTON_SIZES = {
  'extra-small': '',
  normal: 'px-3 py-1',
  small: 'px-[18px] py-[6px]',
};

const BUTTON_VARIANTS = {
  contained:
    'rounded-full disabled:bg-dark-500 disabled:text-white disabled:hover:bg-dark-500',
  'input-icon': 'leading-[0.5] rounded-full !p-[0.5em]',
  outlined:
    'border rounded-full disabled:border-dark-500 disabled:text-dark-500 disabled:hover:bg-transparent',
  text: 'rounded-full disabled:text-dark-500 disabled:hover:bg-transparent',
};

const BUTTON_COLORS: {
  [key in ButtonVariants]: { [key in ButtonColors]: string };
} = {
  contained: {
    error: 'bg-red-500 text-white hover:bg-red-400',
    primary: 'bg-primary text-white hover:bg-indigo-700',
    success: 'bg-green-500 text-white hover:bg-green-400',
    warning: 'bg-orange-500 text-white hover:bg-orange-400',
    white: '',
  },
  'input-icon': {
    error: 'text-red-500 hover:bg-red-500/5',
    primary: '',
    success: '',
    warning: '',
    white: 'text-white hover:bg-white/5',
  },
  outlined: {
    error: '',
    primary:
      'border-[silver] text-primary hover:border-primary hover:bg-primary/5',
    success: '',
    warning: '',
    white: 'border-white/60 text-white hover:border-white hover:bg-white/5',
  },
  text: {
    error: 'text-red-500 hover:bg-red-500/5',
    primary: 'text-primary hover:bg-primary/15',
    success: 'text-green-500 hover:bg-green-500/5',
    warning: 'text-orange-500 hover:bg-orange-500/5',
    white: 'text-white hover:bg-white/5',
  },
};

const BUTTON_RIPPLE: {
  [key in ButtonVariants]: { [key in ButtonColors]: string };
} = {
  contained: {
    error: 'bg-red-300',
    primary: 'bg-indigo-500',
    success: 'bg-green-300',
    warning: 'bg-orange-300',
    white: '',
  },
  'input-icon': {
    error: 'bg-red-500/25',
    primary: 'bg-primary/25',
    success: 'bg-green-500/25',
    warning: 'bg-orange-500/25',
    white: 'bg-white/25',
  },
  outlined: {
    error: 'bg-red-500/25',
    primary: 'bg-primary/25',
    success: 'bg-green-500/25',
    warning: 'bg-orange-500/25',
    white: 'bg-white/25',
  },
  text: {
    error: 'bg-red-500/25',
    primary: 'bg-primary/25',
    success: 'bg-green-500/25',
    warning: 'bg-orange-500/25',
    white: 'bg-white/25',
  },
};

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
        props.className,
        'overflow-hidden relative flex items-center justify-center gap-text transition-colors text-center cursor-hover',
        'disabled:cursor-not-allowed',
        BUTTON_SIZES[size],
        BUTTON_VARIANTS[variant],
        BUTTON_COLORS[variant][color],
        { 'w-full': props.fullWidth },
      )}
      disabled={props.disabled || props.loading}
      onClick={handleClick}
      style={props.style}
      type={type}
    >
      {isRippling && ripplePos && (
        <div
          className={clsx(
            'animate-ripple h-[20px] w-[20px] absolute rounded-full opacity-100',
            BUTTON_RIPPLE[variant][color],
            { 'h-[10px] w-[10px]': variant === 'input-icon' },
          )}
          style={{ left: ripplePos[0], top: ripplePos[1] }}
        />
      )}
      {props.startIcon && (
        <div className="relative z-[2] leading-[0.5]">{props.startIcon}</div>
      )}
      <span className="relative z-[2] text-left">{props.children}</span>
      {props.endIcon && (
        <div className="relative z-[2] leading-[0.5]">{props.endIcon}</div>
      )}
    </button>
  );
}
