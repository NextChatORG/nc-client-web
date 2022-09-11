import { Link } from "react-router-dom";
import { NCButton, NCButtonProps, NCLogo, NCLogoProps } from "../../atoms";
import classes from './NCHeader.module.sass';

export interface NCHeaderProps {
  logo?: Pick<NCLogoProps, 'color'>;
  navButtons?: (NCButtonProps & { message: string })[];
}

export const NCHeader: React.FC<NCHeaderProps> = ({ logo, navButtons }) => {
  return (
    <header className={classes.ncHeader}>
      <Link to="/">
        <NCLogo color={logo?.color} />
      </Link>
      {navButtons && navButtons.length > 0 && (
        <nav className={classes.ncHeader__nav}>
          <ul className={classes.ncHeader__nav__items}>
            {navButtons.map((props, i) => (
              <NCButton {...props} key={`nav_button_${i}`}>
                {props.message}
              </NCButton>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
