import {
  CHAT_ROUTE,
  EXPLORE_ROUTE,
  HELP_ROUTE,
  PROFILE_ROUTE,
  PROFILE_SETTINGS_ROUTE,
} from '@nc-core/constants/routes';
import { useAuth } from '@nc-core/hooks';
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
import { Avatar, Grid, IconButton, Logo, NotificationsBox } from '@nc-ui';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import classes from './Sidebar.module.sass';

export interface SidebarProps {
  withHeader?: boolean;
}

export function Sidebar({ withHeader }: SidebarProps): JSX.Element {
  const { data: meData, logOut } = useAuth();
  const location = useLocation();

  function isActive(pathname: string): boolean {
    if (pathname === CHAT_ROUTE) {
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
          <Link to={CHAT_ROUTE}>
            <Logo onlyIcon />
          </Link>
        </Grid>
        <Grid item>
          <ul className={classes.sidebar__nav}>
            <li className={getLinkClasses(CHAT_ROUTE)}>
              <Link to={CHAT_ROUTE}>
                {isActive(CHAT_ROUTE) ? (
                  <DashboardFilledIcon />
                ) : (
                  <DashboardOutlinedIcon />
                )}
              </Link>
            </li>
            <li className={getLinkClasses(EXPLORE_ROUTE)}>
              <Link to={EXPLORE_ROUTE}>
                {isActive(EXPLORE_ROUTE) ? (
                  <ExploreFilledIcon />
                ) : (
                  <ExploreOutlinedIcon />
                )}
              </Link>
            </li>
            {meData && (
              <li
                className={getLinkClasses(
                  PROFILE_SETTINGS_ROUTE.replace(':username', meData.username),
                )}
              >
                <Link
                  to={PROFILE_SETTINGS_ROUTE.replace(
                    ':username',
                    meData.username,
                  )}
                >
                  {isActive(
                    PROFILE_SETTINGS_ROUTE.replace(
                      ':username',
                      meData.username,
                    ),
                  ) ? (
                    <SettingsFilledIcon />
                  ) : (
                    <SettingsOutlinedIcon />
                  )}
                </Link>
              </li>
            )}
            <li className={getLinkClasses(HELP_ROUTE)}>
              <Link to={HELP_ROUTE}>
                {isActive(HELP_ROUTE) ? (
                  <HelpFilledIcon />
                ) : (
                  <HelpOutlinedIcon />
                )}
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
              {!withHeader && (
                <>
                  <Grid item>
                    <NotificationsBox direction="right-center" />
                  </Grid>
                  <Grid item>
                    <Link to={PROFILE_ROUTE}>
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
