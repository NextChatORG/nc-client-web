import {
  ObjectId,
  RecentChat,
  UserChat,
  UserMessage,
} from '@nc-core/interfaces/api';

export interface MessagesReducerState {
  chats: { [key: ObjectId]: { chat?: UserChat; messages: UserMessage[] } };
  recentChats: RecentChat[];
  serviceWorker: ServiceWorkerRegistration | null;
}

export const MESSAGES_REDUCER_INITIAL_STATE: MessagesReducerState = {
  chats: {},
  recentChats: [],
  serviceWorker: null,
};

interface AppendUserChatAction {
  type: 'append-user-chat';
  payload: { chat: UserChat; messages: UserMessage[] };
}

interface AppendUserMessageAction {
  type: 'append-user-message';
  payload: UserMessage;
}

interface ReadAllMessagesAction {
  type: 'read-all-messages';
  payload: { chatId: ObjectId; userId: ObjectId };
}

interface SetRecentChatsAction {
  type: 'set-recent-chats';
  payload: RecentChat[];
}

interface SetServiceWorkerAction {
  type: 'set-service-worker';
  payload: ServiceWorkerRegistration | null;
}

interface ResetAction {
  type: 'reset';
}

export type MessagesReducerActions =
  | AppendUserChatAction
  | AppendUserMessageAction
  | ReadAllMessagesAction
  | SetRecentChatsAction
  | SetServiceWorkerAction
  | ResetAction;

export function messagesReducer(
  state: MessagesReducerState,
  action: MessagesReducerActions,
): MessagesReducerState {
  switch (action.type) {
    case 'append-user-chat':
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chat.id]: {
            chat: action.payload.chat,
            messages: [
              ...action.payload.messages,
              ...(state.chats[action.payload.chat.id]?.messages ?? []),
            ],
          },
        },
      };

    case 'append-user-message':
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatId]: {
            chat: state.chats[action.payload.chatId]?.chat,
            messages: [
              ...(state.chats[action.payload.chatId]?.messages ?? []),
              action.payload,
            ],
          },
        },
      };

    case 'read-all-messages':
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.chatId]: {
            chat: state.chats[action.payload.chatId]?.chat,
            messages: (state.chats[action.payload.chatId]?.messages ?? []).map(
              (message) => {
                if (
                  !message.read &&
                  message.senderId !== action.payload.userId
                ) {
                  return { ...message, read: true };
                }

                return message;
              },
            ),
          },
        },
      };

    case 'set-recent-chats':
      return { ...state, recentChats: action.payload };

    case 'set-service-worker':
      return { ...state, serviceWorker: action.payload };

    case 'reset':
      return MESSAGES_REDUCER_INITIAL_STATE;

    default:
      return state;
  }
}
