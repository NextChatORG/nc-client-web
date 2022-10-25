import { AuthContext } from '@nc-core/contexts';
import { useAuth } from '@nc-core/hooks';
import { lazy, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const RecoveryCodes = lazy(() => import('../../pages/auth/RecoveryCodes'));
const TwoFactor = lazy(() => import('../../pages/auth/TwoFactor'));

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
  const { isLogged, recoveryCodes } = useAuth();
  const { state } = useContext(AuthContext);

  if (!isLogged && !state?.requireTwoFactor) {
    return NoLogged ? (
      <NoLogged />
    ) : redirectToIndex ? (
      <Navigate to="/" />
    ) : null;
  }

  return state?.requireTwoFactor ? (
    <TwoFactor />
  ) : recoveryCodes.length === 5 ? (
    <RecoveryCodes />
  ) : Logged ? (
    <Logged />
  ) : redirectToIndex ? (
    <Navigate to="/" />
  ) : null;
}
