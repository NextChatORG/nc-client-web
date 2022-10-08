import { UserProfile } from './users';

export enum SearchResultType {
  MESSAGE = 'MESSAGE',
  USER = 'USER',
}

export interface SearchResult {
  type: SearchResultType;
  userData?: UserProfile | null;
}

export interface SearchVariables {
  searchText: string;
}

export interface SearchResponse {
  search: SearchResult[];
}
