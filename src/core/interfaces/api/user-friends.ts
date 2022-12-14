import { ObjectId, Pagination } from './common';
import { User } from './users';

export enum UserFriendStatus {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
}

export interface UserFriend {
  id: ObjectId;
  createdAt: number;
  userOneId: ObjectId;
  userOne?: User | null;
  userTwoId: ObjectId;
  userTwo?: User | null;
  status: UserFriendStatus;
}

export interface GetFriendsVariables extends Pagination {
  userId?: ObjectId;
}

export interface GetFriendsResponse {
  getFriends: User[];
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
