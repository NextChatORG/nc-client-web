import { USER_CHAT_ROUTE } from '@nc-core/constants/routes';
import { useAuth } from '@nc-core/hooks';
import { RecentChat } from '@nc-core/interfaces/api';
import { Avatar, Badge, Grid, Typography } from '@nc-ui';
import clsx from 'clsx';
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
import classes from './MessagePreview.module.sass';

export interface MessagePreviewProps {
  data: RecentChat;
}

export function MessagePreview({
  data,
}: MessagePreviewProps): JSX.Element | null {
  const { data: meData } = useAuth();
  const location = useLocation();

  if (meData == null) return null;

  const user = data.chat.toId === meData.id ? data.chat.user : data.chat.toUser;
  if (!user) return null;

  return (
    <Link
      className={clsx(classes.messagePreview, {
        [classes['messagePreview--active']]:
          location.pathname ===
          USER_CHAT_ROUTE.replace(':chatId', data.chat.id.toString()),
      })}
      to={USER_CHAT_ROUTE.replace(':chatId', data.chat.id.toString())}
    >
      <Grid container alignItems="center" spacing={24}>
        <Grid item>
          <Avatar url={user.profileImage} />
        </Grid>
        <Grid item xs={9}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography withLetterSpacing fontSize={18} fontWeight={500}>
                {user.username}
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontSize={12}>
                {format(new Date(data.lastMessage.createdAt), 'hh:mm a')}
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
                {data.lastMessage.senderId === meData.id ? 'Tú: ' : null}
                {data.lastMessage.content}
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
