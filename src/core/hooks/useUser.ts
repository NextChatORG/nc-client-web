import { JWT_TOKEN } from '@nc-core/constants/local-storage';
import { UserContext } from '@nc-core/contexts';
import { useContext } from 'react';
import {
  LogInResponse,
  LogInVariables,
  LOGIN_MUTATION,
  SignUpResponse,
  SignUpVariables,
  SIGNUP_MUTATION,
  UserProfile,
} from '@nc-core/api';
import { useMutation } from './useMutation';
import { GraphQLParsedErrors } from '@nc-core/utils';
import { useNavigate } from 'react-router-dom';

export interface UserHookProps {
  onSignUpErrors?(errors: GraphQLParsedErrors): void;
}

export interface UserHook {
  data: UserProfile | null;
  isLogged: boolean;
  logIn(variables: LogInVariables): Promise<void>;
  logOut(): void;
  signUp(variables: SignUpVariables): Promise<void>;
}

export function useUser(props?: UserHookProps): UserHook {
  const { dispatch, state } = useContext(UserContext);
  const navigate = useNavigate();

  const [logIn] = useMutation<LogInResponse, LogInVariables>(LOGIN_MUTATION, {
    async onCompleted({ logIn: { accessToken } }) {
      localStorage.setItem(JWT_TOKEN, accessToken);

      if (!dispatch) return;

      dispatch({ type: 'set-jwt', payload: accessToken });
      navigate('/', { replace: true });
    },
  });

  const [signUp] = useMutation<SignUpResponse, SignUpVariables>(
    SIGNUP_MUTATION,
    {
      async onCompleted({ signUp: { accessToken } }) {
        localStorage.setItem(JWT_TOKEN, accessToken);

        if (!dispatch) return;

        dispatch({ type: 'set-jwt', payload: accessToken });
        navigate('/', { replace: true });
      },
      onError: props?.onSignUpErrors,
    },
  );

  return {
    data: state?.profileData ?? null,
    isLogged: state?.jwt !== null && state?.profileData !== null,
    async logIn(variables) {
      await logIn({ variables });
    },
    logOut() {
      localStorage.removeItem(JWT_TOKEN);

      if (!dispatch) return;

      dispatch({ type: 'logout' });
    },
    async signUp(variables) {
      await signUp({ variables });
    },
  };
}
