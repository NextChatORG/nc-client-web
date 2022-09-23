import clsx from 'clsx';
import React, { createElement } from 'react';
import classes from './Typography.module.sass';

export interface TypographyProps {
  className?: string;
  component?: React.ElementType;
  fontSize?: number | string;
  fontWeight?: number | string;
  style?: React.CSSProperties;
  variant?: 'body' | 'subtitle' | 'title';
  withLetterSpacing?: boolean;
}

export function Typography({
  children,
  className,
  component = 'span',
  fontSize,
  fontWeight,
  style,
  variant = 'body',
  withLetterSpacing,
}: React.PropsWithChildren<TypographyProps>): JSX.Element {
  return createElement(
    component,
    {
      className: clsx(
        className,
        classes.typography,
        classes[`typography--${variant}`],
        { [classes['typography--withLetterSpacing']]: withLetterSpacing },
      ),
      style: {
        ...style,
        fontSize,
        fontWeight,
      },
    },
    children,
  );
}
