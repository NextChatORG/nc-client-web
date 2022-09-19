import { UserProfileAction } from '@nc-core/api';

export interface UserProfileActions {
  isMe: boolean;
  canSendFriendRequest: boolean;
  canUnSendFriendRequest: boolean;
  canAcceptFriendRequest: boolean;
  canDeclineFriendRequest: boolean;
  canSendMessage: boolean;
  canRemoveFriend: boolean;
}

export function parseUserProfileActions(
  actions: UserProfileAction[],
): UserProfileActions {
  return {
    isMe: actions.includes(UserProfileAction.CAN_EDIT_PROFILE),
    canSendFriendRequest: actions.includes(
      UserProfileAction.CAN_SEND_FRIEND_REQUEST,
    ),
    canUnSendFriendRequest: actions.includes(
      UserProfileAction.CAN_UNSEND_FRIEND_REQUEST,
    ),
    canAcceptFriendRequest: actions.includes(
      UserProfileAction.CAN_ACCEPT_FRIEND_REQUEST,
    ),
    canDeclineFriendRequest: actions.includes(
      UserProfileAction.CAN_DECLINE_FRIEND_REQUEST,
    ),
    canSendMessage: actions.includes(UserProfileAction.CAN_SEND_MESSAGE),
    canRemoveFriend: actions.includes(UserProfileAction.CAN_REMOVE_FRIEND),
  };
}
