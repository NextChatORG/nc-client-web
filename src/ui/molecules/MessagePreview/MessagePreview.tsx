import { RecentMessage } from '@nc-core/api';
import { format } from 'date-fns';
import { Avatar, Grid, Typography } from '../../atoms';
import classes from './MessagePreview.module.sass';

export interface MessagePreviewProps {
  data: RecentMessage;
}

export function MessagePreview({ data }: MessagePreviewProps): JSX.Element {
  return (
    <div className={classes.messagePreview}>
      <Grid container alignItems="center" spacing={24}>
        <Grid item>
          <Avatar url={data.profileImage} />
        </Grid>
        <Grid item xs="auto">
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography withLetterSpacing fontSize={18} fontWeight={500}>
                {data.username}
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontSize={12}>
                {format(new Date(data.createdAt), 'hh:mm a')}
              </Typography>
            </Grid>
            <Grid item xs={11}>
              <Typography variant="body" style={{ color: '#6A6B70' }}>
                {data.content}
              </Typography>
            </Grid>
            {Boolean(data.unread) && (
              <Grid item xs={1}>
                {data.unread}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
