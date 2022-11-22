import {
  GET_NOTIFICATIONS_QUERY,
  NEW_NOTIFICATION_SUBSCRIPTION,
  READ_ALL_NOTIFICATIONS_MUTATION,
  READ_NOTIFICATION_MUTATION,
  REMOVE_NOTIFICATION_SUBSCRIPTION,
} from '@nc-core/api';
import { useMutation, useQuery } from '@nc-core/hooks';
import {
  GetNotificationsResponse,
  NewNotificationResponse,
  Notification,
  NotificationType,
  ReadAllNotificationsResponse,
  ReadNotificationResponse,
  ReadNotificationVariables,
  RemoveNotificationResponse,
} from '@nc-core/interfaces/api';
import {
  CloseIcon,
  NotificationsFilledIcon,
  NotificationsOutlinedIcon,
} from '@nc-icons';
import { Button, Loading } from '@nc-ui';
import clsx from 'clsx';
import { compareDesc } from 'date-fns';
import { useEffect, useState } from 'react';
import { FriendRequestNotification } from './FriendRequestNotification';
import ServerMessageNotification from './ServerMessageNotification';

export interface NotificationsBoxProps {
  className?: string;
}

export function NotificationsBox({
  className,
}: NotificationsBoxProps): JSX.Element | null {
  const [notificationsEl, setNotificationsEl] = useState<HTMLElement | null>(
    null,
  );

  const { data, loading, subscribeToMore, updateQuery } =
    useQuery<GetNotificationsResponse>(GET_NOTIFICATIONS_QUERY, {
      fetchPolicy: 'network-only',
    });

  const [readAllNotifications, { loading: readingAllNotifications }] =
    useMutation<ReadAllNotificationsResponse>(READ_ALL_NOTIFICATIONS_MUTATION, {
      onCompleted({ readAllNotifications }) {
        if (!readAllNotifications) return;

        updateQuery((prev) => ({
          getNotifications: prev.getNotifications.map((notification) => ({
            ...notification,
            read: true,
          })),
        }));
      },
    });

  const [readNotification] = useMutation<
    ReadNotificationResponse,
    ReadNotificationVariables
  >(READ_NOTIFICATION_MUTATION);

  function handleNotificationsClick(
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) {
    setNotificationsEl(notificationsEl ? null : e.currentTarget);
  }

  function onBgKeyPress(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key === 'Enter') setNotificationsEl(null);
  }

  function handleReadAllNotificationsClick() {
    return readAllNotifications();
  }

  function handleReadNotificationClick(
    notification: Notification,
  ): React.MouseEventHandler<HTMLElement> {
    return async function () {
      if (notification.read) return;

      const { data } = await readNotification({
        variables: { notificationId: notification.id },
      });

      if (!data?.readNotification) return;

      updateQuery((prev) => ({
        getNotifications: prev.getNotifications.map((notification) => {
          if (notification.id === notification.id) {
            return { ...notification, read: true };
          }

          return notification;
        }),
      }));
    };
  }

  const notifications = [...(data?.getNotifications ?? [])];
  const unreadNotifications = notifications.filter(({ read }) => !read);

  useEffect(() => {
    subscribeToMore<NewNotificationResponse>({
      document: NEW_NOTIFICATION_SUBSCRIPTION,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;

        return {
          getNotifications: [
            subscriptionData.data.newNotification,
            ...prev.getNotifications,
          ],
        };
      },
    });

    subscribeToMore<RemoveNotificationResponse>({
      document: REMOVE_NOTIFICATION_SUBSCRIPTION,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;

        return {
          getNotifications: prev.getNotifications.filter(
            ({ id }) => id !== subscriptionData.data.removeNotification,
          ),
        };
      },
    });
  }, []);

  return (
    <>
      <Button
        active={Boolean(notificationsEl)}
        className={className}
        color="white"
        onClick={handleNotificationsClick}
        variant="icon"
      >
        {notificationsEl ? (
          <NotificationsFilledIcon />
        ) : (
          <NotificationsOutlinedIcon />
        )}
      </Button>
      {Boolean(notificationsEl) && (
        <div
          className="h-full fixed top-0 z-sidebar left-0 sm:(left-[70px] w-[calc(100%_-_70px)])"
          id="notifications-box"
        >
          <div
            className="<sm:hidden absolute z-0 w-full h-full backdrop-filter backdrop-blur-sm bg-black/40 transition-colors hover:bg-black/50"
            onClick={handleNotificationsClick}
            onKeyPress={onBgKeyPress}
            role="button"
            tabIndex={0}
          />
          <button
            className={clsx(
              'sm:hidden absolute right-[18px] bottom-[18px] z-60 h-[32px] w-[32px]',
              'rounded-full bg-dark-600 border-2 border-dark-400',
              'flex items-center justify-center',
            )}
            onClick={handleNotificationsClick}
          >
            <CloseIcon size="1em" />
          </button>
          <section className="relative z-1 h-full bg-dark-900 border-dark-800 sm:(border-r-2 w-[440px])">
            <div className="sm:h-[93px] bg-dark-800 p-2 flex items-center justify-between">
              <h4 className="text-title">Notificaciones</h4>
              {unreadNotifications.length > 0 && (
                <Button
                  color="white"
                  loading={readingAllNotifications}
                  onClick={handleReadAllNotificationsClick}
                  size="small"
                  variant="outlined"
                >
                  Marcar todas como leídas
                </Button>
              )}
            </div>
            <section className="sm:(max-h-[calc(100%_-_93px)] overflow-auto)">
              {loading ? (
                <Loading id="notifications-loader" text="Cargando..." />
              ) : notifications.length > 0 ? (
                notifications
                  .sort((a, b) =>
                    compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
                  )
                  .map((notification, i) => {
                    const className = clsx(
                      'transition-colors w-full p-2 hover:no-underline',
                      notification.read
                        ? 'hover:bg-dark-300/5'
                        : 'bg-dark-700 hover:bg-dark-700/90',
                    );

                    const createdAt = new Date(notification.createdAt);
                    const notificationData = JSON.parse(notification.data);

                    switch (notification.type) {
                      case NotificationType.NEW_FRIEND_REQUEST:
                        return (
                          <FriendRequestNotification
                            className={className}
                            key={`friend_request_notification_${notification.id}_${i}`}
                            onClick={handleReadNotificationClick(notification)}
                            user={notification.dataUser}
                          />
                        );

                      case NotificationType.SERVER_MESSAGE:
                        return (
                          <ServerMessageNotification
                            className={className}
                            createdAt={createdAt}
                            data={notificationData}
                            key={`server_message_notification_${notification.id}_${i}`}
                            onClick={handleReadNotificationClick(notification)}
                          />
                        );

                      default:
                        return null;
                    }
                  })
              ) : (
                <p className="pt-2 text-center tracking-wide">
                  No tienes notificaciones
                </p>
              )}
            </section>
          </section>
        </div>
      )}
    </>
  );
}
