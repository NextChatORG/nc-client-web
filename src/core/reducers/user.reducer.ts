import { JWT_TOKEN } from '@nc-core/constants/local-storage';

export interface UserReducerState {
  jwt: string | null;
}

export const userReducerInitialState: UserReducerState = {
  jwt: localStorage.getItem(JWT_TOKEN),
};

interface LogInAction {
  type: 'login';
  payload: {
    jwt: string;
  };
}

interface LogOutAction {
  type: 'logout';
}

export type UserReducerActions = LogInAction | LogOutAction;

export function userReducer(
  state: UserReducerState,
  action: UserReducerActions,
): UserReducerState {
  switch (action.type) {
    case 'login':
      return { ...state, jwt: action.payload.jwt };

    case 'logout':
      return { ...state, jwt: null };

    default:
      return state;
  }
}
