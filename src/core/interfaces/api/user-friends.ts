import { ObjectId } from './common';
import { User } from './users';

export enum UserFriendStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
}

export interface UserFriend {
  id: ObjectId;
  date: number;
  userOneId: ObjectId;
  userOne?: User | null;
  userTwoId: ObjectId;
  userTwo?: User | null;
  status: UserFriendStatus;
}

export interface FriendRequestVariables {
  userId: ObjectId;
}

export interface SendFriendRequestResponse {
  sendFriendRequest: UserFriend;
}

export interface CancelFriendRequestResponse {
  cancelFriendRequest: boolean;
}

export interface AcceptFriendRequestResponse {
  acceptFriendRequest: boolean;
}

export interface DeclineFriendRequestResponse {
  declineFriendRequest: boolean;
}

export interface deleteFriendResponse {
  deleteFriend: boolean;
}
