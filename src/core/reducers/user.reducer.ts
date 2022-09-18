import { UserProfile } from '@nc-core/api';
import { JWT_TOKEN } from '@nc-core/constants/local-storage';

export interface UserReducerState {
  jwt: string | null;
  profileData: UserProfile | null;
}

export const userReducerInitialState: UserReducerState = {
  jwt: localStorage.getItem(JWT_TOKEN),
  profileData: null,
};

interface LogOutAction {
  type: 'logout';
}

interface SetJWTAction {
  type: 'set-jwt';
  payload: string;
}

interface SetProfileDataAction {
  type: 'set-profile-data';
  payload: UserProfile;
}

export type UserReducerActions =
  | LogOutAction
  | SetJWTAction
  | SetProfileDataAction;

export function userReducer(
  state: UserReducerState,
  action: UserReducerActions,
): UserReducerState {
  switch (action.type) {
    case 'logout':
      return { jwt: null, profileData: null };

    case 'set-jwt':
      return { jwt: action.payload, profileData: null };

    case 'set-profile-data':
      return { ...state, profileData: action.payload };

    default:
      return state;
  }
}
