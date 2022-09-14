import { UserReducerActions, UserReducerState } from '@nc-core/reducers';
import { createContext } from 'react';

export interface IUserContext {
  dispatch: React.Dispatch<UserReducerActions> | null;
  state: UserReducerState | null;
}

export const UserContext = createContext<IUserContext>({
  dispatch: null,
  state: null,
});
