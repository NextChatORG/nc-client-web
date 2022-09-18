import SVGProps, { defaultSvgPropsValues } from '../props';

export default function CloseIcon({
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
        d="m12.45 38.85-3.3-3.3L20.7 24 9.15 12.45l3.3-3.3L24 20.7 35.55 9.15l3.3 3.3L27.3 24l11.55 11.55-3.3 3.3L24 27.3Z"
        fill={color}
      />
    </svg>
  );
}
