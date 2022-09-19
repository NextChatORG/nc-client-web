import { gql } from '@apollo/client';
import { User } from './users';

export enum UserFriendStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
}

export interface UserFriend {
  id: string;
  date: number;
  userOneId: string;
  userOne?: User | null;
  userTwoId: string;
  userTwo?: User | null;
  status: UserFriendStatus;
}

export interface FriendRequestVariables {
  userId: string;
}

export interface SendFriendRequestResponse {
  sendFriendRequest: UserFriend;
}

export const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation sendFriendRequest($userId: String!) {
    sendFriendRequest(userId: $userId) {
      id
      date
      userOneId
      userTwoId
      status
    }
  }
`;

export interface CancelFriendRequestResponse {
  cancelFriendRequest: boolean;
}

export const CANCEL_FRIEND_REQUEST_MUTATION = gql`
  mutation cancelFriendRequest($userId: String!) {
    cancelFriendRequest(userId: $userId)
  }
`;

export interface AcceptFriendRequestResponse {
  acceptFriendRequest: boolean;
}

export const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation acceptFriendRequest($userId: String!) {
    acceptFriendRequest(userId: $userId)
  }
`;

export interface DeclineFriendRequestResponse {
  declineFriendRequest: boolean;
}

export const DECLINE_FRIEND_REQUEST_MUTATION = gql`
  mutation declineFriendRequest($userId: String!) {
    declineFriendRequest(userId: $userId)
  }
`;

export interface deleteFriendResponse {
  deleteFriend: boolean;
}

export const DELETE_FRIEND_MUTATION = gql`
  mutation deleteFriend($userId: String!) {
    deleteFriend(userId: $userId)
  }
`;
