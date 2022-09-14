import { Link } from 'react-router-dom';
import { Button, ButtonProps, Grid, Logo, LogoProps } from '../../atoms';
import classes from './Header.module.sass';

export interface HeaderProps {
  logo?: Pick<LogoProps, 'color'>;
  navButtons?: (ButtonProps & { message: string })[];
}

export function Header({ logo, navButtons }: HeaderProps): JSX.Element {
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
