import { useUser } from '@nc-core/hooks';
import { Link } from 'react-router-dom';
import { Avatar, Grid } from '../../atoms';
import { NotificationsBox, Search } from '../../molecules';
import classes from './Header.module.sass';

export function Header(): JSX.Element {
  const { data } = useUser();

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
