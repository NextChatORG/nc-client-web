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
      settings {
        lastPasswordChanged
        lastUsernameChanged
        twoFactorEnabled
      }
    }
  }
`;

export const CHANGE_USERNAME_MUTATION = gql`
  mutation changeUsername($password: String!, $username: String!) {
    changeUsername(password: $password, username: $username) {
      accessToken
      profile {
        id
        actions
        username
        createdAt
        profileImage
        counters {
          friendRequests
          friends
        }
        settings {
          lastPasswordChanged
          lastUsernameChanged
          twoFactorEnabled
        }
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
