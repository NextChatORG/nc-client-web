import {
  GET_PROFILE_QUERY,
  NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
} from '@nc-core/api';
import { AuthContext, MessagesContext } from '@nc-core/contexts';
import { useLazyQuery, useMessages } from '@nc-core/hooks';
import {
  GetProfileResponse,
  NewPrivateMessageResponse,
} from '@nc-core/interfaces/api';
import {
  authReducer,
  AUTH_REDUCER_INITIAL_STATE,
  messagesReducer,
  MESSAGES_REDUCER_INITIAL_STATE,
} from '@nc-core/reducers';
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

  const [loading, setLoading] = useState<boolean>(!authState.requireTwoFactor);

  const { appendMessage, loadRecentChats } = useMessages();

  const [getProfile, { subscribeToMore }] = useLazyQuery<GetProfileResponse>(
    GET_PROFILE_QUERY,
    {
      fetchPolicy: 'network-only',
      async onCompleted({ getProfile }) {
        if (!authDispatch) return;

        authDispatch({ type: 'set-profile-data', payload: getProfile });

        subscribeToMore<NewPrivateMessageResponse>({
          document: NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
          updateQuery(prev, { subscriptionData }) {
            if (!subscriptionData.data) return prev;

            loadRecentChats();

            const message = subscriptionData.data.newPrivateMessage;
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

            appendMessage(message);

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
