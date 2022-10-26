import { GET_FRIENDS_QUERY } from '@nc-core/api';
import { USER_PROFILE_ROUTE } from '@nc-core/constants/routes';
import { useLazyQuery } from '@nc-core/hooks';
import {
  GetFriendsResponse,
  GetFriendsVariables,
  ObjectId,
  User,
} from '@nc-core/interfaces/api';
import { Avatar, Button, Content, Grid, Loading, Typography } from '@nc-ui';
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
  >(GET_FRIENDS_QUERY);

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

  return (
    <Content>
      <Grid container style={{ marginBottom: 24 }}>
        <Typography variant="subtitle">Amigos ({total})</Typography>
      </Grid>
      <Grid container spacing={24}>
        {friends.map((friend, i) => (
          <Grid item key={`profile_friend_${friend.id}_${i}`}>
            <Link to={USER_PROFILE_ROUTE.replace(':username', friend.username)}>
              <Grid
                container
                alignItems="center"
                direction="column"
                spacing={6}
              >
                <Grid item>
                  <Avatar url={friend.profileImage} />
                </Grid>
                <Grid item>
                  <Typography withLetterSpacing>{friend.username}</Typography>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center">
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
      </Grid>
    </Content>
  );
}
