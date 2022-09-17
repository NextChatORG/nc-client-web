import SVGProps, { defaultSvgPropsValues } from '../../props';

export default function DashboardOutlinedIcon({
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
        d="M25.2 18.95V3.75h19.05v15.2Zm-21.45 7.5V3.75H22.8v22.7Zm21.45 17.7V21.4h19.05v22.75Zm-21.45 0V28.9H22.8v15.25Zm4.75-22.4h9.6V8.45H8.5ZM29.95 39.4h9.6V26.15h-9.6Zm0-25.15h9.6v-5.8h-9.6ZM8.5 39.4h9.6v-5.75H8.5Zm9.6-17.65Zm11.85-7.5Zm0 11.9Zm-11.85 7.5Z"
        fill={color}
      />
    </svg>
  );
}
