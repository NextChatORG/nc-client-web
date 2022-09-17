import SVGProps, { defaultSvgPropsValues } from '../../props';

export default function DashboardFilledIcon({
  color = defaultSvgPropsValues.color,
  size = defaultSvgPropsValues.size,
  ...props
}: SVGProps): JSX.Element {
  return (
    <svg
      {...props}
      height={size}
      viewBox="0 0 48 48"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.5 19.5V6H42v13.5ZM6 25.5V6h16.5v19.5ZM25.5 42V22.5H42V42ZM6 42V28.5h16.5V42Z"
        fill={color}
      />
    </svg>
  );
}
