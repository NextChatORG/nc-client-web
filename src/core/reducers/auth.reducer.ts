import { JWT_TOKEN } from '@nc-core/constants/local-storage';
import {
  LogInResponse,
  RecoverAccountResponse,
  SignUpResponse,
  UserProfile,
} from '@nc-core/interfaces/api';
import jwtDecode from 'jwt-decode';

export interface AuthReducerState {
  jwt: string | null;
  profileData: UserProfile | null;
  recoveryCodes: string[];
  requireTwoFactor: boolean;
}

export const authReducerInitialState: AuthReducerState = {
  jwt: localStorage.getItem(JWT_TOKEN),
  profileData: null,
  recoveryCodes: [],
  requireTwoFactor: false,
};

interface LogInAction {
  type: 'log-in';
  payload: LogInResponse['logIn'];
}

interface RecoverAccountAction {
  type: 'recover-account';
  payload: RecoverAccountResponse['recoverAccount'];
}

interface SignUpAction {
  type: 'sign-up';
  payload: SignUpResponse['signUp'];
}

interface SetProfileDataAction {
  type: 'set-profile-data';
  payload: UserProfile;
}

interface ClearRecoveryCodesAction {
  type: 'clear-recovery-codes';
}

interface LogOutAction {
  type: 'logout';
}

export type AuthReducerActions =
  | LogInAction
  | RecoverAccountAction
  | SignUpAction
  | SetProfileDataAction
  | ClearRecoveryCodesAction
  | LogOutAction;

export function authReducer(
  state: AuthReducerState,
  action: AuthReducerActions,
): AuthReducerState {
  switch (action.type) {
    case 'log-in': {
      const jwt = action.payload.accessToken;

      const payload: { twoFactorPassed: boolean; twoFactorRequired: boolean } =
        jwtDecode(jwt);

      return {
        ...authReducerInitialState,
        jwt,
        requireTwoFactor: !payload.twoFactorPassed && payload.twoFactorRequired,
      };
    }

    case 'recover-account':
      return {
        ...authReducerInitialState,
        jwt: action.payload.accessToken,
        recoveryCodes: action.payload.recoveryCodes,
      };

    case 'sign-up':
      return {
        ...authReducerInitialState,
        jwt: action.payload.accessToken,
        recoveryCodes: action.payload.recoveryCodes,
      };

    case 'set-profile-data':
      return { ...state, profileData: action.payload };

    case 'clear-recovery-codes':
      return { ...state, recoveryCodes: authReducerInitialState.recoveryCodes };

    case 'logout':
      return authReducerInitialState;

    default:
      return state;
  }
}
