import { gql } from '@apollo/client';

export enum NotificationType {
  NEW_FRIEND_REQUEST = 'NEW_FRIEND_REQUEST',
}

export interface Notification {
  id: string;
  data: string;
  read: boolean;
  createdAt: number;
  type: NotificationType;
}

export interface GetNotificationsResponse {
  getNotifications: Notification[];
}

export const GET_NOTIFICATIONS_QUERY = gql`
  query getNotifications {
    getNotifications {
      id
      data
      read
      type
      createdAt
    }
  }
`;

export interface NewNotificationResponse {
  newNotification: {
    notification: Notification;
  };
}

export const NEW_NOTIFICATION_SUBSCRIPTION = gql`
  subscription newNotification {
    newNotification {
      notification {
        id
        data
        read
        type
        createdAt
      }
    }
  }
`;

export interface RemoveNotificationResponse {
  removeNotification: {
    notificationId: string;
  };
}

export const REMOVE_NOTIFICATION_SUBSCRIPTION = gql`
  subscription removeNotification {
    removeNotification {
      notificationId
    }
  }
`;
