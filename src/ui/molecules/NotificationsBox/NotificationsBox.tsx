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
import { useEffect, useState } from 'react';
import {
  Button,
  Content,
  Grid,
  IconButton,
  Loading,
  Typography,
} from '../../atoms';
import { FriendRequestNotification } from './FriendRequestNotification';

export default function NotificationsBox(): JSX.Element | null {
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

        return Object.assign({}, prev, {
          getNotifications: [
            subscriptionData.data.newNotification.notification,
            ...prev.getNotifications,
          ],
        });
      },
    });

    subscribeToMore<RemoveNotificationResponse>({
      document: REMOVE_NOTIFICATION_SUBSCRIPTION,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;

        return Object.assign({}, prev, {
          getNotifications: prev.getNotifications.filter(
            ({ id }) =>
              id !== subscriptionData.data.removeNotification.notificationId,
          ),
        });
      },
    });
  }, []);

  return (
    <>
      <IconButton
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
            position: 'absolute',
            left: notificationsEl.offsetLeft,
            top: notificationsEl.offsetHeight + notificationsEl.offsetTop + 12,
            transform: 'translateX(-87%)',
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
