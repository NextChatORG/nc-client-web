import { GET_PROFILE_QUERY } from '@nc-core/api';
import { AuthContext } from '@nc-core/contexts';
import { useLazyQuery } from '@nc-core/hooks';
import { GetProfileResponse } from '@nc-core/interfaces/api';
import { authReducer, authReducerInitialState } from '@nc-core/reducers';
import { Suspense, useEffect, useReducer, useState } from 'react';
import { ToastContainer } from 'react-toastify';

export default function App({
  children,
}: React.PropsWithChildren<unknown>): JSX.Element {
  const [state, dispatch] = useReducer(authReducer, authReducerInitialState);

  const [loading, setLoading] = useState<boolean>(!state.requireTwoFactor);

  const [getProfile] = useLazyQuery<GetProfileResponse>(GET_PROFILE_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted({ getProfile }) {
      dispatch({ type: 'set-profile-data', payload: getProfile });
    },
  });

  useEffect(() => {
    if (state.jwt && !state.requireTwoFactor && !state.profileData) {
      getProfile();
      return;
    }

    if ((state.jwt && state.profileData) || !state.jwt) {
      setLoading(false);
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ dispatch, state }}>
      {loading ? <div>Loading</div> : <Suspense>{children}</Suspense>}
      <ToastContainer
        hideProgressBar
        position="bottom-center"
        theme="colored"
      />
    </AuthContext.Provider>
  );
}
