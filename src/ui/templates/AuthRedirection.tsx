import { ProfileResponse, PROFILE_QUERY } from '@nc-core/api';
import { UserContext } from '@nc-core/contexts';
import { useLazyQuery, useUser } from '@nc-core/hooks';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const { dispatch, state } = useContext(UserContext);
  const { isLogged } = useUser();
  const navigate = useNavigate();

  const [getProfile, { loading: fetchingProfile }] =
    useLazyQuery<ProfileResponse>(PROFILE_QUERY, {
      fetchPolicy: 'network-only',
      onCompleted({ profile }) {
        if (dispatch) dispatch({ type: 'set-profile-data', payload: profile });
      },
      onError() {
        if (dispatch) dispatch({ type: 'logout' });
      },
    });

  useEffect(() => {
    if (!state?.jwt && redirectToIndex) {
      navigate('/');
      return;
    }

    if (state?.jwt && !state?.profileData) {
      getProfile();
    }
  }, [state]);

  if (fetchingProfile) return null;

  if (!isLogged) return NoLogged ? <NoLogged /> : null;

  return Logged ? <Logged /> : null;
}
