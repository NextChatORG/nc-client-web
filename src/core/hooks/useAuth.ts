import {
  LOGIN_MUTATION,
  LOGIN_TWO_FACTOR_QUERY,
  SIGNUP_MUTATION,
} from '@nc-core/api';
import { JWT_TOKEN } from '@nc-core/constants/local-storage';
import { CHAT_ROUTE } from '@nc-core/constants/routes';
import { AuthContext } from '@nc-core/contexts';
import {
  LogInResponse,
  LogInTwoFactorResponse,
  LogInTwoFactorVariables,
  LogInVariables,
  SignUpResponse,
  SignUpVariables,
  UserProfile,
} from '@nc-core/interfaces/api';
import { GraphQLParsedErrors } from '@nc-core/utils';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from './useLazyQuery';
import { useMessages } from './useMessages';
import { useMutation } from './useMutation';

export interface AuthHookProps {
  onLogInTwoFactorCompleted?(): void;
  onLogInTwoFactorErrors?(errors: GraphQLParsedErrors): void;
  onSignUpErrors?(errors: GraphQLParsedErrors): void;
}

export interface AuthHook {
  clearRecoveryCodes(): void;
  data: UserProfile | null;
  isLogged: boolean;
  logIn(variables: LogInVariables): Promise<void>;
  logInTwoFactor(variables: LogInTwoFactorVariables): Promise<void>;
  logOut(): void;
  recoveryCodes: string[];
  signUp(variables: SignUpVariables): Promise<void>;
}

export function useAuth(props?: AuthHookProps): AuthHook {
  const { dispatch, state } = useContext(AuthContext);
  const { dispose: disposeMessages } = useMessages();
  const navigate = useNavigate();

  const [logIn] = useMutation<LogInResponse, LogInVariables>(LOGIN_MUTATION, {
    onCompleted({ logIn: { accessToken } }) {
      localStorage.setItem(JWT_TOKEN, accessToken);

      if (!dispatch) return;

      dispatch({ type: 'log-in', payload: { accessToken } });
      navigate(CHAT_ROUTE, { replace: true });
    },
  });

  const [logInTwoFactor] = useLazyQuery<
    LogInTwoFactorResponse,
    LogInTwoFactorVariables
  >(LOGIN_TWO_FACTOR_QUERY, {
    onCompleted({ logInTwoFactor: { accessToken } }) {
      if (props?.onLogInTwoFactorCompleted) props.onLogInTwoFactorCompleted();

      localStorage.setItem(JWT_TOKEN, accessToken);

      if (!dispatch) return;

      dispatch({ type: 'log-in', payload: { accessToken } });
    },
    onError: props?.onLogInTwoFactorErrors,
  });

  const [signUp] = useMutation<SignUpResponse, SignUpVariables>(
    SIGNUP_MUTATION,
    {
      async onCompleted({ signUp }) {
        localStorage.setItem(JWT_TOKEN, signUp.accessToken);

        if (!dispatch) return;

        dispatch({ type: 'sign-up', payload: signUp });
        navigate(CHAT_ROUTE, { replace: true });
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
    async logInTwoFactor(variables) {
      await logInTwoFactor({ variables });
    },
    async logOut() {
      disposeMessages();

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
