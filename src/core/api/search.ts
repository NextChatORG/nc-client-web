import { gql } from '@apollo/client';
import { Message } from './messages';
import { UserProfile } from './users';

export enum SearchResultType {
  MESSAGE = 'MESSAGE',
  USER = 'USER',
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
        fromUserId
        fromUser {
          id
          profileImage
          username
        }
        toUserId
        toUser {
          id
          profileImage
          username
        }
      }
      userData {
        id
        actions
        username
        profileImage
      }
    }
  }
`;
