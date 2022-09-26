import { GetProfileResponse, GET_PROFILE_QUERY } from '@nc-core/api';
import { AuthContext } from '@nc-core/contexts';
import { useAuth, useLazyQuery } from '@nc-core/hooks';
import { lazy, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecoveryCodes = lazy(() => import('../../pages/auth/RecoveryCodes'));

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
  const { dispatch, state } = useContext(AuthContext);
  const { isLogged, logOut, recoveryCodes } = useAuth();
  const navigate = useNavigate();

  const [getProfile, { loading: fetchingProfile }] =
    useLazyQuery<GetProfileResponse>(GET_PROFILE_QUERY, {
      fetchPolicy: 'network-only',
      onCompleted({ getProfile }) {
        if (!dispatch) return;

        dispatch({ type: 'set-profile-data', payload: getProfile });
      },
      onError() {
        logOut();
      },
    });

  useEffect(() => {
    if (state?.jwt && !state.profileData) {
      getProfile();
      return;
    }

    if (fetchingProfile) return;

    if (
      redirectToIndex &&
      ((!isLogged && !NoLogged) || (isLogged && !Logged))
    ) {
      navigate('/');
      return;
    }
  }, [state]);

  if (fetchingProfile) return null;

  if (!isLogged) return NoLogged ? <NoLogged /> : null;

  return recoveryCodes.length === 5 ? (
    <RecoveryCodes />
  ) : Logged ? (
    <Logged />
  ) : null;
}
