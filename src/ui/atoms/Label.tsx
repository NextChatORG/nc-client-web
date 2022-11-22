import clsx from 'clsx';

export type LabelLayouts = 'horizontal' | 'vertical';

export interface LabelProps {
  layout?: LabelLayouts;
  name: string;
  value: string;
}

const LAYOUTS: { [key in LabelLayouts]: string } = {
  horizontal: 'flex-row justify-between',
  vertical: 'flex-col',
};

export function Label({
  layout = 'horizontal',
  name,
  value,
}: LabelProps): JSX.Element {
  return (
    <div className={clsx('flex', LAYOUTS[layout])}>
      <p className="font-medium tracking-wide">{name}</p>
      <p className="text-[14px]">{value}</p>
    </div>
  );
}
