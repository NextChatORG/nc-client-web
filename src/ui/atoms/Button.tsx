import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export type ButtonColors =
  | 'dark'
  | 'error'
  | 'primary'
  | 'success'
  | 'warning'
  | 'white';

export type ButtonVariants = 'contained' | 'icon' | 'outlined' | 'text';
export type ButtonSizes = 'extra-small' | 'normal' | 'small';

interface ButtonCommonProps {
  active?: boolean;
  className?: string;
  color?: ButtonColors;
  disabled?: boolean;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  size?: ButtonSizes;
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

const BUTTON_SIZES: {
  [key in ButtonSizes]: { [key in ButtonVariants]: string };
} = {
  'extra-small': {
    contained: 'text-sm px-[12px] py-[3px]',
    icon: '',
    outlined: 'text-sm px-[12px] py-[3px]',
    text: 'text-sm px-[12px] py-[3px]',
  },
  normal: {
    contained: 'px-3 py-1',
    icon: 'p-1',
    outlined: 'px-3 py-1',
    text: 'px-3 py-1',
  },
  small: {
    contained: 'text-sm px-[18px] py-[6px]',
    icon: '',
    outlined: 'text-sm px-[18px] py-[6px]',
    text: 'text-sm px-[18px] py-[6px]',
  },
};

const BUTTON_VARIANTS: { [key in ButtonVariants]: string } = {
  contained:
    'rounded-full disabled:bg-dark-500 disabled:text-white disabled:hover:bg-dark-500',
  icon: 'leading-[0.5] rounded-full',
  outlined:
    'border rounded-full disabled:border-dark-500 disabled:text-dark-500 disabled:hover:bg-transparent',
  text: 'rounded-full disabled:text-dark-500 disabled:hover:bg-transparent',
};

const BUTTON_COLORS: {
  [key in ButtonVariants]: { [key in ButtonColors]: string };
} = {
  contained: {
    dark: '',
    error: 'bg-red-500 text-white hover:bg-red-400',
    primary: 'bg-primary text-white hover:bg-indigo-700',
    success: 'bg-green-500 text-white hover:bg-green-400',
    warning: 'bg-orange-500 text-white hover:bg-orange-400',
    white: '',
  },
  icon: {
    dark: '',
    error: 'text-red-500 hover:bg-red-500/5',
    primary: '',
    success: 'text-green-500 hover:bg-green-500/5',
    warning: 'text-orange-500 hover:bg-orange-500/5',
    white: 'text-white hover:bg-white/5',
  },
  outlined: {
    dark: '',
    error: 'border-red-500 text-red-500 hover:bg-red-500/5',
    primary:
      'border-[silver] text-primary hover:border-primary hover:bg-primary/5',
    success: 'border-green-500 text-green-500 hover:bg-green-500/5',
    warning: 'border-orange-500 text-orange-500 hover:bg-orange-500/5',
    white: 'border-white/60 text-white hover:border-white hover:bg-white/5',
  },
  text: {
    dark: '',
    error: 'text-red-500 hover:bg-red-500/5',
    primary: 'text-primary hover:bg-primary/15',
    success: 'text-green-500 hover:bg-green-500/5',
    warning: 'text-orange-500 hover:bg-orange-500/5',
    white: 'text-white hover:bg-white/5',
  },
};

const BUTTON_COLORS_ACTIVE: {
  [key in ButtonVariants]: { [key in ButtonColors]: string };
} = {
  contained: {
    dark: '',
    error: 'bg-red-400 text-white',
    primary: 'bg-indigo-700 text-white',
    success: 'bg-green-400 text-white',
    warning: 'bg-orange-400 text-white',
    white: '',
  },
  icon: {
    dark: '',
    error: 'bg-red-500/5 text-red-500',
    primary: '',
    success: 'bg-green-500/5 text-green-500',
    warning: 'bg-orange-500/5 text-orange-500',
    white: 'bg-white/5 text-white',
  },
  outlined: {
    dark: '',
    error: 'bg-red-500/5 border-red-500/5 text-red-500',
    primary: 'bg-primary/5 border-primary text-primary',
    success: 'bg-green-500/5 border-green-500 text-green-500',
    warning: 'bg-orange-500/5 border-orange-500 text-orange-500',
    white: 'bg-white/5 border-white text-white',
  },
  text: {
    dark: '',
    error: 'bg-red-500/5 text-red-500',
    primary: 'bg-primary/15 text-primary',
    success: 'bg-green-500/5 text-green-500',
    warning: 'bg-orange-500/5 text-orange-500',
    white: 'bg-white/5 text-white',
  },
};

const BUTTON_RIPPLE: {
  [key in ButtonVariants]: { [key in ButtonColors]: string };
} = {
  contained: {
    dark: '',
    error: 'bg-red-300',
    primary: 'bg-indigo-500',
    success: 'bg-green-300',
    warning: 'bg-orange-300',
    white: '',
  },
  icon: {
    dark: '',
    error: 'bg-red-500/25',
    primary: 'bg-primary/25',
    success: 'bg-green-500/25',
    warning: 'bg-orange-500/25',
    white: 'bg-white/25',
  },
  outlined: {
    dark: '',
    error: 'bg-red-500/25',
    primary: 'bg-primary/25',
    success: 'bg-green-500/25',
    warning: 'bg-orange-500/25',
    white: 'bg-white/25',
  },
  text: {
    dark: '',
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

  const disabled = props.disabled || props.loading;

  return (
    <button
      className={clsx(
        props.className,
        'overflow-hidden relative flex items-center justify-center gap-text transition-colors text-center cursor-hover',
        'disabled:cursor-not-allowed',
        BUTTON_SIZES[size][variant],
        BUTTON_VARIANTS[variant],
        (props.active ? BUTTON_COLORS_ACTIVE : BUTTON_COLORS)[variant][color],
        {
          'hover:bg-inherit hover:border-inherit': disabled,
          'w-full': props.fullWidth,
        },
      )}
      disabled={disabled}
      onClick={handleClick}
      style={props.style}
      type={type}
    >
      {isRippling && ripplePos && (
        <div
          className={clsx(
            'animate-ripple h-[20px] w-[20px] absolute rounded-full opacity-100',
            BUTTON_RIPPLE[variant][color],
            { 'h-[10px] w-[10px]': variant === 'icon' },
          )}
          style={{ left: ripplePos[0], top: ripplePos[1] }}
        />
      )}
      {props.startIcon && (
        <div className="relative z-[2] leading-[0.5]">{props.startIcon}</div>
      )}
      <span className="relative z-[2] text-center tracking-wide">
        {props.children}
      </span>
      {props.endIcon && (
        <div className="relative z-[2] leading-[0.5]">{props.endIcon}</div>
      )}
    </button>
  );
}
