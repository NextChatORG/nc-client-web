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
import { Button } from '@nc-ui';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface FriendRequestNotificationProps {
  className: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  user?: Pick<User, 'id' | 'profileImage' | 'username'> | null;
}

export function FriendRequestNotification({
  className,
  onClick,
  user,
}: FriendRequestNotificationProps): JSX.Element | null {
  const [acceptFriendRequest, { loading: acceptingFriendRequest }] =
    useMutation<AcceptFriendRequestResponse, FriendRequestVariables>(
      ACCEPT_FRIEND_REQUEST_MUTATION,
      {
        onCompleted({ acceptFriendRequest }) {
          if (!acceptFriendRequest || !user) return;

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
          if (!declineFriendRequest || !user) return;

          toast.success(
            `Has rechazado la solicitud de amistad de ${user.username}`,
          );
        },
      },
    );

  if (!user) return null;

  function handleAcceptFriendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    return acceptFriendRequest({ variables: { userId: user.id } });
  }

  function handleDeclineFriendRequest(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    return declineFriendRequest({ variables: { userId: user.id } });
  }

  return (
    <Link
      className={clsx(className, 'flex flex-wrap items-start gap-2')}
      onClick={onClick}
      to={`/profile/${user.username}`}
    >
      <img
        alt={`${user.username}'s profile`}
        className="avatar-normal"
        src={user.profileImage}
      />
      <div className="flex-1">
        <p className="tracking-wide">
          <strong>{user.username}</strong> te ha enviado una solicitud de
          amistad
        </p>
        <div className="flex items-center justify-end gap-1">
          <Button
            loading={acceptingFriendRequest || decliningFriendRequest}
            onClick={handleAcceptFriendRequest}
            size="extra-small"
          >
            Aceptar
          </Button>
          <Button
            color="error"
            loading={acceptingFriendRequest || decliningFriendRequest}
            onClick={handleDeclineFriendRequest}
            size="extra-small"
          >
            Rechazar
          </Button>
        </div>
      </div>
    </Link>
  );
}
