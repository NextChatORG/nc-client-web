import SVGProps, { defaultSvgPropsValues } from '../../props';

export default function ExploreFilledIcon({
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
        d="m13.45 34.55 14.6-6.45 6.45-14.6-14.6 6.45ZM24 26q-.85 0-1.425-.575Q22 24.85 22 24q0-.85.575-1.425Q23.15 22 24 22q.85 0 1.425.575Q26 23.15 26 24q0 .85-.575 1.425Q24.85 26 24 26Zm0 19.25q-4.4 0-8.275-1.65T8.95 39.05q-2.9-2.9-4.55-6.775Q2.75 28.4 2.75 24q0-4.45 1.65-8.325 1.65-3.875 4.55-6.75t6.775-4.55Q19.6 2.7 24 2.7q4.45 0 8.325 1.675 3.875 1.675 6.75 4.55t4.55 6.75Q45.3 19.55 45.3 24q0 4.4-1.675 8.275t-4.55 6.775q-2.875 2.9-6.75 4.55T24 45.25Z"
        fill={color}
      />
    </svg>
  );
}
