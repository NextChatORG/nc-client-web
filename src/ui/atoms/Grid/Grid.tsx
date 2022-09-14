import clsx from 'clsx';
import { CSSProperties, PropsWithChildren } from 'react';
import classes from './Grid.module.sass';

interface GridCommonprops {
  className?: string;
  style?: Omit<
    CSSProperties,
    | 'alignContent'
    | 'alignItems'
    | 'display'
    | 'flexDirection'
    | 'flexFlow'
    | 'flexWrap'
    | 'justifyContent'
    | 'justifyItems'
  >;
}

interface GridContainerProps extends GridCommonprops {
  alignItems?: 'center' | 'flex-end' | 'flex-start';
  container: true;
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  item?: false;
  justifyContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  spacing?: number | { horizontal: number; vertical: number };
  wrap?: 'nowrap' | 'wrap';
}

export type GridSizeProps = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridItemProps extends GridCommonprops {
  container?: false;
  item: true;

  offsetXs?: GridSizeProps;
  offsetSm?: GridSizeProps;
  offsetMd?: GridSizeProps;
  offsetLg?: GridSizeProps;
  offsetXl?: GridSizeProps;

  xs?: GridSizeProps | 'auto';
  sm?: GridSizeProps | 'auto';
  md?: GridSizeProps | 'auto';
  lg?: GridSizeProps | 'auto';
  xl?: GridSizeProps | 'auto';
}

export type GridProps = GridContainerProps | GridItemProps;

export function Grid({
  children,
  className,
  style,
  ...props
}: PropsWithChildren<GridProps>): JSX.Element {
  if (!props.container && !props.item) {
    throw new Error('@nc-ui: Grid must be a container or an item.');
  }

  if (props.container) {
    const {
      alignItems,
      direction = 'row',
      justifyContent,
      spacing = 12,
      wrap = 'wrap',
    } = props;

    return (
      <div
        className={clsx(
          className,
          classes.grid__container,
          classes[`grid__container--${wrap === 'nowrap' ? 'no' : ''}wrap`],
        )}
        style={{
          ...style,
          alignItems,
          flexDirection: direction,
          flexWrap: wrap,
          gap:
            typeof spacing === 'number'
              ? spacing
              : `${spacing.vertical}px ${spacing.horizontal}px`,
          justifyContent,
        }}
      >
        {children}
      </div>
    );
  }

  const {
    offsetXs,
    offsetSm,
    offsetMd,
    offsetLg,
    offsetXl,
    xs,
    sm,
    md,
    lg,
    xl,
  } = props;

  return (
    <div
      className={clsx(className, classes.grid__item, {
        [classes[`grid__item--xs-offset-${offsetXs}`]]: Boolean(offsetXs),
        [classes[`grid__item--sm-offset-${offsetSm}`]]: Boolean(offsetSm),
        [classes[`grid__item--md-offset-${offsetMd}`]]: Boolean(offsetMd),
        [classes[`grid__item--lg-offset-${offsetLg}`]]: Boolean(offsetLg),
        [classes[`grid__item--xl-offset-${offsetXl}`]]: Boolean(offsetXl),
        [classes[`grid__item--xs-${xs}`]]: Boolean(xs),
        [classes[`grid__item--sm-${sm}`]]: Boolean(sm),
        [classes[`grid__item--md-${md}`]]: Boolean(md),
        [classes[`grid__item--lg-${lg}`]]: Boolean(lg),
        [classes[`grid__item--xl-${xl}`]]: Boolean(xl),
      })}
      style={style}
    >
      {children}
    </div>
  );
}
