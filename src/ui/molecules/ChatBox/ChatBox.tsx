import {
  GET_CHAT_AND_MESSAGES_QUERY,
  NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
} from '@nc-core/api';
import { useAuth, useQuery } from '@nc-core/hooks';
import {
  GetChatAndMessagesResponse,
  GetChatAndMessagesVariables,
  NewPrivateMessageResponse,
  NewPrivateMessageVariables,
} from '@nc-core/interfaces/api';
import { Content, Grid } from '@nc-ui';
import { useEffect, useRef, useState } from 'react';
import classes from './ChatBox.module.sass';
import { ChatContent, ChatDetails, ChatFooter, ChatHeader } from './internal';

export interface ChatBoxProps {
  chatId: string;
  refetchRecentChats(): void;
}

export function ChatBox({
  chatId,
  refetchRecentChats,
}: ChatBoxProps): JSX.Element | null {
  const [detailsOpened, setDetailsStatus] = useState<boolean>(false);

  const messagesContentRef = useRef<HTMLDivElement | null>(null);

  const { data: meData } = useAuth();

  const { data, loading, updateQuery, subscribeToMore } = useQuery<
    GetChatAndMessagesResponse,
    GetChatAndMessagesVariables
  >(GET_CHAT_AND_MESSAGES_QUERY, {
    variables: { chatId },
  });

  useEffect(() => {
    subscribeToMore<NewPrivateMessageResponse, NewPrivateMessageVariables>({
      document: NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
      variables: { chatId },
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;

        refetchRecentChats();

        const message = subscriptionData.data.newPrivateMessage;
        if (message.senderId !== meData?.id) {
          const sound = document.createElement('audio');

          sound.src = '/sounds/new_message.mp3';
          sound.style.display = 'none';

          sound.addEventListener('ended', function () {
            sound.remove();
          });

          document.body.appendChild(sound);

          sound.play();
        }

        return {
          ...prev,
          messages: [...prev.messages, message],
        };
      },
    });
  }, []);

  useEffect(() => {
    if (!messagesContentRef.current || !data?.messages) return;

    messagesContentRef.current.scrollTo(
      0,
      messagesContentRef.current.scrollHeight,
    );
  }, [data]);

  if (!meData) return null;

  const user =
    data?.chat.toId === meData.id ? data.chat.user : data?.chat.toUser;

  if (!user) return null;

  return (
    <Grid container spacing={12}>
      <Grid
        item
        style={{ height: 'calc(100vh - 48px - 50px)' }}
        xs={detailsOpened ? 9 : 12}
      >
        <Content fullHeight noPadding className={classes.chatBox}>
          <ChatHeader
            classes={classes}
            onClick={() => setDetailsStatus(!detailsOpened)}
            user={user}
          />
          <div className={classes.chatBox__content} ref={messagesContentRef}>
            <ChatContent
              chatId={chatId}
              classes={classes}
              loading={loading}
              messages={data?.messages ?? []}
            />
          </div>
          <ChatFooter
            chatId={chatId}
            classes={classes}
            refetchRecentChats={refetchRecentChats}
            updateMessages={updateQuery}
            user={user}
          />
        </Content>
      </Grid>
      {detailsOpened && (
        <Grid item xs={3}>
          <ChatDetails classes={classes} user={user} />
        </Grid>
      )}
    </Grid>
  );
}
