import {
  CREATE_PUSH_MUTATION,
  GET_WEB_PUSH_PUBLIC_KEY_QUERY,
  GET_PROFILE_QUERY,
  NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
} from '@nc-core/api';
import { AuthContext, MessagesContext } from '@nc-core/contexts';
import { useLazyQuery, useMessages, useMutation } from '@nc-core/hooks';
import {
  CreatePushResponse,
  CreatePushVariables,
  GetWebPushPublicKeyResponse,
  GetProfileResponse,
  NewPrivateMessageResponse,
} from '@nc-core/interfaces/api';
import {
  authReducer,
  AUTH_REDUCER_INITIAL_STATE,
  messagesReducer,
  MESSAGES_REDUCER_INITIAL_STATE,
} from '@nc-core/reducers';
import { parseUrlBase64ToUint8Array } from '@nc-core/utils';
import { Loader } from '@nc-ui';
import { Suspense, useContext, useEffect, useReducer, useState } from 'react';

export function AppContexts({ children }: React.PropsWithChildren<unknown>) {
  const [authState, authDispatch] = useReducer(
    authReducer,
    AUTH_REDUCER_INITIAL_STATE,
  );

  const [messagesState, messagesDispatch] = useReducer(
    messagesReducer,
    MESSAGES_REDUCER_INITIAL_STATE,
  );

  return (
    <AuthContext.Provider value={{ dispatch: authDispatch, state: authState }}>
      <MessagesContext.Provider
        value={{ dispatch: messagesDispatch, state: messagesState }}
      >
        {children}
      </MessagesContext.Provider>
    </AuthContext.Provider>
  );
}

export default function App({
  children,
}: React.PropsWithChildren<unknown>): JSX.Element {
  const { dispatch: authDispatch, state: authState } = useContext(AuthContext);
  const { dispatch: messagesDispatch } = useContext(MessagesContext);

  const [loading, setLoading] = useState<boolean>(!authState.requireTwoFactor);

  const { appendMessage, loadRecentChats } = useMessages();

  const [generateWebPushPublicKey] = useLazyQuery<GetWebPushPublicKeyResponse>(
    GET_WEB_PUSH_PUBLIC_KEY_QUERY,
  );

  const [createPush] = useMutation<CreatePushResponse, CreatePushVariables>(
    CREATE_PUSH_MUTATION,
  );

  const [getProfile, { subscribeToMore }] = useLazyQuery<GetProfileResponse>(
    GET_PROFILE_QUERY,
    {
      fetchPolicy: 'network-only',
      async onCompleted({ getProfile }) {
        if (!authDispatch || !messagesDispatch) return;

        if ('serviceWorker' in navigator && 'Notification' in window) {
          let permission = Notification.permission;
          if (permission === 'default') {
            permission = await Notification.requestPermission();
          }

          if (permission === 'granted') {
            navigator.serviceWorker
              .register('/sw.js', { scope: '/', updateViaCache: 'none' })
              .then(async (register) => {
                messagesDispatch({
                  type: 'set-service-worker',
                  payload: register,
                });

                const lastSub = await register.pushManager.getSubscription();
                if (lastSub) return;

                const { data } = await generateWebPushPublicKey();
                if (!data?.getWebPushPublicKey) return;

                return register.pushManager.subscribe({
                  applicationServerKey: parseUrlBase64ToUint8Array(
                    data.getWebPushPublicKey,
                  ),
                  userVisibleOnly: true,
                });
              })
              .then((subscription) => {
                if (subscription) {
                  const data = subscription.toJSON();

                  if (data.keys) {
                    createPush({
                      variables: {
                        authKey: data.keys['auth'],
                        endpoint: subscription.endpoint,
                        expirationTime:
                          subscription.expirationTime ?? undefined,
                        p256dhKey: data.keys['p256dh'],
                      },
                    });
                  }
                }
              })
              .catch(console.error);
          }
        }

        authDispatch({ type: 'set-profile-data', payload: getProfile });

        subscribeToMore<NewPrivateMessageResponse>({
          document: NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
          updateQuery(prev, { subscriptionData }) {
            if (!subscriptionData.data) return prev;

            loadRecentChats();

            const message = subscriptionData.data.newPrivateMessage;
            appendMessage(message);

            if (message.senderId !== prev.getProfile.id) {
              const sound = document.createElement('audio');

              sound.src = '/sounds/new_message.mp3';
              sound.style.display = 'none';

              sound.addEventListener('ended', function () {
                sound.remove();
              });

              document.body.appendChild(sound);

              sound.play();
            }

            return prev;
          },
        });

        await loadRecentChats();
        setLoading(false);
      },
      onError: () => setLoading(false),
    },
  );

  useEffect(() => {
    if ((authState.jwt && authState.profileData) || !authState.jwt) {
      setLoading(false);
      return;
    }

    if (!authState.requireTwoFactor && !authState.profileData) {
      getProfile();
    }
  }, [authState]);

  if (loading) return <Loader />;

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
