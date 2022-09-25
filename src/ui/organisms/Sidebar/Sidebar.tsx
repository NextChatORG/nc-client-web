import { Link, useLocation } from 'react-router-dom';
import {
  DashboardFilledIcon,
  DashboardOutlinedIcon,
  ExploreFilledIcon,
  ExploreOutlinedIcon,
  HelpFilledIcon,
  HelpOutlinedIcon,
  LogoutIcon,
  SettingsFilledIcon,
  SettingsOutlinedIcon,
} from '@nc-icons';
import { Avatar, Grid, IconButton, Logo } from '../../atoms';
import classes from './Sidebar.module.sass';
import clsx from 'clsx';
import { useUser } from '@nc-core/hooks';
import { NotificationsBox } from '../../molecules';

export function Sidebar(): JSX.Element {
  const location = useLocation();
  const { data: meData, logOut } = useUser();

  function isActive(pathname: string): boolean {
    if (pathname === '/chat') {
      return (
        location.pathname.startsWith(pathname) || location.pathname === '/'
      );
    }

    return location.pathname === pathname;
  }

  function getLinkClasses(pathname: string): string {
    return clsx(classes.sidebar__nav__item, {
      [classes['sidebar__nav__item--active']]: isActive(pathname),
    });
  }

  return (
    <div className={classes.sidebar}>
      <Grid
        container
        fullHeight
        alignItems="center"
        direction="column"
        justifyContent="space-between"
      >
        <Grid item>
          <Link to="/">
            <Logo onlyIcon />
          </Link>
        </Grid>
        <Grid item>
          <ul className={classes.sidebar__nav}>
            <li className={getLinkClasses('/chat')}>
              <Link to="/chat">
                {isActive('/chat') ? (
                  <DashboardFilledIcon />
                ) : (
                  <DashboardOutlinedIcon />
                )}
              </Link>
            </li>
            <li className={getLinkClasses('/explore')}>
              <Link to="/explore">
                {isActive('/explore') ? (
                  <ExploreFilledIcon />
                ) : (
                  <ExploreOutlinedIcon />
                )}
              </Link>
            </li>
            {meData && (
              <li
                className={getLinkClasses(
                  `/profile/${meData.username}/settings`,
                )}
              >
                <Link to={`/profile/${meData?.username}/settings`}>
                  {isActive(`/profile/${meData?.username}/settings`) ? (
                    <SettingsFilledIcon />
                  ) : (
                    <SettingsOutlinedIcon />
                  )}
                </Link>
              </li>
            )}
            <li className={getLinkClasses('/help')}>
              <Link to="/help">
                {isActive('/help') ? <HelpFilledIcon /> : <HelpOutlinedIcon />}
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item>
          {meData && (
            <Grid
              container
              alignItems="center"
              direction="column"
              justifyContent="center"
              spacing={12}
            >
              {isActive('/chat') && (
                <>
                  <Grid item>
                    <NotificationsBox direction="right-center" />
                  </Grid>
                  <Grid item>
                    <Link to="/profile">
                      <Avatar url={meData.profileImage} size="small" />
                    </Link>
                  </Grid>
                </>
              )}
              <Grid item>
                <IconButton
                  color="error"
                  onClick={logOut}
                  variant="transparent"
                >
                  <LogoutIcon />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
