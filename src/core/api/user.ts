import { gql } from '@apollo/client';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  id?: string;
  createdAt?: string;
  username?: string;
  role?: Role;
}

export enum UserFriendStatus {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted',
}

export interface UserProfileActions {
  isFriend?: boolean;
  isFriendRequest?: boolean;
  isMe?: boolean;
}

export interface UserProfileCounters {
  friends?: number;
  friendRequests?: number;
}

export interface UserProfile
  extends Pick<User, 'id' | 'createdAt' | 'username'> {
  actions?: UserProfileActions;
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
      createdAt
      username
      actions {
        isFriend
        isFriendRequest
        isMe
      }
      counters {
        friendRequest
        friends
      }
    }
  }
`;
