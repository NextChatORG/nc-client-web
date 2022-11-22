import {
  ACCEPT_FRIEND_REQUEST_MUTATION,
  CANCEL_FRIEND_REQUEST_MUTATION,
  DECLINE_FRIEND_REQUEST_MUTATION,
  GET_CHAT_QUERY,
  GET_PROFILE_QUERY,
  PROFILE_ACTIONS_CHANGED_SUBSCRIPTION,
  SEND_FRIEND_REQUEST_MUTATION,
} from '@nc-core/api';
import {
  PROFILE_SETTINGS_ROUTE,
  USER_CHAT_ROUTE,
} from '@nc-core/constants/routes';
import { useAuth, useLazyQuery, useMutation } from '@nc-core/hooks';
import {
  AcceptFriendRequestResponse,
  CancelFriendRequestResponse,
  DeclineFriendRequestResponse,
  FriendRequestVariables,
  GetChatResponse,
  GetChatVariables,
  GetProfileResponse,
  GetProfileVariables,
  ProfileActionsChangedResponse,
  ProfileActionsChangedVariables,
  SendFriendRequestResponse,
} from '@nc-core/interfaces/api';
import {
  DEFAULT_USER_PROFILE_ACTIONS,
  parseUserProfileActions,
  UserProfileActions,
} from '@nc-core/utils';
import { AddCommentIcon, CloseIcon, EditIcon, PersonAddIcon } from '@nc-icons';
import { Button, Label, MainTemplate } from '@nc-ui';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useOutlet, useParams } from 'react-router-dom';
import ProfileFriends from './ProfileFriends';

