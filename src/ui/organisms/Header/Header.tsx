import { useUser } from '@nc-core/hooks';
import {
  Avatar,
  Button,
  ButtonPropsWithMessage,
  Grid,
  Logo,
  NotificationsBox,
  Search,
} from '@nc-ui';
import { Link } from 'react-router-dom';
import classes from './Header.module.sass';

export interface HeaderProps {
  auth?: {
    navButtons?: ButtonPropsWithMessage[];
  };
}

export function Header({ auth }: HeaderProps): JSX.Element {
  const { data } = useUser();

  if (auth) {
    const { navButtons } = auth;

    return (
      <header className={classes.authHeader}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Link to="/">
              <Logo color="white" />
            </Link>
          </Grid>
          <Grid item>
            {navButtons && navButtons.length > 0 && (
              <nav className={classes.authHeader__nav}>
                <ul className={classes.authHeader__nav__items}>
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

  return (
    <header className={classes.header} id="nc-header">
      <Grid container alignItems="center">
        <Grid item offsetXs={3} xs={6}>
          <Search />
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={12}
          >
            <Grid item>
              <Link className={classes.header__profile} to="/profile">
                <Grid
                  container
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={12}
                >
                  <Grid item>
                    <div className={classes.header__profile__information}>
                      <h3
                        className={
                          classes.header__profile__information__username
                        }
                      >
                        {data?.username ?? ''}
                      </h3>
                    </div>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="flex-end">
                      <Avatar url={data?.profileImage} />
                    </Grid>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
            <Grid item>
              <NotificationsBox />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
}
