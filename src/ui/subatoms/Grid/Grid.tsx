import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import classes from './Grid.module.sass';

interface GridCommonProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

interface GridContainerProps extends GridCommonProps {
  alignContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  alignItems?: 'center' | 'flex-end' | 'flex-start';
  container: true;
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  fullHeight?: boolean;
  item?: false;
  justifyContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  spacing?: number | { columns: number; rows: number };
  wrap?: 'nowrap' | 'wrap';
}

export type GridSizeProps = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridItemProps extends GridCommonProps {
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
  id,
  style,
  ...props
}: PropsWithChildren<GridProps>): JSX.Element {
  if (!props.container && !props.item) {
    throw new Error('@nc-ui: Grid must be a container or an item.');
  }

  if (props.container) {
    const {
      alignContent,
      alignItems,
      direction = 'row',
      fullHeight,
      justifyContent,
      spacing = 0,
      wrap = 'wrap',
    } = props;

    return (
      <div
        className={clsx(className, classes.grid__container, {
          [classes['grid__container--fullHeight']]: fullHeight,
        })}
        id={id}
        style={{
          ...style,
          alignContent,
          alignItems,
          flexDirection: direction,
          flexWrap: wrap,
          justifyContent,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ['--grid-row-spacing' as any]:
            typeof spacing === 'number' ? `${spacing}px` : spacing.rows,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ['--grid-column-spacing' as any]:
            typeof spacing === 'number' ? `${spacing}px` : spacing.columns,
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
      id={id}
      style={style}
    >
      {children}
    </div>
  );
}