export default function Profile(): JSX.Element {
  const [actions, setActions] = useState<UserProfileActions | null>(null);

  const { data: meData } = useAuth();
  const { username } = useParams();
  const outlet = useOutlet();

  const [getProfile, { data: userData, subscribeToMore }] = useLazyQuery<
    GetProfileResponse,
    GetProfileVariables
  >(GET_PROFILE_QUERY);

  const [getChat, { data: chatData }] = useLazyQuery<
    GetChatResponse,
    GetChatVariables
  >(GET_CHAT_QUERY);

  const [sendFriendRequest, { loading: sendingFriendRequest }] = useMutation<
    SendFriendRequestResponse,
    FriendRequestVariables
  >(SEND_FRIEND_REQUEST_MUTATION, {
    onCompleted({ sendFriendRequest }) {
      if (!sendFriendRequest) return;

      setActions({
        ...DEFAULT_USER_PROFILE_ACTIONS,
        canUnSendFriendRequest: true,
      });
    },
  });

  const [cancelFriendRequest, { loading: cancelingFriendRequest }] =
    useMutation<CancelFriendRequestResponse, FriendRequestVariables>(
      CANCEL_FRIEND_REQUEST_MUTATION,
      {
        onCompleted({ cancelFriendRequest }) {
          if (!cancelFriendRequest) return;

          setActions({
            ...DEFAULT_USER_PROFILE_ACTIONS,
            canSendFriendRequest: true,
          });
        },
      },
    );

  const [acceptFriendRequest, { loading: acceptingFriendRequest }] =
    useMutation<AcceptFriendRequestResponse, FriendRequestVariables>(
      ACCEPT_FRIEND_REQUEST_MUTATION,
      {
        onCompleted({ acceptFriendRequest }) {
          if (!acceptFriendRequest) return;

          setActions({ ...DEFAULT_USER_PROFILE_ACTIONS, canSendMessage: true });
        },
      },
    );

  const [declineFriendRequest, { loading: decliningFriendRequest }] =
    useMutation<DeclineFriendRequestResponse, FriendRequestVariables>(
      DECLINE_FRIEND_REQUEST_MUTATION,
      {
        onCompleted({ declineFriendRequest }) {
          if (!declineFriendRequest) return;

          setActions({ ...DEFAULT_USER_PROFILE_ACTIONS, canSendMessage: true });
        },
      },
    );

  function handleSendFriendRequest() {
    if (!profileData?.id || !actions?.canSendFriendRequest) return;

    return sendFriendRequest({ variables: { userId: profileData.id } });
  }

  function handleUnSendFriendRequest() {
    if (!profileData?.id || !actions?.canUnSendFriendRequest) return;

    return cancelFriendRequest({ variables: { userId: profileData.id } });
  }

  function handleAcceptFriendRequest() {
    if (!profileData?.id || !actions?.canAcceptFriendRequest) return;

    return acceptFriendRequest({ variables: { userId: profileData.id } });
  }

  function handleDeclineFriendRequest() {
    if (!profileData?.id || !actions?.canDeclineFriendRequest) return;

    return declineFriendRequest({ variables: { userId: profileData.id } });
  }

  const isMe = username === meData?.username;

  const profileData = username
    ? isMe
      ? meData
      : userData?.getProfile ?? null
    : meData;

  useEffect(() => {
    if (username && username.length >= 4 && !isMe) {
      getProfile({ variables: { username } });
    }
  }, [username]);

  useEffect(() => {
    if (profileData?.actions) {
      setActions(parseUserProfileActions(profileData.actions));

      if (!isMe) getChat({ variables: { userId: profileData.id } });
    }
  }, [profileData]);

  useEffect(() => {
    if (username && !isMe) {
      subscribeToMore<
        ProfileActionsChangedResponse,
        ProfileActionsChangedVariables
      >({
        document: PROFILE_ACTIONS_CHANGED_SUBSCRIPTION,
        variables: { username },
        updateQuery(prev, { subscriptionData }) {
          if (!subscriptionData.data) return prev;

          return {
            getProfile: {
              ...prev.getProfile,
              actions: subscriptionData.data.profileActionsChanged.actions,
            },
          };
        },
      });
    }
  }, []);

  return (
    <MainTemplate header={{ withOffset: true }}>
      {outlet}
      {profileData && !outlet && (
        <div className="basis-full flex flex-wrap gap-2 pt-2">
          <div className="basis-full lg:basis-1/3 xl:basis-1/5">
            <div className="relative content pt-5">
              <div
                className={clsx(
                  'w-full absolute left-0 top-0 transform -translate-y-1/2',
                  'px-2 flex items-center justify-center gap-1',
                )}
              >
                <div>
                  {actions?.canAcceptFriendRequest ? (
                    <Button
                      loading={acceptingFriendRequest || decliningFriendRequest}
                      onClick={handleAcceptFriendRequest}
                      size="small"
                    >
                      Aceptar solicitud
                    </Button>
                  ) : null}
                </div>
                <div>
                  {actions?.isMe ? (
                    <Button
                      link
                      startIcon={<EditIcon />}
                      to={PROFILE_SETTINGS_ROUTE.replace(
                        ':username',
                        profileData.username,
                      )}
                    >
                      Editar perfil
                    </Button>
                  ) : actions?.canSendMessage && chatData?.getChat ? (
                    <Button
                      link
                      startIcon={<AddCommentIcon />}
                      to={USER_CHAT_ROUTE.replace(
                        ':chatId',
                        chatData.getChat.id.toString(),
                      )}
                    >
                      Enviar mensaje
                    </Button>
                  ) : actions?.canSendFriendRequest ? (
                    <Button
                      loading={sendingFriendRequest}
                      onClick={handleSendFriendRequest}
                      startIcon={<PersonAddIcon />}
                    >
                      Enviar solicitud
                    </Button>
                  ) : actions?.canUnSendFriendRequest ? (
                    <Button
                      color="error"
                      loading={cancelingFriendRequest}
                      onClick={handleUnSendFriendRequest}
                      startIcon={<CloseIcon />}
                    >
                      Cancelar solicitud
                    </Button>
                  ) : actions?.canDeclineFriendRequest ? (
                    <Button
                      color="error"
                      loading={acceptingFriendRequest || decliningFriendRequest}
                      onClick={handleDeclineFriendRequest}
                      size="small"
                    >
                      Rechazar solicitud
                    </Button>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="basis-full flex flex-col items-center gap-1">
                  <img
                    alt="Profile avatar"
                    className="avatar-big"
                    src={profileData.profileImage}
                  />
                  <span className="text-[20px] font-medium tracking-wide">
                    {profileData.username}
                  </span>
                </div>
                <div className="basis-full divider" />
                <div className="basis-full">
                  {profileData.createdAt && (
                    <Label
                      name="Registro"
                      value={format(
                        new Date(profileData.createdAt),
                        'MMMM yyyy',
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="<lg:basis-full lg:flex-1">
            <ProfileFriends total={profileData.counters?.friends ?? 0} />
          </div>
        </div>
      )}
    </MainTemplate>
  );
}
