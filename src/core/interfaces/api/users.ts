import { ObjectId } from './common';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: ObjectId;
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

export interface UserProfileSettings {
  lastPasswordChanged?: number;
  lastUsernameChanged?: number;
  twoFactorEnabled?: boolean;
}

export interface UserProfile
  extends Pick<User, 'id' | 'createdAt' | 'profileImage' | 'username'> {
  actions: UserProfileAction[];
  counters?: UserProfileCounters;
  settings?: UserProfileSettings;
}

export interface GetProfileVariables {
  username?: string;
}

export interface GetProfileResponse {
  getProfile: UserProfile;
}

export interface GetWebPushPublicKeyResponse {
  getWebPushPublicKey: string;
}

export interface ChangePasswordVariables {
  code?: string;
  confirmNewPassword: string;
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  changePassword: string;
}

export interface ChangeUsernameVariables {
  password: string;
  username: string;
}

export interface ChangeUsernameResponse {
  changeUsername: {
    accessToken: string;
    profile: UserProfile;
  };
}

export interface CreatePushVariables {
  auth_key: string;
  endpoint: string;
  expirationTime?: number;
  p256dh_key: string;
}

export interface CreatePushResponse {
  createPush: { endpoint: string };
}

export interface DeletePushByEndpointVariables {
  endpoint: string;
}

export interface DeletePushByEndpointResponse {
  deletePushByEndpoint: boolean;
}

export interface ProfileActionsChangedVariables {
  username: string;
}

export interface ProfileActionsChangedResponse {
  profileActionsChanged: {
    actions: UserProfileAction[];
  };
}
