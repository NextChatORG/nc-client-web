import {
  GetNotificationsResponse,
  GET_NOTIFICATIONS_QUERY,
  NewNotificationResponse,
  NEW_NOTIFICATION_SUBSCRIPTION,
  NotificationType,
  RemoveNotificationResponse,
  REMOVE_NOTIFICATION_SUBSCRIPTION,
} from '@nc-core/api';
import { useQuery } from '@nc-core/hooks';
import { NotificationsFilledIcon, NotificationsOutlinedIcon } from '@nc-icons';
import { Button, Content, Grid, IconButton, Loading, Typography } from '@nc-ui';
import { useEffect, useState } from 'react';
import { FriendRequestNotification } from './FriendRequestNotification';

export interface NotificationsBoxProps {
  direction?: 'right-bottom' | 'right-center';
}

export function NotificationsBox({
  direction = 'right-bottom',
}: NotificationsBoxProps): JSX.Element | null {
  const [notificationsEl, setNotificationsEl] =
    useState<HTMLButtonElement | null>(null);

  const { data, loading, subscribeToMore } = useQuery<GetNotificationsResponse>(
    GET_NOTIFICATIONS_QUERY,
  );

  function handleNotificationsClick(e: React.MouseEvent<HTMLButtonElement>) {
    setNotificationsEl((prev) => (prev ? null : e.currentTarget));
  }

  const notifications = data?.getNotifications ?? [];
  const unreadNotifications = notifications.filter(({ read }) => !read);

  useEffect(() => {
    subscribeToMore<NewNotificationResponse>({
      document: NEW_NOTIFICATION_SUBSCRIPTION,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;

        return {
          getNotifications: [
            subscriptionData.data.newNotification.notification,
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
            ({ id }) =>
              id !== subscriptionData.data.removeNotification.notificationId,
          ),
        };
      },
    });
  }, []);

  return (
    <>
      <IconButton
        active={Boolean(notificationsEl)}
        color="white"
        counter={unreadNotifications.length}
        onClick={handleNotificationsClick}
        variant="transparent"
      >
        {notificationsEl ? (
          <NotificationsFilledIcon />
        ) : (
          <NotificationsOutlinedIcon />
        )}
      </IconButton>
      {notificationsEl && (
        <Content
          style={{
            boxShadow: '0 0 4px 0 rgba(0, 0, 0, .75)',
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
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography fontWeight={500} variant="subtitle">
                Notificaciones
              </Typography>
            </Grid>
            {unreadNotifications.length > 0 && (
              <Grid item>
                <Button
                  color="white"
                  onClick={() => undefined}
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
            notifications.map((notification, i) => {
              const notificationData = JSON.parse(notification.data);

              if (notification.type === NotificationType.NEW_FRIEND_REQUEST) {
                return (
                  <FriendRequestNotification
                    data={notificationData}
                    key={`friend_request_notification_${notification.id}_${i}`}
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
