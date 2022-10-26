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

const jwt = localStorage.getItem(JWT_TOKEN);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const jwtPayload: any = jwt ? jwtDecode(jwt) : {};

export const authReducerInitialState: AuthReducerState = {
  jwt,
  profileData: null,
  recoveryCodes: [],
  requireTwoFactor: !jwtPayload.twoFactorPassed && jwtPayload.twoFactorRequired,
};

interface ChangeAccessTokenAction {
  type: 'change-access-token';
  payload: {
    accessToken: string;
    profileData: UserProfile;
  };
}

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

interface UpdateProfileDataAction {
  type: 'update-profile-data';
  payload: Partial<UserProfile>;
}

interface ClearRecoveryCodesAction {
  type: 'clear-recovery-codes';
}

interface LogOutAction {
  type: 'logout';
}

export type AuthReducerActions =
  | ChangeAccessTokenAction
  | LogInAction
  | RecoverAccountAction
  | SignUpAction
  | SetProfileDataAction
  | UpdateProfileDataAction
  | ClearRecoveryCodesAction
  | LogOutAction;

export function authReducer(
  state: AuthReducerState,
  action: AuthReducerActions,
): AuthReducerState {
  switch (action.type) {
    case 'change-access-token': {
      const jwt = action.payload.accessToken;

      const payload: { twoFactorPassed: boolean; twoFactorRequired: boolean } =
        jwtDecode(jwt);

      return {
        ...authReducerInitialState,
        jwt,
        profileData: action.payload.profileData,
        requireTwoFactor: !payload.twoFactorPassed && payload.twoFactorRequired,
      };
    }

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

    case 'update-profile-data':
      return {
        ...state,
        profileData: state.profileData
          ? {
              ...state.profileData,
              ...action.payload,
              counters: {
                ...state.profileData.counters,
                ...action.payload.counters,
              },
              settings: {
                ...state.profileData.settings,
                ...action.payload.settings,
              },
            }
          : null,
      };

    case 'clear-recovery-codes':
      return { ...state, recoveryCodes: authReducerInitialState.recoveryCodes };

    case 'logout':
      return authReducerInitialState;

    default:
      return state;
  }
}
