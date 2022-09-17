import { Link } from 'react-router-dom';
import { Button, ButtonProps, Grid, Logo, LogoProps } from '../../atoms';
import classes from './AuthHeader.module.sass';

export interface AuthHeaderProps {
  logo?: Pick<LogoProps, 'color'>;
  navButtons?: (ButtonProps & { message: string })[];
}

export function AuthHeader({ logo, navButtons }: AuthHeaderProps): JSX.Element {
  return (
    <header className={classes.header}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Link to="/">
            <Logo color={logo?.color} />
          </Link>
        </Grid>
        <Grid item>
          {navButtons && navButtons.length > 0 && (
            <nav className={classes.header__nav}>
              <ul className={classes.header__nav__items}>
                {navButtons.map((props, i) => (
                  <Button {...props} key={`nav_button_${i}`}>
                    {props.message}
                  </Button>
                ))}
              </ul>
            </nav>
          )}
        </Grid>
      </Grid>
    </header>
  );
}
