import SVGProps, { defaultSvgPropsValues } from '../props';

export default function ExpandMoreIcon({
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
        d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"
        fill={color}
      />
    </svg>
  );
}
