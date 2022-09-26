import { AuthReducerActions, AuthReducerState } from '@nc-core/reducers';
import { createContext } from 'react';

export interface IAuthContext {
  dispatch: React.Dispatch<AuthReducerActions> | null;
  state: AuthReducerState | null;
}

export const AuthContext = createContext<IAuthContext>({
  dispatch: null,
  state: null,
});
