import { useUser } from '@nc-core/hooks';
import { Navigate } from 'react-router-dom';

export interface AuthRedirectionProps {
  Logged?: React.LazyExoticComponent<() => JSX.Element>;
  NoLogged?: React.LazyExoticComponent<() => JSX.Element>;
}

export function AuthRedirection({
  Logged,
  NoLogged,
}: AuthRedirectionProps): JSX.Element | null {
  const { isLogged } = useUser();

  if (!isLogged()) {
    return NoLogged ? <NoLogged /> : <Navigate to="/" />;
  }

  return Logged ? <Logged /> : null;
}
