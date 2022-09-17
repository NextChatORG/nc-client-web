import SVGProps, { defaultSvgPropsValues } from '../props';

export default function LogoutIcon({
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
        d="M8.95 43.25q-1.95 0-3.35-1.375Q4.2 40.5 4.2 38.55V9.45q0-1.95 1.4-3.35Q7 4.7 8.95 4.7h14.9v4.75H8.95v29.1h14.9v4.7Zm24.4-8.7-3.4-3.3 4.9-4.9H18.1v-4.7h16.65l-4.9-4.9 3.4-3.3 10.55 10.6Z"
        fill={color}
      />
    </svg>
  );
}
