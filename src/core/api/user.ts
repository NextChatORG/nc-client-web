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

export enum UserFriendStatus {
  REQUESTED = 'requested',
  ACCEPTED = 'accepted',
}

export interface UserProfileActions {
  isFriend?: boolean;
  isFriendRequested?: boolean;
  isMe?: boolean;
}

export interface UserProfileCounters {
  friends?: number;
  friendRequests?: number;
}

export interface UserProfile
  extends Pick<User, 'id' | 'createdAt' | 'profileImage' | 'username'> {
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
      profileImage
      username
      actions {
        isFriend
        isFriendRequested
        isMe
      }
      counters {
        friendRequests
        friends
      }
    }
  }
`;
