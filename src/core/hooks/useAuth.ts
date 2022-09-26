import { JWT_TOKEN } from '@nc-core/constants/local-storage';
import { AuthContext } from '@nc-core/contexts';
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

export interface AuthHookProps {
  onSignUpErrors?(errors: GraphQLParsedErrors): void;
}

export interface AuthHook {
  clearRecoveryCodes(): void;
  data: UserProfile | null;
  isLogged: boolean;
  logIn(variables: LogInVariables): Promise<void>;
  logOut(): void;
  recoveryCodes: string[];
  signUp(variables: SignUpVariables): Promise<void>;
}

export function useAuth(props?: AuthHookProps): AuthHook {
  const { dispatch, state } = useContext(AuthContext);
  const navigate = useNavigate();

  const [logIn] = useMutation<LogInResponse, LogInVariables>(LOGIN_MUTATION, {
    async onCompleted({ logIn }) {
      localStorage.setItem(JWT_TOKEN, logIn.accessToken);

      if (!dispatch) return;

      dispatch({ type: 'log-in', payload: logIn });
      navigate('/', { replace: true });
    },
  });

  const [signUp] = useMutation<SignUpResponse, SignUpVariables>(
    SIGNUP_MUTATION,
    {
      async onCompleted({ signUp }) {
        localStorage.setItem(JWT_TOKEN, signUp.accessToken);

        if (!dispatch) return;

        dispatch({ type: 'sign-up', payload: signUp });
        navigate('/', { replace: true });
      },
      onError: props?.onSignUpErrors,
    },
  );

  return {
    clearRecoveryCodes() {
      if (!dispatch) return;

      dispatch({ type: 'clear-recovery-codes' });
    },
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
    recoveryCodes: state?.recoveryCodes ?? [],
    async signUp(variables) {
      await signUp({ variables });
    },
  };
}
