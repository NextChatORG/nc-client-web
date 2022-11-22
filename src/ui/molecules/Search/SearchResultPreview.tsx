import { SearchResult, SearchResultType } from '@nc-core/interfaces/api';
import { parseUserProfileActions } from '@nc-core/utils';
import { Link } from 'react-router-dom';

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
      className="px-2 py-1 flex items-center gap-2 hover:bg-white/2 hover:no-underline"
      onClick={onClick}
      to={
        data.type === SearchResultType.USER
          ? `/profile${
              userProfileActions?.isMe ? '' : `/${data.userData?.username}`
            }`
          : '/'
      }
    >
      <img
        alt={`${
          data.type === SearchResultType.USER
            ? data.userData?.username
            : undefined
        }'s profile`}
        className="avatar-normal"
        src={
          data.type === SearchResultType.USER
            ? data.userData?.profileImage
            : undefined
        }
      />
      {data.type === SearchResultType.USER && data.userData && (
        <p className="text-body tracking-wide">
          {data.userData.username.split(searchText).map((text, i) => {
            if (i === 0) return text;

            return (
              <>
                <b key={`search_text_match_${i}`}>{searchText}</b>
                {text}
              </>
            );
          })}
        </p>
      )}
    </Link>
  );
}
