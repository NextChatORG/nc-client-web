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
import {
  Avatar,
  Button,
  Content,
  Divider,
  Grid,
  Label,
  MainTemplate,
} from '@nc-ui';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useOutlet, useParams } from 'react-router-dom';
import classes from './Profile.module.sass';
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

  const profileData = username ? userData?.getProfile ?? null : meData;
  const isMe = username === meData?.username;

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
    <MainTemplate withHeader>
      {outlet}
      {profileData && (
        <>
          <Grid item xs={3}>
            <Content className={classes.profile__leftContent}>
              <div className={classes.profile__leftContent__action}>
                <Grid container justifyContent="center" spacing={12}>
                  <Grid item>
                    {actions?.canAcceptFriendRequest ? (
                      <Button
                        loading={
                          acceptingFriendRequest || decliningFriendRequest
                        }
                        onClick={handleAcceptFriendRequest}
                        size="small"
                      >
                        Aceptar solicitud
                      </Button>
                    ) : null}
                  </Grid>
                  <Grid item>
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
                        loading={
                          acceptingFriendRequest || decliningFriendRequest
                        }
                        onClick={handleDeclineFriendRequest}
                        size="small"
                      >
                        Rechazar solicitud
                      </Button>
                    ) : null}
                  </Grid>
                </Grid>
              </div>
              <Grid container justifyContent="center" spacing={24}>
                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems="center"
                    direction="column"
                    spacing={12}
                  >
                    <Grid item>
                      <Avatar size="big" url={profileData.profileImage} />
                    </Grid>
                    <Grid item>
                      <span className={classes.profile__leftContent__username}>
                        {profileData.username}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={12}>
                    {profileData.createdAt && (
                      <Grid item xs={12}>
                        <Label
                          name="Registro"
                          value={format(
                            new Date(profileData.createdAt),
                            'MMMM yyyy',
                          )}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Content>
          </Grid>
          <Grid item xs={9}>
            <ProfileFriends
              total={profileData.counters?.friends ?? 0}
              userId={isMe ? undefined : profileData.id}
            />
          </Grid>
        </>
      )}
    </MainTemplate>
  );
}
