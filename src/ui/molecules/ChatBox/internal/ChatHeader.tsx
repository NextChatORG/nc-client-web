import { User } from '@nc-core/interfaces/api';
import { MoreVertIcon } from '@nc-icons';
import { Avatar, Grid, IconButton, Typography } from '@nc-ui';

interface ChatHeaderProps {
  classes: CSSModuleClasses;
  user: User;
  onClick(): void;
}

export default function ChatHeader({
  classes,
  onClick,
  user,
}: ChatHeaderProps): JSX.Element {
  return (
    <div className={classes.chatBox__header}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <button className={classes.chatBox__header__button} onClick={onClick}>
            <Grid container alignItems="center" spacing={12}>
              <Grid item>
                <Avatar clickable url={user.profileImage} size="small" />
              </Grid>
              <Grid item>
                <Typography variant="subtitle">{user.username}</Typography>
              </Grid>
            </Grid>
          </button>
        </Grid>
        <Grid item>
          <IconButton
            color="white"
            onClick={onClick}
            size="small"
            variant="transparent"
          >
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
