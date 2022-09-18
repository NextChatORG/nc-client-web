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
import { EditIcon, PersonAddIcon } from '@nc-icons';
import classes from './Profile.module.sass';

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
                {profileData.actions?.isMe ? (
                  <Button
                    link
                    startIcon={<EditIcon />}
                    to={`/profile/${profileData.username}/settings`}
                  >
                    Editar perfil
                  </Button>
                ) : profileData.actions?.isFriendRequested ? null : !profileData
                    .actions?.isFriend ? (
                  <Button
                    onClick={() => undefined}
                    startIcon={<PersonAddIcon />}
                  >
                    Enviar solicitud
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
