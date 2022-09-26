import { SearchResult, SearchResultType } from '@nc-core/api';
import { useUser } from '@nc-core/hooks';
import { parseUserProfileActions } from '@nc-core/utils';
import { AddCommentIcon } from '@nc-icons';
import { Avatar, Grid, IconButton, Typography } from '@nc-ui';
import { formatRelative } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link, useNavigate } from 'react-router-dom';
import classes from './SearchResultPreview.module.sass';

export interface SearchResultPreviewProps {
  data: SearchResult;
  onClick?(): void;
  searchText: string;
}

export function SearchResultPreview({
  data,
  onClick,
  searchText,
}: SearchResultPreviewProps): JSX.Element {
  const { data: meData } = useUser();

  const navigate = useNavigate();

  const userProfileActions =
    data.type === SearchResultType.USER && data.userData?.actions
      ? parseUserProfileActions(data.userData.actions)
      : null;

  function handleSendMessageClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (onClick) onClick();
    navigate(`/chat/${data.userData?.id}`);
  }

  return (
    <Link
      className={classes.searchResultPreview}
      onClick={onClick}
      to={
        data.type === SearchResultType.USER
          ? `/profile${
              userProfileActions?.isMe ? '' : `/${data.userData?.username}`
            }`
          : `/chat/${
              data.messageData?.toUser?.id === meData?.id
                ? data.messageData?.fromUser?.id
                : data.messageData?.toUser?.id
            }?message=${data.messageData?.id}`
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
                  <Typography
                    withLetterSpacing
                    variant="subtitle"
                    fontWeight="bold"
                  >
                    {data.messageData.fromUser?.username}
                  </Typography>{' '}
                  para{' '}
                  <Typography withLetterSpacing fontWeight="bold">
                    {data.messageData.toUser?.username}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography fontSize={12}>
                    {formatRelative(
                      new Date(data.messageData.createdAt),
                      new Date(),
                      { locale: es },
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography withLetterSpacing fontSize={13}>
                    {data.messageData.content
                      .split(searchText)
                      .map((text, i) => {
                        if (i === 0) return text;

                        return (
                          <>
                            <b key={`search_text_match_${i}`}>{searchText}</b>
                            {text}
                          </>
                        );
                      })}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )}
          {data.type === SearchResultType.USER && data.userData && (
            <div className={classes.searchResultPreview__user}>
              <Typography withLetterSpacing>
                {data.userData.username.split(searchText).map((text, i) => {
                  if (i === 0) return text;

                  return (
                    <>
                      <b key={`search_text_match_${i}`}>{searchText}</b>
                      {text}
                    </>
                  );
                })}
              </Typography>
            </div>
          )}
        </Grid>
        {data.type === SearchResultType.USER &&
          data.userData &&
          !userProfileActions?.isMe && (
            <Grid item>
              {userProfileActions?.canSendMessage && (
                <IconButton onClick={handleSendMessageClick} size="small">
                  <AddCommentIcon size="1.25em" />
                </IconButton>
              )}
            </Grid>
          )}
      </Grid>
    </Link>
  );
}
