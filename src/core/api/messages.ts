import { gql } from '@apollo/client';
import { User } from './user';

export interface Message {
  id: string;
  content: string;
  createdAt: number;
  fromUser?: User | null;
  fromUserId: string;
  toUser?: User | null;
  toUserId: string;
}

export interface RecentMessage {
  content: string;
  createdAt: number;
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
      profileImage
      unread
      userId
      username
    }
  }
`;
