import {
  CancelFriendRequestResponse,
  CANCEL_FRIEND_REQUEST_MUTATION,
  FriendRequestVariables,
  ProfileResponse,
  ProfileVariables,
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
  Header,
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

export default function Profile(): JSX.Element {
  const [actions, setActions] = useState<UserProfileActions | null>(null);

  const { data: meData } = useUser();
  const { username } = useParams();

  const [getProfile, { data: userData }] = useLazyQuery<
    ProfileResponse,
    ProfileVariables
  >(PROFILE_QUERY);

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

  function handleSendFriendRequest() {
    if (!profileData?.id || !actions?.canSendFriendRequest) return;

    return sendFriendRequest({ variables: { userId: profileData.id } });
  }

  function handleUnSendFriendRequest() {
    if (!profileData?.id || !actions?.canUnSendFriendRequest) return;

    return cancelFriendRequest({ variables: { userId: profileData.id } });
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
      <Grid item xs={12}>
        <Header />
      </Grid>
      {profileData && (
        <Grid item xs={3}>
          <Content className={classes.profile__leftContent}>
            <div className={classes.profile__leftContent__action}>
              <Grid container justifyContent="center">
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
                    loading={cancelingFriendRequest}
                    onClick={handleUnSendFriendRequest}
                    startIcon={<CloseIcon />}
                  >
                    Cancelar solicitud
                  </Button>
                ) : null}
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
