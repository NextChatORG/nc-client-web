import {
  AcceptFriendRequestResponse,
  ACCEPT_FRIEND_REQUEST_MUTATION,
  CancelFriendRequestResponse,
  CANCEL_FRIEND_REQUEST_MUTATION,
  DeclineFriendRequestResponse,
  DECLINE_FRIEND_REQUEST_MUTATION,
  FriendRequestVariables,
  ProfileActionsChangedResponse,
  ProfileActionsChangedVariables,
  ProfileResponse,
  ProfileVariables,
  PROFILE_ACTIONS_CHANGED_SUBSCRIPTION,
  PROFILE_QUERY,
  SendFriendRequestResponse,
  SEND_FRIEND_REQUEST_MUTATION,
} from '@nc-core/api';
import { useLazyQuery, useMutation, useUser } from '@nc-core/hooks';
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
import { useParams } from 'react-router-dom';
import { AddCommentIcon, CloseIcon, EditIcon, PersonAddIcon } from '@nc-icons';
import classes from './Profile.module.sass';
import {
  DEFAULT_USER_PROFILE_ACTIONS,
  parseUserProfileActions,
  UserProfileActions,
} from '@nc-core/utils';
import { useSubscription } from '@apollo/client';

export default function Profile(): JSX.Element {
  const [actions, setActions] = useState<UserProfileActions | null>(null);

  const { data: meData } = useUser();
  const { username } = useParams();

  const [getProfile, { data: userData }] = useLazyQuery<
    ProfileResponse,
    ProfileVariables
  >(PROFILE_QUERY);

  useSubscription<
    ProfileActionsChangedResponse,
    ProfileActionsChangedVariables
  >(PROFILE_ACTIONS_CHANGED_SUBSCRIPTION, {
    onSubscriptionData({ subscriptionData }) {
      if (subscriptionData.data?.profileActionsChanged) {
        setActions(
          parseUserProfileActions(
            subscriptionData.data.profileActionsChanged.actions,
          ),
        );
      }
    },
    variables: { username: (username || meData?.username) ?? '' },
  });

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

  const profileData = username ? userData?.profile ?? null : meData;

  useEffect(() => {
    if (username && username.length >= 4 && username !== meData?.username) {
      getProfile({ variables: { username } });
    }
  }, [username]);

  useEffect(() => {
    if (profileData?.actions) {
      setActions(parseUserProfileActions(profileData.actions));
    }
  }, [profileData]);

  return (
    <MainTemplate>
      {profileData && (
        <Grid item xs={3}>
          <Content className={classes.profile__leftContent}>
            <div className={classes.profile__leftContent__action}>
              <Grid container justifyContent="center" spacing={12}>
                <Grid item>
                  {actions?.canAcceptFriendRequest ? (
                    <Button
                      loading={acceptingFriendRequest || decliningFriendRequest}
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
                      to={`/profile/${profileData.username}/settings`}
                    >
                      Editar perfil
                    </Button>
                  ) : actions?.canSendMessage ? (
                    <Button
                      onClick={() => undefined}
                      startIcon={<AddCommentIcon />}
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
                  <Grid item xs={12}>
                    <Label
                      name="Amigos"
                      value={(profileData.counters?.friends ?? 0).toString()}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Content>
        </Grid>
      )}
    </MainTemplate>
  );
}
