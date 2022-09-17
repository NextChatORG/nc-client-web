import SVGProps, { defaultSvgPropsValues } from '../../props';

export default function NotificationsOutlinedIcon({
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
        d="M5.85 39.1v-4.75h4.65v-13.9q0-4.65 2.675-8.4T20.35 7.3V6.1q0-1.55 1.075-2.55 1.075-1 2.575-1 1.5 0 2.575 1 1.075 1 1.075 2.55v1.2q4.55 1 7.25 4.725 2.7 3.725 2.7 8.425v13.9h4.6v4.75ZM24 23.3Zm.05 21.95q-1.8 0-3.125-1.3t-1.325-3.1h8.85q0 1.85-1.3 3.125t-3.1 1.275Zm-8.85-10.9h17.65v-13.9q0-3.7-2.55-6.3-2.55-2.6-6.25-2.6t-6.275 2.6q-2.575 2.6-2.575 6.3Z"
        fill={color}
      />
    </svg>
  );
}
