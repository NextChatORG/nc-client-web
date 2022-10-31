self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  if (
    !data.content ||
    !data.senderUser ||
    !data.senderUser.username ||
    !data.senderUser.profileImage
  ) {
    return;
  }

  event.waitUntil(
    self.registration.showNotification(
      `${data.senderUser.username} te ha enviado un mensaje`,
      {
        body: data.content,
        icon: data.senderUser.profileImage,
      },
    ),
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
});
