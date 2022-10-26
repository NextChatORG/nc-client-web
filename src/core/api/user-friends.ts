import { gql } from '@apollo/client';

export const GET_FRIENDS_QUERY = gql`
  query getFriends(
    $orderBy: String
    $orderDirection: OrderDirection
    $page: Int!
    $perPage: Int!
    $userId: ObjectId
  ) {
    getFriends(
      orderBy: $orderBy
      orderDirection: $orderDirection
      page: $page
      perPage: $perPage
      userId: $userId
    ) {
      id
      profileImage
      username
    }
  }
`;

export const SEND_FRIEND_REQUEST_MUTATION = gql`
  mutation sendFriendRequest($userId: ObjectId!) {
    sendFriendRequest(userId: $userId) {
      id
      createdAt
      userOneId
      userTwoId
      status
    }
  }
`;

export const CANCEL_FRIEND_REQUEST_MUTATION = gql`
  mutation cancelFriendRequest($userId: ObjectId!) {
    cancelFriendRequest(userId: $userId)
  }
`;

export const ACCEPT_FRIEND_REQUEST_MUTATION = gql`
  mutation acceptFriendRequest($userId: ObjectId!) {
    acceptFriendRequest(userId: $userId)
  }
`;

export const DECLINE_FRIEND_REQUEST_MUTATION = gql`
  mutation declineFriendRequest($userId: ObjectId!) {
    declineFriendRequest(userId: $userId)
  }
`;

export const DELETE_FRIEND_MUTATION = gql`
  mutation deleteFriend($userId: ObjectId!) {
    deleteFriend(userId: $userId)
  }
`;
