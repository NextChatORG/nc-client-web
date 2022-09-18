import { SearchResult, SearchResultType } from '@nc-core/api';
import { useUser } from '@nc-core/hooks';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Avatar, Grid } from '../../atoms';
import classes from './SearchResultPreview.module.sass';

export interface SearchResultPreviewProps {
  data: SearchResult;
}

export function SearchResultPreview({
  data,
}: SearchResultPreviewProps): JSX.Element {
  const { data: meData } = useUser();

  return (
    <Link
      className={classes.searchResultPreview}
      to={
        data.type === SearchResultType.USER
          ? `/profile${
              data.userData?.actions?.isMe ? '' : `/${data.userData?.username}`
            }`
          : `/chats/user/${
              data.messageData?.toUser?.id === meData?.id
                ? data.messageData?.fromUser?.id
                : data.messageData?.toUser?.id
            }`
      }
    >
      <Grid container alignItems="center" spacing={24}>
        <Grid item>
          <Avatar
            url={
              data.type === SearchResultType.USER
                ? data.userData?.profileImage
                : data.messageData?.fromUser?.profileImage
            }
          />
        </Grid>
        <Grid item xs="auto">
          {data.type === SearchResultType.MESSAGE && data.messageData && (
            <div className={classes.searchResultPreview__message}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <span
                    className={classes.searchResultPreview__message__username}
                  >
                    {data.messageData.fromUser?.username}
                  </span>
                </Grid>
                <Grid item>
                  <span>
                    {format(new Date(data.messageData.createdAt), 'HH:mm a')}
                  </span>
                </Grid>
                <Grid item xs={12}>
                  <span
                    className={classes.searchResultPreview__message__content}
                  >
                    {data.messageData.content}
                  </span>
                </Grid>
              </Grid>
            </div>
          )}
          {data.type === SearchResultType.USER && data.userData && (
            <div className={classes.searchResultPreview__user}>
              <span className={classes.searchResultPreview__user__username}>
                {data.userData.username}
              </span>
            </div>
          )}
        </Grid>
      </Grid>
    </Link>
  );
}
