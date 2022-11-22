import SVGProps, { defaultSvgPropsValues } from '../props';

export default function ChevronLeftIcon({
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
        d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"
        fill={color}
      />
    </svg>
  );
}
