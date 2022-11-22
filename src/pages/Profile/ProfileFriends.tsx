import { GET_FRIENDS_QUERY } from '@nc-core/api';
import { USER_PROFILE_ROUTE } from '@nc-core/constants/routes';
import { useLazyQuery } from '@nc-core/hooks';
import {
  GetFriendsResponse,
  GetFriendsVariables,
  ObjectId,
  User,
} from '@nc-core/interfaces/api';
import { Button, Loading } from '@nc-ui';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FRIENDS_PER_PAGE = 12;

interface ProfileFriendsProps {
  total: number;
  userId?: ObjectId;
}

export default function ProfileFriends({
  total,
  userId,
}: ProfileFriendsProps): JSX.Element {
  const [infiniteScrollEnabled, setInfiniteScrollStatus] =
    useState<boolean>(false);
  const [friends, setFriends] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);

  const [getFriends, { loading }] = useLazyQuery<
    GetFriendsResponse,
    GetFriendsVariables
  >(GET_FRIENDS_QUERY, { fetchPolicy: 'network-only' });

  async function fetchMoreFriends(page: number) {
    const { data } = await getFriends({
      variables: { page, perPage: FRIENDS_PER_PAGE, userId },
    });

    if (data?.getFriends) {
      setFriends((prev) => Array.from(new Set(prev.concat(data.getFriends))));
    }
  }

  function hasMoreFriends(): boolean {
    return (page + 1) * (FRIENDS_PER_PAGE + 1) < total;
  }

  function handleLoadMoreClick() {
    setInfiniteScrollStatus(true);

    window.addEventListener(
      'scroll',
      function () {
        if (!infiniteScrollEnabled) return;

        const { clientHeight, scrollHeight, scrollTop } =
          document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5 && hasMoreFriends()) {
          setPage((prev) => prev + 1);
          fetchMoreFriends(page + 1);
        }
      },
      { passive: true },
    );
  }

  useEffect(() => {
    fetchMoreFriends(0);
  }, []);

  useEffect(() => {
    setInfiniteScrollStatus(false);
    setFriends([]);
    setPage(0);

    fetchMoreFriends(0);
  }, [userId]);

  return (
    <div className="content">
      <h2 className="text-subtitle mb-2">Amigos ({total})</h2>
      <div className="flex flex-wrap gap-2">
        {friends.map((friend, i) => (
          <Link
            className="flex flex-col items-center gap-1 hover:no-underline"
            key={`profile_friend_${friend.id}_${i}`}
            to={USER_PROFILE_ROUTE.replace(':username', friend.username)}
          >
            <img
              alt={`${friend.username}'s profile`}
              className="avatar-normal"
              src={friend.profileImage}
            />
            <p className="text-body tracking-wide">{friend.username}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        {loading && (
          <Loading id={`profile-friends-${userId}`} text="Cargando..." />
        )}
        {!infiniteScrollEnabled && !loading && hasMoreFriends() && (
          <Button
            color="white"
            onClick={handleLoadMoreClick}
            size="small"
            variant="outlined"
          >
            Cargar más
          </Button>
        )}
      </div>
    </div>
  );
}
