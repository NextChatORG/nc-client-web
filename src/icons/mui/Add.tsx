import SVGProps, { defaultSvgPropsValues } from '../props';

export default function AddIcon({
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
      <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z" fill={color} />
    </svg>
  );
}
