import SVGProps, { defaultSvgPropsValues } from '../props';

export default function ExpandLessIcon({
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
        d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z"
        fill={color}
      />
    </svg>
  );
}
