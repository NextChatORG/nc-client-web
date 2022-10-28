import {
  GET_CHAT_AND_MESSAGES_QUERY,
  GET_RECENT_CHATS_QUERY,
  READ_ALL_MESSAGES_MUTATION,
} from '@nc-core/api';
import { MessagesContext } from '@nc-core/contexts';
import {
  GetChatAndMessagesResponse,
  GetChatAndMessagesVariables,
  GetRecentChatsResponse,
  ObjectId,
  ReadAllMessagesResponse,
  ReadAllMessagesVariables,
  RecentChat,
  UserChat,
  UserMessage,
} from '@nc-core/interfaces/api';
import { useContext } from 'react';
import { useLazyQuery } from './useLazyQuery';
import { useMutation } from './useMutation';

export interface MessagesHookProps {
  onLoadChatAndMessagesCompleted?(): void;
}

export interface MessagesHook {
  chats: { [key: ObjectId]: { chat?: UserChat; messages: UserMessage[] } };
  recentChats: RecentChat[];
  unreadChats: number;
  appendMessage(message: UserMessage): void;
  loadChat(chatId: ObjectId): Promise<GetChatAndMessagesResponse | undefined>;
  loadRecentChats(): Promise<void>;
  readAllMessages(chatId: ObjectId, userId: ObjectId): Promise<void>;
}

export function useMessages(props?: MessagesHookProps): MessagesHook {
  const { dispatch, state } = useContext(MessagesContext);

  const [fetchRecentChats] = useLazyQuery<GetRecentChatsResponse>(
    GET_RECENT_CHATS_QUERY,
    {
      fetchPolicy: 'network-only',
      onCompleted({ getRecentChats }) {
        if (!dispatch) return;

        dispatch({ type: 'set-recent-chats', payload: getRecentChats });
      },
    },
  );

  async function loadRecentChats(): Promise<void> {
    await fetchRecentChats();
  }

  const [fetchChatAndMessages] = useLazyQuery<
    GetChatAndMessagesResponse,
    GetChatAndMessagesVariables
  >(GET_CHAT_AND_MESSAGES_QUERY, {
    onCompleted({ chat, messages }) {
      if (!dispatch) return;

      dispatch({ type: 'append-user-chat', payload: { chat, messages } });

      if (props?.onLoadChatAndMessagesCompleted) {
        props.onLoadChatAndMessagesCompleted();
      }
    },
  });

  const [readAllMessages] = useMutation<
    ReadAllMessagesResponse,
    ReadAllMessagesVariables
  >(READ_ALL_MESSAGES_MUTATION, {
    onCompleted({ readAllMessages }) {
      if (!readAllMessages || !dispatch) return;

      loadRecentChats();
    },
  });

  return {
    chats: state.chats,
    recentChats: state.recentChats,
    unreadChats: state.recentChats.reduce(
      (prev, cur) => prev + (cur.unread > 0 ? 1 : 0),
      0,
    ),
    appendMessage(payload) {
      if (!dispatch) return;

      dispatch({ type: 'append-user-message', payload });
    },
    async loadChat(chatId) {
      const { data } = await fetchChatAndMessages({ variables: { chatId } });
      return data;
    },
    loadRecentChats,
    async readAllMessages(chatId, userId) {
      if (!dispatch) return;

      await readAllMessages({ variables: { chatId } });

      dispatch({
        type: 'read-all-messages',
        payload: { chatId, userId },
      });
    },
  };
}
