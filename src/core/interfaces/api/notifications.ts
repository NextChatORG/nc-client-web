import { ObjectId } from './common';
import { User } from './users';

export enum NotificationType {
  NEW_FRIEND_REQUEST = 'NEW_FRIEND_REQUEST',
  SERVER_MESSAGE = 'SERVER_MESSAGE',
}

export interface Notification {
  createdAt: number;
  data: string;
  dataUser?: User | null;
  id: ObjectId;
  read: boolean;
  type: NotificationType;
  user?: User | null;
  userId: ObjectId;
}

export interface GetNotificationsResponse {
  getNotifications: Notification[];
}

export interface ReadAllNotificationsResponse {
  readAllNotifications: boolean;
}

export interface ReadNotificationVariables {
  notificationId: ObjectId;
}

export interface ReadNotificationResponse {
  readNotification: boolean;
}

export interface NewNotificationResponse {
  newNotification: Notification;
}

export interface RemoveNotificationResponse {
  removeNotification: ObjectId;
}
