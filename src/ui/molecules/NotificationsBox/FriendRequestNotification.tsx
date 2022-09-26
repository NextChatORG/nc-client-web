import {
  AcceptFriendRequestResponse,
  ACCEPT_FRIEND_REQUEST_MUTATION,
  DeclineFriendRequestResponse,
  DECLINE_FRIEND_REQUEST_MUTATION,
  FriendRequestVariables,
} from '@nc-core/api';
import { useMutation } from '@nc-core/hooks';
import { Avatar, Button, Grid, Typography } from '@nc-ui';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface FriendRequestNotificationData {
  from: {
    id: string;
    username: string;
    profileImage: string;
  };
}

export interface FriendRequestNotificationProps {
  data: FriendRequestNotificationData;
}

export function FriendRequestNotification({
  data,
}: FriendRequestNotificationProps): JSX.Element {
  const [acceptFriendRequest, { loading: acceptingFriendRequest }] =
    useMutation<AcceptFriendRequestResponse, FriendRequestVariables>(
      ACCEPT_FRIEND_REQUEST_MUTATION,
      {
        onCompleted({ acceptFriendRequest }) {
          if (!acceptFriendRequest) return;

          toast.success(
            `Has aceptado la solicitud de amistad de ${data.from.username}`,
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
            `Has rechazado la solicitud de amistad de ${data.from.username}`,
          );
        },
      },
    );

  function handleAcceptFriendRequest() {
    return acceptFriendRequest({ variables: { userId: data.from.id } });
  }

  function handleDeclineFriendRequest() {
    return declineFriendRequest({ variables: { userId: data.from.id } });
  }

  return (
    <div style={{ paddingTop: 24 }}>
      <Grid container alignItems="center" spacing={12}>
        <Grid item>
          <Link to={`/profile/${data.from.username}`}>
            <Avatar url={data.from.profileImage} />
          </Link>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography>
                <strong>{data.from.username}</strong> te ha enviado una
                solicitud de amistad
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
    </div>
  );
}
