import SVGProps, { defaultSvgPropsValues } from '../props';

export default function AddCommentIcon({
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
        d="M22.2 28.3h3.6v-6.5h6.5v-3.6h-6.5v-6.5h-3.6v6.5h-6.5v3.6h6.5ZM2.75 45.25V7.45q0-1.9 1.375-3.325Q5.5 2.7 7.45 2.7h33.1q1.9 0 3.325 1.425Q45.3 5.55 45.3 7.45v25.1q0 1.9-1.425 3.3t-3.325 1.4h-29.8Zm4.7-10.3 2.4-2.4h30.7V7.45H7.45Zm0-27.5v27.5Z"
        fill={color}
      />
    </svg>
  );
}
