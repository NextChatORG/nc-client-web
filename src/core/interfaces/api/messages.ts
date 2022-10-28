import { ObjectId } from './common';
import { User } from './users';

export enum UserChatType {
  BOT = 'BOT',
  USER = 'USER',
}

export interface UserChat {
  id: ObjectId;
  toId: ObjectId;
  toUser?: User | null;
  type: UserChatType;
  user?: User | null;
  userId: ObjectId;
}

export interface UserMessage {
  chat?: UserChat | null;
  chatId: ObjectId;
  content: string;
  createdAt: number;
  id: ObjectId;
  read: boolean;
  senderId: ObjectId;
  senderUser?: User | null;
}

export interface RecentChat {
  chat: UserChat;
  lastMessage: UserMessage;
  unread: number;
}

export interface GetRecentChatsResponse {
  getRecentChats: RecentChat[];
}

export interface GetChatVariables {
  userId: ObjectId;
}

export interface GetChatResponse {
  getChat: UserChat;
}

export interface GetChatAndMessagesVariables {
  chatId: ObjectId;
}

export interface GetChatAndMessagesResponse {
  chat: UserChat;
  messages: UserMessage[];
}

export interface ReadAllMessagesVariables {
  chatId: ObjectId;
}

export interface ReadAllMessagesResponse {
  readAllMessages: boolean;
}

export interface SendPrivateMessageVariables {
  chatId: ObjectId;
  content: string;
}

export interface SendPrivateMessageResponse {
  sendPrivateMessage: UserMessage;
}

export interface NewPrivateMessageResponse {
  newPrivateMessage: UserMessage;
}
