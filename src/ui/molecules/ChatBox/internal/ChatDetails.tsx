import { USER_PROFILE_ROUTE } from '@nc-core/constants/routes';
import { User } from '@nc-core/interfaces/api';
import { Avatar, Button, Content, Grid, Typography } from '@nc-ui';

interface ChatDetailsProps {
  classes: CSSModuleClasses;
  user: User;
}

export default function ChatDetails({ user }: ChatDetailsProps): JSX.Element {
  return (
    <Content fullHeight>
      <Grid
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
        spacing={12}
      >
        <Grid item>
          <Avatar size="big" url={user.profileImage} />
        </Grid>
        <Grid item>
          <Typography variant="title">{user.username}</Typography>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            link
            color="white"
            size="small"
            to={USER_PROFILE_ROUTE.replace(':username', user.username)}
            variant="outlined"
          >
            Ver perfil
          </Button>
          <Button
            color="error"
            onClick={() => undefined}
            size="small"
            style={{ marginTop: 12 }}
          >
            Borrar conversación
          </Button>
        </Grid>
      </Grid>
    </Content>
  );
}
