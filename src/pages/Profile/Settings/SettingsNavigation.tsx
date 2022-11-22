import {
  PROFILE_SETTINGS_CHANGE_PASSWORD_ROUTE,
  PROFILE_SETTINGS_ROUTE,
} from '@nc-core/constants/routes';
import { useAuth } from '@nc-core/hooks';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

const SETTINGS_ROUTES = [
  { title: 'General', to: PROFILE_SETTINGS_ROUTE },
  { title: 'Cambiar contraseña', to: PROFILE_SETTINGS_CHANGE_PASSWORD_ROUTE },
];

export default function SettingsNavigation(): JSX.Element {
  const { data: meData } = useAuth();
  const location = useLocation();

  return (
    <nav className="content">
      <h4 className="border-b-1 border-white/50 pb-[20px] mb-2 text-title text-center tracking-wide">
        Navegación
      </h4>
      <ul className="flex flex-col gap-[8px]">
        {SETTINGS_ROUTES.map((route, i) => {
          const path = route.to.replace(':username', meData?.username ?? '');
          const enabled = location.pathname === path;

          return (
            <li
              className={clsx('tracking-wide hover:pl-[4px]', {
                'font-bold': enabled,
              })}
              key={`settings_nav_path_${i}`}
            >
              <Link className="block hover:no-underline" to={path}>
                {enabled && '>'} {route.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
