import {
  ACCEPT_FRIEND_REQUEST_MUTATION,
  DECLINE_FRIEND_REQUEST_MUTATION,
} from '@nc-core/api';
import { useMutation } from '@nc-core/hooks';
import {
  AcceptFriendRequestResponse,
  DeclineFriendRequestResponse,
  FriendRequestVariables,
  User,
} from '@nc-core/interfaces/api';
import { Avatar, Button, Grid, Typography } from '@nc-ui';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface FriendRequestNotificationProps {
  className: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  user: Pick<User, 'id' | 'profileImage' | 'username'>;
}

export function FriendRequestNotification({
  className,
  onClick,
  user,
}: FriendRequestNotificationProps): JSX.Element {
  const [acceptFriendRequest, { loading: acceptingFriendRequest }] =
    useMutation<AcceptFriendRequestResponse, FriendRequestVariables>(
      ACCEPT_FRIEND_REQUEST_MUTATION,
      {
        onCompleted({ acceptFriendRequest }) {
          if (!acceptFriendRequest) return;

          toast.success(
            `Has aceptado la solicitud de amistad de ${user.username}`,
          );
        },
      },
    );

  const [declineFriendRequest, { loading: decliningFriendRequest }] =
    useMutation<DeclineFriendRequestResponse, FriendRequestVariables>(
      DECLINE_FRIEND_REQUEST_MUTATION,
      {
        onCompleted({ declineFriendRequest }) {
          if (!declineFriendRequest) return;

          toast.success(
            `Has rechazado la solicitud de amistad de ${user.username}`,
          );
        },
      },
    );

  function handleAcceptFriendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    return acceptFriendRequest({ variables: { userId: user.id } });
  }

  function handleDeclineFriendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    return declineFriendRequest({ variables: { userId: user.id } });
  }

  return (
    <Link
      className={className}
      onClick={onClick}
      to={`/profile/${user.username}`}
    >
      <Grid container alignItems="center" spacing={12}>
        <Grid item>
          <Avatar url={user.profileImage} />
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography>
                <strong>{user.username}</strong> te ha enviado una solicitud de
                amistad
              </Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={8} justifyContent="flex-end">
                <Grid item>
                  <Button
                    loading={acceptingFriendRequest || decliningFriendRequest}
                    onClick={handleAcceptFriendRequest}
                    size="extra-small"
                  >
                    Aceptar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="error"
                    loading={acceptingFriendRequest || decliningFriendRequest}
                    onClick={handleDeclineFriendRequest}
                    size="extra-small"
                  >
                    Rechazar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
}
