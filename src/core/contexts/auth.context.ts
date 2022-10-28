import {
  AuthReducerActions,
  AuthReducerState,
  AUTH_REDUCER_INITIAL_STATE,
} from '@nc-core/reducers';
import { createContext } from 'react';

export interface IAuthContext {
  dispatch: React.Dispatch<AuthReducerActions> | null;
  state: AuthReducerState;
}

export const AuthContext = createContext<IAuthContext>({
  dispatch: null,
  state: AUTH_REDUCER_INITIAL_STATE,
});
