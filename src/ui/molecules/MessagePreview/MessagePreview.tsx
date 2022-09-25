import { RecentMessage } from '@nc-core/api';
import clsx from 'clsx';
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Badge, Grid, Typography } from '../../atoms';
import classes from './MessagePreview.module.sass';

export interface MessagePreviewProps {
  data: RecentMessage;
}

export function MessagePreview({ data }: MessagePreviewProps): JSX.Element {
  const location = useLocation();

  return (
    <Link
      className={clsx(classes.messagePreview, {
        [classes['messagePreview--active']]:
          location.pathname === `/chat/${data.userId}`,
      })}
      to={`/chat/${data.userId}`}
    >
      <Grid container alignItems="center" spacing={24}>
        <Grid item>
          <Avatar url={data.profileImage} />
        </Grid>
        <Grid item xs={9}>
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
            <Grid item xs={10}>
              <Typography
                style={{
                  color: '#6A6B70',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                variant="body"
              >
                {data.isMe ? 'Tú: ' : null}
                {data.content}
              </Typography>
            </Grid>
            {Boolean(data.unread) && (
              <Grid item>
                <Badge counter={data.unread} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
}
