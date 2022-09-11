import SVGProps, { defaultSvgPropsValues } from "../props";

export default function OpenInNewIcon({
  color = defaultSvgPropsValues.color,
  size = defaultSvgPropsValues.size,
  ...props
}: SVGProps) {
  return (
    <svg {...props} height={size} viewBox="0 0 48 48" width={size} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.95v3H9v30h30V25.05h3V39q0 1.2-.9 2.1-.9.9-2.1.9Zm10.1-10.95L17 28.9 36.9 9H25.95V6H42v16.05h-3v-10.9Z"
        fill={color}
      />
    </svg>
  );
}
