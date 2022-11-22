import SVGProps, { defaultSvgPropsValues } from '../props';

export default function MenuIcon({
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
      <path d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z" fill={color} />
    </svg>
  );
}
