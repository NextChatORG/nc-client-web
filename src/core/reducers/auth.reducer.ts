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

export const AUTH_REDUCER_INITIAL_STATE: AuthReducerState = {
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

interface UpdateDataAction {
  type: 'update-data';
  payload: {
    accessToken?: string;
    profile?: Partial<UserProfile>;
  };
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
  | UpdateDataAction
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
        ...AUTH_REDUCER_INITIAL_STATE,
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
        ...AUTH_REDUCER_INITIAL_STATE,
        jwt,
        requireTwoFactor: !payload.twoFactorPassed && payload.twoFactorRequired,
      };
    }

    case 'recover-account':
      return {
        ...AUTH_REDUCER_INITIAL_STATE,
        jwt: action.payload.accessToken,
        recoveryCodes: action.payload.recoveryCodes,
      };

    case 'sign-up':
      return {
        ...AUTH_REDUCER_INITIAL_STATE,
        jwt: action.payload.accessToken,
        recoveryCodes: action.payload.recoveryCodes,
      };

    case 'set-profile-data':
      return { ...state, profileData: action.payload };

    case 'update-data': {
      const jwt = action.payload.accessToken ?? state.jwt;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = jwtDecode(jwt ?? '');

      return {
        ...state,
        jwt,
        profileData: state.profileData
          ? {
              ...state.profileData,
              ...action.payload.profile,
              counters: {
                ...state.profileData.counters,
                ...action.payload.profile?.counters,
              },
              settings: {
                ...state.profileData.settings,
                ...action.payload.profile?.settings,
              },
            }
          : null,
        requireTwoFactor: jwt
          ? !payload.twoFactorPassed && payload.twoFactorRequired
          : false,
      };
    }

    case 'clear-recovery-codes':
      return {
        ...state,
        recoveryCodes: AUTH_REDUCER_INITIAL_STATE.recoveryCodes,
      };

    case 'logout':
      return AUTH_REDUCER_INITIAL_STATE;

    default:
      return state;
  }
}
