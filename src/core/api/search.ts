import { gql } from '@apollo/client';
import { Message } from './messages';
import { UserProfile } from './user';

export enum SearchResultType {
  MESSAGE,
  USER,
}

export interface SearchResult {
  type: SearchResultType;
  messageData?: Message | null;
  userData?: UserProfile | null;
}

export interface SearchVariables {
  searchText: string;
}

export interface SearchResponse {
  search: SearchResult[];
}

export const SEARCH_QUERY = gql`
  query search($searchText: String!) {
    search(searchText: $searchText) {
      type
      messageData {
        id
        content
        createdAt
        fromUser {
          id
          username
        }
        toUser {
          id
          username
        }
      }
      userData {
        id
        username
        actions {
          isFriend
          isFriendRequest
          isMe
        }
      }
    }
  }
`;
