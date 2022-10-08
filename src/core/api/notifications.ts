import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS_QUERY = gql`
  query getNotifications {
    getNotifications {
      createdAt
      data
      dataUser {
        id
        profileImage
        username
      }
      id
      read
      type
      userId
    }
  }
`;

export const READ_ALL_NOTIFICATIONS_MUTATION = gql`
  mutation readAllNotifications {
    readAllNotifications
  }
`;

export const READ_NOTIFICATION_MUTATION = gql`
  mutation readNotification($notificationId: ObjectId!) {
    readNotification(notificationId: $notificationId)
  }
`;

export const NEW_NOTIFICATION_SUBSCRIPTION = gql`
  subscription newNotification {
    newNotification {
      createdAt
      data
      dataUser {
        id
        profileImage
        username
      }
      id
      read
      type
      userId
    }
  }
`;

export const REMOVE_NOTIFICATION_SUBSCRIPTION = gql`
  subscription removeNotification {
    removeNotification
  }
`;
