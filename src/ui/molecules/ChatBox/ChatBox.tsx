import { useAuth, useMessages } from '@nc-core/hooks';
import { Content, Grid } from '@nc-ui';
import { useEffect, useRef, useState } from 'react';
import classes from './ChatBox.module.sass';
import { ChatContent, ChatDetails, ChatFooter, ChatHeader } from './internal';

export interface ChatBoxProps {
  chatId: string;
}

export function ChatBox({ chatId }: ChatBoxProps): JSX.Element | null {
  const [detailsOpened, setDetailsStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const messagesContentRef = useRef<HTMLDivElement | null>(null);

  const { chats, loadChat } = useMessages();
  const { data: meData } = useAuth();

  const currentChat = chats[chatId];

  useEffect(() => {
    if (currentChat?.chat) return;

    setLoading(true);

    loadChat(chatId).finally(() => setLoading(false));
  }, [chatId]);

  useEffect(() => {
    if (!messagesContentRef.current || !currentChat?.messages) return;

    messagesContentRef.current.scrollTo(
      0,
      messagesContentRef.current.scrollHeight,
    );
  }, [currentChat]);

  if (!currentChat?.chat || !meData) return null;

  const user =
    currentChat.chat.toId === meData.id
      ? currentChat.chat.user
      : currentChat.chat.toUser;

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
              messages={currentChat.messages}
            />
          </div>
          <ChatFooter chatId={chatId} classes={classes} user={user} />
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
