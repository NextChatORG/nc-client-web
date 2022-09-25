import { gql } from '@apollo/client';
import { User, UserProfile } from './users';

export interface Message {
  id: string;
  content: string;
  createdAt: number;
  read: boolean;
  fromUser?: User | null;
  fromUserId: string;
  toUser?: User | null;
  toUserId: string;
}

export interface RecentMessage {
  content: string;
  createdAt: number;
  isMe: boolean;
  profileImage: string;
  unread: number;
  userId: string;
  username: string;
}

export interface GetRecentMessagesResponse {
  getRecentMessages: RecentMessage[];
}

export const GET_RECENT_MESSAGES_QUERY = gql`
  query getRecentMessages {
    getRecentMessages {
      content
      createdAt
      isMe
      profileImage
      unread
      userId
      username
    }
  }
`;

export interface GetMessagesVariables {
  chatId: string;
}

export interface GetMessagesResponse {
  messages: Message[];
  profile: Pick<UserProfile, 'profileImage' | 'username'>;
}

export const GET_MESSAGES_QUERY = gql`
  query getMessages($chatId: String!) {
    messages: getMessages(userId: $chatId) {
      id
      content
      createdAt
      read
      fromUser {
        username
        profileImage
      }
      fromUserId
      toUser {
        username
        profileImage
      }
      toUserId
    }
    profile: getProfile(id: $chatId) {
      username
      profileImage
    }
  }
`;

export interface ReadAllMessagesVariables {
  chatId: string;
}

export interface ReadAllMessagesResponse {
  readAllMessages: boolean;
}

export const READ_ALL_MESSAGES_MUTATION = gql`
  mutation readAllMessages($chatId: String!) {
    readAllMessages(userId: $chatId)
  }
`;

export interface SendMessageVariables {
  chatId: string;
  content: string;
}

export interface SendMessageResponse {
  sendMessage: Message;
}

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($chatId: String!, $content: String!) {
    sendMessage(content: $content, userId: $chatId) {
      id
      content
      createdAt
      read
      fromUser {
        username
        profileImage
      }
      fromUserId
      toUser {
        username
        profileImage
      }
      toUserId
    }
  }
`;

export interface NewMessageVariables {
  chatId: string;
}

export interface NewMessageResponse {
  newMessage: Message;
}

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage($chatId: String!) {
    newMessage(userId: $chatId) {
      id
      content
      createdAt
      read
      fromUser {
        username
        profileImage
      }
      fromUserId
      toUser {
        username
        profileImage
      }
      toUserId
    }
  }
`;
