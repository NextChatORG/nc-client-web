export default interface SVGProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number | string;
}

export const defaultSvgPropsValues: SVGProps = {
  color: 'currentColor',
  size: 24,
};
