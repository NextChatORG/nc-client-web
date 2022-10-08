import { gql } from '@apollo/client';

export const GET_RECENT_CHATS_QUERY = gql`
  query getRecentChats {
    getRecentChats {
      chat {
        id
        toId
        toUser {
          profileImage
          username
        }
        type
        userId
        user {
          profileImage
          username
        }
      }
      lastMessage {
        chatId
        content
        createdAt
        id
        read
        senderId
      }
      unread
    }
  }
`;

export const GET_CHAT_QUERY = gql`
  query getChat($userId: ObjectId!) {
    getChat(userId: $userId) {
      id
      toId
      type
      userId
    }
  }
`;

export const GET_CHAT_AND_MESSAGES_QUERY = gql`
  query getChatAndMessages($chatId: ObjectId!) {
    chat: getChat(chatId: $chatId) {
      id
      toId
      toUser {
        profileImage
        username
      }
      type
      userId
      user {
        profileImage
        username
      }
    }
    messages: getMessages(chatId: $chatId) {
      chatId
      content
      createdAt
      id
      read
      senderId
      senderUser {
        profileImage
        username
      }
    }
  }
`;

export const READ_ALL_MESSAGES_MUTATION = gql`
  mutation readAllMessages($chatId: ObjectId!) {
    readAllMessages(chatId: $chatId)
  }
`;

export const SEND_PRIVATE_MESSAGE_MUTATION = gql`
  mutation sendPrivateMessage($chatId: ObjectId!, $content: String!) {
    sendPrivateMessage(chatId: $chatId, content: $content) {
      chatId
      content
      createdAt
      id
      read
      senderId
      senderUser {
        profileImage
        username
      }
    }
  }
`;

export const NEW_PRIVATE_MESSAGE_SUBSCRIPTION = gql`
  subscription newPrivateMessage($chatId: ObjectId!) {
    newPrivateMessage(chatId: $chatId) {
      chatId
      content
      createdAt
      id
      read
      senderId
      senderUser {
        profileImage
        username
      }
    }
  }
`;
