import { JWT_TOKEN } from '@nc-core/constants/local-storage';
import { AuthContext } from '@nc-core/contexts';
import { useContext } from 'react';
import {
  LogInResponse,
  LogInTwoFactorResponse,
  LogInTwoFactorVariables,
  LogInVariables,
  LOGIN_MUTATION,
  LOGIN_TWO_FACTOR_QUERY,
  SignUpResponse,
  SignUpVariables,
  SIGNUP_MUTATION,
  UserProfile,
} from '@nc-core/api';
import { useMutation } from './useMutation';
import { GraphQLParsedErrors } from '@nc-core/utils';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from './useLazyQuery';

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
  const navigate = useNavigate();

  const [logIn] = useMutation<LogInResponse, LogInVariables>(LOGIN_MUTATION, {
    onCompleted({ logIn: { accessToken } }) {
      localStorage.setItem(JWT_TOKEN, accessToken);

      if (!dispatch) return;

      dispatch({ type: 'log-in', payload: { accessToken } });
      navigate('/', { replace: true });
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
    async logInTwoFactor(variables) {
      await logInTwoFactor({ variables });
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
