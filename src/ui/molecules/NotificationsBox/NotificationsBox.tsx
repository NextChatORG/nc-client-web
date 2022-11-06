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
import { NotificationsFilledIcon, NotificationsOutlinedIcon } from '@nc-icons';
import { Button, Content, Grid, Loading, Typography } from '@nc-ui';
import clsx from 'clsx';
import { compareDesc } from 'date-fns';
import { useEffect, useState } from 'react';
import { FriendRequestNotification } from './FriendRequestNotification';
import classes from './NotificationsBox.module.sass';
import ServerMessageNotification from './ServerMessageNotification';

export interface NotificationsBoxProps {
  className?: string;
  direction?: 'right-bottom' | 'right-center';
}

export function NotificationsBox({
  className,
  direction = 'right-bottom',
}: NotificationsBoxProps): JSX.Element | null {
  const [notificationsEl, setNotificationsEl] =
    useState<HTMLButtonElement | null>(null);

  const { data, loading, subscribeToMore, updateQuery } =
    useQuery<GetNotificationsResponse>(GET_NOTIFICATIONS_QUERY);

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

  function handleNotificationsClick(e: React.MouseEvent<HTMLButtonElement>) {
    setNotificationsEl((prev) => (prev ? null : e.currentTarget));
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
      {notificationsEl && (
        <Content
          noPadding
          style={{
            boxShadow: '0 0 4px 0 rgba(0, 0, 0, .75)',
            padding: '24px 0',
            position: 'absolute',
            left:
              notificationsEl.offsetLeft +
              (direction === 'right-bottom'
                ? 0
                : notificationsEl.offsetWidth + 12),
            top:
              notificationsEl.offsetTop +
              (direction === 'right-bottom'
                ? notificationsEl.offsetHeight + 12
                : 0),
            transform:
              direction === 'right-bottom'
                ? 'translateX(-87%)'
                : 'translateY(-50%)',
            width: 450,
            zIndex: 1000,
          }}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            style={{ padding: '0 24px', paddingBottom: 24 }}
          >
            <Grid item>
              <Typography fontWeight={500} variant="subtitle">
                Notificaciones
              </Typography>
            </Grid>
            {unreadNotifications.length > 0 && (
              <Grid item>
                <Button
                  color="white"
                  loading={readingAllNotifications}
                  onClick={handleReadAllNotificationsClick}
                  size="small"
                  variant="outlined"
                >
                  Marcar todas como leídas
                </Button>
              </Grid>
            )}
          </Grid>
          {loading ? (
            <Grid container alignItems="center" justifyContent="center">
              <Loading id="notifications-loader" text="Cargando" />
            </Grid>
          ) : notifications.length > 0 ? (
            notifications
              .sort((a, b) =>
                compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
              )
              .map((notification, i) => {
                const className = clsx(classes.notificationLink, {
                  [classes['notificationLink--unread']]: !notification.read,
                });

                const createdAt = new Date(notification.createdAt);
                const notificationData = JSON.parse(notification.data);

                if (
                  notification.type === NotificationType.NEW_FRIEND_REQUEST &&
                  notification.dataUser
                ) {
                  return (
                    <FriendRequestNotification
                      className={className}
                      key={`friend_request_notification_${notification.id}_${i}`}
                      onClick={handleReadNotificationClick(notification)}
                      user={notification.dataUser}
                    />
                  );
                } else if (
                  notification.type === NotificationType.SERVER_MESSAGE
                ) {
                  return (
                    <ServerMessageNotification
                      className={className}
                      createdAt={createdAt}
                      data={notificationData}
                      key={`server_message_notification_${notification.id}_${i}`}
                      onClick={handleReadNotificationClick(notification)}
                    />
                  );
                }

                return null;
              })
          ) : (
            <Grid container alignItems="center" justifyContent="center">
              <Typography style={{ paddingTop: 24 }}>
                No tienes notificaciones
              </Typography>
            </Grid>
          )}
        </Content>
      )}
    </>
  );
}
