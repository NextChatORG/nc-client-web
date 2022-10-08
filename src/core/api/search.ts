import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
  query search($searchText: String!) {
    search(searchText: $searchText) {
      type
      userData {
        id
        actions
        username
        profileImage
      }
    }
  }
`;
