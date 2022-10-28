import {
  MessagesReducerActions,
  MessagesReducerState,
  MESSAGES_REDUCER_INITIAL_STATE,
} from '@nc-core/reducers';
import { createContext } from 'react';

export interface IMessagesContext {
  dispatch: React.Dispatch<MessagesReducerActions> | null;
  state: MessagesReducerState;
}

export const MessagesContext = createContext<IMessagesContext>({
  dispatch: null,
  state: MESSAGES_REDUCER_INITIAL_STATE,
});
