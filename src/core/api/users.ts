import { gql } from '@apollo/client';

export const GET_PROFILE_QUERY = gql`
  query getProfile($username: String) {
    getProfile(username: $username) {
      id
      actions
      username
      createdAt
      profileImage
      counters {
        friendRequests
        friends
      }
    }
  }
`;

export const PROFILE_ACTIONS_CHANGED_SUBSCRIPTION = gql`
  subscription profileActionsChanged($username: String!) {
    profileActionsChanged(username: $username) {
      actions
    }
  }
`;
