import { Link, useLocation } from 'react-router-dom';
import {
  DashboardFilledIcon,
  DashboardOutlinedIcon,
  HelpFilledIcon,
  HelpOutlinedIcon,
  LogoutIcon,
  NotificationsFilledIcon,
  NotificationsOutlinedIcon,
  SettingsFilledIcon,
  SettingsOutlinedIcon,
} from '@nc-icons';
import { Grid, Logo } from '../../atoms';
import classes from './Sidebar.module.sass';
import clsx from 'clsx';

export function Sidebar(): JSX.Element {
  const location = useLocation();

  function isActive(pathname: string): boolean {
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
        alignItems="flex-start"
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
            <li className={getLinkClasses('/')}>
              <Link to="/">
                {isActive('/') ? (
                  <DashboardFilledIcon />
                ) : (
                  <DashboardOutlinedIcon />
                )}
              </Link>
            </li>
            <li className={getLinkClasses('/notifications')}>
              <Link to="/notifications">
                {isActive('/notifications') ? (
                  <NotificationsFilledIcon />
                ) : (
                  <NotificationsOutlinedIcon />
                )}
              </Link>
            </li>
            <li className={getLinkClasses('/settings')}>
              <Link to="/settings">
                {isActive('/settings') ? (
                  <SettingsFilledIcon />
                ) : (
                  <SettingsOutlinedIcon />
                )}
              </Link>
            </li>
            <li className={getLinkClasses('/help')}>
              <Link to="/help">
                {isActive('/help') ? <HelpFilledIcon /> : <HelpOutlinedIcon />}
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item>
          <div className={classes.sidebar__bottom}>
            <Link className={classes.sidebar__bottom__logout} to="/logout">
              <LogoutIcon />
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
