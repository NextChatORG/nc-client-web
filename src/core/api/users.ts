import { gql } from '@apollo/client';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  createdAt?: string;
  username: string;
  role?: Role;
  profileImage: string;
}

export enum UserProfileAction {
  CAN_EDIT_PROFILE = 'CAN_EDIT_PROFILE',
  CAN_SEND_FRIEND_REQUEST = 'CAN_SEND_FRIEND_REQUEST',
  CAN_UNSEND_FRIEND_REQUEST = 'CAN_UNSEND_FRIEND_REQUEST',
  CAN_ACCEPT_FRIEND_REQUEST = 'CAN_ACCEPT_FRIEND_REQUEST',
  CAN_DECLINE_FRIEND_REQUEST = 'CAN_DECLINE_FRIEND_REQUEST',
  CAN_SEND_MESSAGE = 'CAN_SEND_MESSAGE',
  CAN_REMOVE_FRIEND = 'CAN_REMOVE_FRIEND',
}

export interface UserProfileCounters {
  friends?: number;
  friendRequests?: number;
}

export interface UserProfile
  extends Pick<User, 'id' | 'createdAt' | 'profileImage' | 'username'> {
  actions: UserProfileAction[];
  counters?: UserProfileCounters;
}

export interface ProfileVariables {
  username?: string;
}

export interface ProfileResponse {
  profile: UserProfile;
}

export const PROFILE_QUERY = gql`
  query profile($username: String) {
    profile(username: $username) {
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

export interface ProfileActionsChangedVariables {
  username: string;
}

export interface ProfileActionsChangedResponse {
  profileActionsChanged: {
    actions: UserProfileAction[];
  };
}

export const PROFILE_ACTIONS_CHANGED_SUBSCRIPTION = gql`
  subscription profileActionsChanged($username: String!) {
    profileActionsChanged(username: $username) {
      actions
    }
  }
`;
