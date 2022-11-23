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
    case 'append-user-chat': {
      const chatId = action.payload.chat.id;

      if (state.chats[chatId]) {
        const chats = Object.entries(state.chats).reduce(
          (prev, [currentChatId, { chat, messages }]) => {
            if (chatId === currentChatId) {
              chat = action.payload.chat;
              messages = action.payload.messages.concat(messages);
            }

            return {
              ...prev,
              [currentChatId]: { chat, messages },
            };
          },
          {},
        );

        return { ...state, chats };
      }

      return { ...state, chats: { ...state.chats, [chatId]: action.payload } };
    }

    case 'append-user-message': {
      const { chatId } = action.payload;

      if (state.chats[chatId]) {
        const chats = Object.entries(state.chats).reduce(
          (prev, [currentChatId, { chat, messages }]) => {
            if (chatId === currentChatId) {
              return {
                ...prev,
                [currentChatId]: {
                  chat,
                  messages: [...messages, action.payload],
                },
              };
            }

            return { ...prev, [currentChatId]: { chat, messages } };
          },
          {},
        );

        return { ...state, chats };
      }

      return {
        ...state,
        chats: { ...state.chats, [chatId]: { messages: [action.payload] } },
      };
    }

    case 'read-all-messages': {
      const { chatId } = action.payload;

      const chats = Object.entries(state.chats).reduce(
        (prev, [currentChatId, { chat, messages }]) => {
          if (chatId === currentChatId) {
            messages = messages.map((message) => {
              if (!message.read && message.senderId !== action.payload.userId) {
                return { ...message, read: true };
              }

              return message;
            });
          }

          return { ...prev, [currentChatId]: { chat, messages } };
        },
        {},
      );

      return { ...state, chats };
    }

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
