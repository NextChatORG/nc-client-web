import {
  PROFILE_SETTINGS_CHANGE_PASSWORD_ROUTE,
  PROFILE_SETTINGS_ROUTE,
} from '@nc-core/constants/routes';
import { useAuth } from '@nc-core/hooks';
import { Content, Typography } from '@nc-ui';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import classes from './Settings.module.sass';

export default function SettingsNavigation(): JSX.Element {
  const { data: meData } = useAuth();
  const location = useLocation();

  function getClasses(path: string): string {
    return clsx(classes.settings__nav__ul__li, {
      [classes['settings__nav__ul__li--active']]: location.pathname === path,
    });
  }

  return (
    <Content>
      <nav className={classes.settings__nav}>
        <Typography
          withLetterSpacing
          className={classes.settings__nav__title}
          component="h4"
        >
          Navegación
        </Typography>
        <ul className={classes.settings__nav__ul}>
          <li
            className={getClasses(
              PROFILE_SETTINGS_ROUTE.replace(
                ':username',
                meData?.username ?? '',
              ),
            )}
          >
            <Link
              to={PROFILE_SETTINGS_ROUTE.replace(
                ':username',
                meData?.username ?? '',
              )}
            >
              General
            </Link>
          </li>
          <li
            className={getClasses(
              PROFILE_SETTINGS_CHANGE_PASSWORD_ROUTE.replace(
                ':username',
                meData?.username ?? '',
              ),
            )}
          >
            <Link
              to={PROFILE_SETTINGS_CHANGE_PASSWORD_ROUTE.replace(
                ':username',
                meData?.username ?? '',
              )}
            >
              Cambiar contraseña
            </Link>
          </li>
        </ul>
      </nav>
    </Content>
  );
}
