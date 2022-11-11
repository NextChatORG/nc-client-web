import {
  CHAT_ROUTE,
  EXPLORE_ROUTE,
  HELP_ROUTE,
  PROFILE_ROUTE,
  PROFILE_SETTINGS_ROUTE,
} from '@nc-core/constants/routes';
import { useAuth, useMessages } from '@nc-core/hooks';
import {
  CloseIcon,
  DashboardFilledIcon,
  DashboardOutlinedIcon,
  ExploreFilledIcon,
  ExploreOutlinedIcon,
  HelpFilledIcon,
  HelpOutlinedIcon,
  LogoutIcon,
  MenuIcon,
  SettingsFilledIcon,
  SettingsOutlinedIcon,
} from '@nc-icons';
import { Button, Logo, NotificationsBox } from '@nc-ui';
import clsx from 'clsx';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface SidebarProps {
  withHeader?: boolean;
}

const SIDEBAR_URLS = [
  {
    icons: {
      enabled: <DashboardFilledIcon />,
      disabled: <DashboardOutlinedIcon />,
    },
    title: 'Mensajes',
    to: CHAT_ROUTE,
  },
  {
    icons: {
      enabled: <ExploreFilledIcon />,
      disabled: <ExploreOutlinedIcon />,
    },
    title: 'Explorador',
    to: EXPLORE_ROUTE,
  },
  {
    icons: {
      enabled: <SettingsFilledIcon />,
      disabled: <SettingsOutlinedIcon />,
    },
    title: 'Ajustes',
    to: PROFILE_SETTINGS_ROUTE,
  },
  {
    icons: {
      enabled: <HelpFilledIcon />,
      disabled: <HelpOutlinedIcon />,
    },
    title: 'Centro de Ayuda',
    to: HELP_ROUTE,
  },
];

export function Sidebar({ withHeader }: SidebarProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const { data: meData, logOut } = useAuth();
  const { unreadChats } = useMessages();
  const location = useLocation();

  function isActive(pathname: string): boolean {
    if (pathname === CHAT_ROUTE) {
      return (
        location.pathname.startsWith(pathname) || location.pathname === '/'
      );
    }

    return location.pathname === pathname;
  }

  return (
    <>
      <Button
        className={clsx(
          'sm:hidden !fixed bottom-1 right-1 z-sidebar',
          'bg-dark-600 border-2 border-dark-400',
          {
            hidden: open,
          },
        )}
        color="dark"
        onClick={() => setOpen(true)}
        variant="icon"
      >
        <MenuIcon />
      </Button>
      <nav
        className={clsx(
          '<sm:fixed right-0 z-sidebar h-[100vh] w-[70px] pt-4 pb-5 sm:py-2 bg-dark-800',
          '<sm:shadow-sidebar flex flex-col items-center justify-between',
          '<sm:after:absolute <sm:after:top-0 <sm:after:left-[-600%] <sm:after:content-DEFAULT',
          '<sm:after:bg-dark-900/30 <sm:after:backdrop-filter <sm:after:backdrop-blur-sm',
          '<sm:after:w-[600%] <sm:after:h-[100vh]',
          { '<sm:hidden': !open },
        )}
      >
        <button
          className={clsx(
            'sm:hidden absolute left-[-16px] bottom-[18px] z-60 h-[32px] w-[32px]',
            'rounded-full bg-dark-600 border-2 border-dark-400',
            'flex items-center justify-center',
          )}
          onClick={() => setOpen(false)}
        >
          <CloseIcon size="1em" />
        </button>
        <Link to={CHAT_ROUTE}>
          <Logo onlyIcon />
        </Link>
        <ul className="flex flex-col items-start sm:items-end w-full">
          {SIDEBAR_URLS.map((url, i) => {
            const path = url.to.replace(':username', meData?.username ?? '');
            const enabled = isActive(path);

            return (
              <li
                className={clsx(
                  'relative w-[90%] py-1 <sm:rounded-tr-[12px] <sm:rounded-br-[12px]',
                  'sm:rounded-tl-[12px] sm:rounded-bl-[12px]',
                  'text-white/60 flex items-center justify-center',
                  {
                    [clsx(
                      'my-[10px] bg-dark-900 !text-primary',
                      'after:absolute after:bg-dark-800 after:content-DEFAULT after:h-[17px] after:w-[17px]',
                      '<sm:after:rounded-tl-[50%] <sm:after:left-0 after:bottom-[-17px] <sm:after:shadow-sidebarLeftBottomCorner',
                      'sm:after:rounded-tr-[50%] sm:after:right-0 sm:after:shadow-sidebarRightBottomCorner',
                      'before:absolute before:bg-dark-800 before:content-DEFAULT before:h-[17px] before:w-[17px]',
                      '<sm:before:rounded-bl-[50%] <sm:before:left-0 before:top-[-17px] <sm:before:shadow-sidebarLeftTopCorner',
                      'sm:before:rounded-br-[50%] sm:before:right-0 sm:before:shadow-sidebarRightTopCorner',
                    )]: enabled,
                  },
                )}
                key={`sidebar_url_${i}`}
              >
                <Link
                  className={clsx('relative leading-[0.5]', {
                    [clsx(
                      'before:absolute before:bg-primary before:content-DEFAULT before:h-[64%] before:w-[4px]',
                      'before:rounded-[2px] before:left-[-45%] before:top-[18%]',
                    )]: enabled,
                  })}
                  to={path}
                >
                  {path === CHAT_ROUTE && unreadChats > 0 && (
                    <div
                      className={clsx(
                        'absolute badge-normal bg-primary text-white/80 border-1',
                        enabled
                          ? 'right-[-5px] top-[-5px] border-dark-900'
                          : 'right-[-7px] top-[-7px] border-dark-800',
                      )}
                    >
                      {unreadChats}
                    </div>
                  )}
                  {url.icons[enabled ? 'enabled' : 'disabled']}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col items-center gap-1">
          {meData && (
            <>
              <NotificationsBox
                className={withHeader ? 'sm:hidden' : undefined}
                direction="right-center"
              />
              <Link
                className={withHeader ? 'sm:hidden' : undefined}
                to={PROFILE_ROUTE}
              >
                <img
                  alt="Avatar"
                  className="avatar-small"
                  src={meData.profileImage}
                />
              </Link>
              <Button color="error" onClick={logOut} variant="icon">
                <LogoutIcon />
              </Button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
