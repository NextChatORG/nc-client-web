import { SearchResult, SearchResultType } from '@nc-core/interfaces/api';
import { parseUserProfileActions } from '@nc-core/utils';
import { Avatar, Grid, Typography } from '@nc-ui';
import { Link } from 'react-router-dom';
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
  const userProfileActions =
    data.type === SearchResultType.USER && data.userData?.actions
      ? parseUserProfileActions(data.userData.actions)
      : null;

  return (
    <Link
      className={classes.searchResultPreview}
      onClick={onClick}
      to={
        data.type === SearchResultType.USER
          ? `/profile${
              userProfileActions?.isMe ? '' : `/${data.userData?.username}`
            }`
          : '/'
      }
    >
      <Grid container alignItems="center" spacing={24}>
        <Grid item>
          <Avatar
            url={
              data.type === SearchResultType.USER
                ? data.userData?.profileImage
                : undefined
            }
          />
        </Grid>
        <Grid item xs="auto">
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
      </Grid>
    </Link>
  );
}
