import SVGProps, { defaultSvgPropsValues } from '../props';

export default function EditIcon({
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
        d="M9.35 39.05h1.6L32.7 17.2l-1.6-1.6L9.35 37.45Zm30.5-23.95-6.6-6.6 1.05-1.1q1.4-1.4 3.325-1.425Q39.55 5.95 40.95 7.3l.9.9q1.15 1.1 1.025 2.55-.125 1.45-1.125 2.45Zm-2.05 2.05L12.35 42.6h-6.6V36l25.4-25.4Zm-5.85-.75-.85-.8 1.6 1.6Z"
        fill={color}
      />
    </svg>
  );
}
