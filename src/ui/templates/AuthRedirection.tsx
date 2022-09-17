import { useUser } from '@nc-core/hooks';
import { Navigate } from 'react-router-dom';

export interface AuthRedirectionProps {
  Logged?: React.LazyExoticComponent<() => JSX.Element>;
  NoLogged?: React.LazyExoticComponent<() => JSX.Element>;
  redirectToIndex?: boolean;
}

export function AuthRedirection({
  Logged,
  NoLogged,
  redirectToIndex,
}: AuthRedirectionProps): JSX.Element | null {
  const { isLogged } = useUser();

  if (!isLogged()) {
    return NoLogged ? (
      <NoLogged />
    ) : redirectToIndex ? (
      <Navigate to="/" />
    ) : null;
  }

  return Logged ? <Logged /> : redirectToIndex ? <Navigate to="/" /> : null;
}
