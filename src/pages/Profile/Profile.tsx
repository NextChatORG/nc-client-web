import { ProfileResponse, ProfileVariables, PROFILE_QUERY } from '@nc-core/api';
import { useLazyQuery, useUser } from '@nc-core/hooks';
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
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddCommentIcon, CloseIcon, EditIcon, PersonAddIcon } from '@nc-icons';
import classes from './Profile.module.sass';
import { parseUserProfileActions } from '@nc-core/utils';

export default function Profile(): JSX.Element {
  const { data: meData } = useUser();
  const { username } = useParams();

  const [getProfile, { data: userData }] = useLazyQuery<
    ProfileResponse,
    ProfileVariables
  >(PROFILE_QUERY);

  useEffect(() => {
    if (username && username.length >= 4 && username !== meData?.username) {
      getProfile({ variables: { username } });
    }
  }, [username]);

  const profileData = username ? userData?.profile ?? meData : meData;

  const actions = profileData?.actions
    ? parseUserProfileActions(profileData.actions)
    : null;

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
                    onClick={() => undefined}
                    startIcon={<PersonAddIcon />}
                  >
                    Enviar solicitud
                  </Button>
                ) : actions?.canUnSendFriendRequest ? (
                  <Button onClick={() => undefined} startIcon={<CloseIcon />}>
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
