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

export const GET_WEB_PUSH_PUBLIC_KEY_QUERY = gql`
  query getWebPushPublicKey {
    getWebPushPublicKey
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword(
    $code: String
    $confirmNewPassword: String!
    $currentPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      code: $code
      confirmNewPassword: $confirmNewPassword
      currentPassword: $currentPassword
      newPassword: $newPassword
    )
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

export const CREATE_PUSH_MUTATION = gql`
  mutation createPush(
    $authKey: String!
    $endpoint: String!
    $expirationTime: Float
    $p256dhKey: String!
  ) {
    createPush(
      authKey: $authKey
      endpoint: $endpoint
      expirationTime: $expirationTime
      p256dhKey: $p256dhKey
    ) {
      endpoint
    }
  }
`;

export const DELETE_PUSH_BY_ENDPOINT_MUTATION = gql`
  mutation deletePushByEndpoint($endpoint: String!) {
    deletePushByEndpoint(endpoint: $endpoint)
  }
`;

export const PROFILE_ACTIONS_CHANGED_SUBSCRIPTION = gql`
  subscription profileActionsChanged($username: String!) {
    profileActionsChanged(username: $username) {
      actions
    }
  }
`;
