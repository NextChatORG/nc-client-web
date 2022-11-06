import { useAuth } from '@nc-core/hooks';
import {
  Button,
  ButtonPropsWithMessage,
  Logo,
  NotificationsBox,
  Search,
} from '@nc-ui';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  auth?: {
    navButtons?: ButtonPropsWithMessage[];
  };
  withOffset?: boolean;
}

export function Header({ auth, withOffset }: HeaderProps): JSX.Element {
  const { data } = useAuth();

  if (auth) {
    const { navButtons } = auth;

    return (
      <header
        className={clsx(
          'p-2 flex flex-col items-center justify-center gap-1',
          'sm:flex-row sm:justify-between md:px-5',
        )}
      >
        <Link className="!no-underline" to="/">
          <Logo color="white" />
        </Link>
        {navButtons && navButtons.length > 0 && (
          <nav className="flex items-center gap-1">
            {navButtons.map((props, i) => (
              <Button {...props} key={`nav_button_${i}`}>
                {props.message}
              </Button>
            ))}
          </nav>
        )}
      </header>
    );
  }

  return (
    <header className="flex items-center gap-2" id="nc-header">
      <div className={withOffset ? 'ml-1/3 ml-1/5' : undefined} />
      <Search className="<sm:basis-full sm:flex-1" />
      <div className="<sm:hidden sm:flex sm:items-center sm:gap-1">
        {data && (
          <Link
            className="flex items-center gap-1 hover:no-underline"
            to="/profile"
          >
            <p className="sm:hidden lg:block">{data.username}</p>
            <img
              alt="My profile"
              className="avatar-normal"
              src={data.profileImage}
            />
          </Link>
        )}
        <NotificationsBox />
      </div>
    </header>
  );
}
