import {
  GET_CHAT_AND_MESSAGES_QUERY,
  NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
  READ_ALL_MESSAGES_MUTATION,
  SEND_PRIVATE_MESSAGE_MUTATION,
} from '@nc-core/api';
import { useAuth, useMutation, useQuery } from '@nc-core/hooks';
import {
  GetChatAndMessagesResponse,
  GetChatAndMessagesVariables,
  NewPrivateMessageResponse,
  NewPrivateMessageVariables,
  ReadAllMessagesResponse,
  ReadAllMessagesVariables,
  SendPrivateMessageResponse,
  SendPrivateMessageVariables,
} from '@nc-core/interfaces/api';
import { groupMessages } from '@nc-core/utils';
import { MoreVertIcon } from '@nc-icons';
import { Avatar, Content, Grid, IconButton, Loading, Typography } from '@nc-ui';
import { Fragment, useEffect, useRef, useState } from 'react';
import classes from './ChatBox.module.sass';
import { ChatMessage } from './ChatMessage';

export interface ChatBoxProps {
  chatId: string;
  refetchRecentChats(): void;
}

export function ChatBox({
  chatId,
  refetchRecentChats,
}: ChatBoxProps): JSX.Element | null {
  const [messageContent, setMessageContent] = useState<string>('');

  const messagesContentRef = useRef<HTMLDivElement | null>(null);
  const messagesInputRef = useRef<HTMLInputElement | null>(null);

  const { data: meData } = useAuth();

  const { data, loading, updateQuery, subscribeToMore } = useQuery<
    GetChatAndMessagesResponse,
    GetChatAndMessagesVariables
  >(GET_CHAT_AND_MESSAGES_QUERY, {
    variables: { chatId },
  });

  const [readAllMessages] = useMutation<
    ReadAllMessagesResponse,
    ReadAllMessagesVariables
  >(READ_ALL_MESSAGES_MUTATION, {
    onCompleted({ readAllMessages }) {
      if (!readAllMessages) return;

      refetchRecentChats();

      updateQuery((prev) => ({
        ...prev,
        messages: prev.messages.map((message) => {
          if (!message.read && message.senderId !== meData?.id) {
            return { ...message, read: true };
          }

          return message;
        }),
      }));
    },
  });

  const [sendPrivateMessage, { loading: sendingPrivateMessage }] = useMutation<
    SendPrivateMessageResponse,
    SendPrivateMessageVariables
  >(SEND_PRIVATE_MESSAGE_MUTATION, {
    onCompleted() {
      setMessageContent('');

      refetchRecentChats();

      setTimeout(() => {
        if (messagesInputRef.current) messagesInputRef.current.focus();
      }, 100);
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageContent(e.target.value);
  }

  function handleInputFocus() {
    readAllMessages({ variables: { chatId } });
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && messageContent.length > 0) {
      sendPrivateMessage({ variables: { chatId, content: messageContent } });
    }
  }

  const messages = data?.messages ?? [];
  const groupedMessages = groupMessages(messages);

  useEffect(() => {
    subscribeToMore<NewPrivateMessageResponse, NewPrivateMessageVariables>({
      document: NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
      variables: { chatId },
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;

        refetchRecentChats();

        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newPrivateMessage],
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
    <Content className={classes.chatBox} fullHeight noPadding>
      <div className={classes.chatBox__header}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container alignItems="center" spacing={12}>
              <Grid item>
                <Avatar url={user.profileImage} size="small" />
              </Grid>
              <Grid item>
                <Typography variant="subtitle">{user.username}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              color="white"
              onClick={() => undefined}
              size="small"
              variant="transparent"
            >
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      <div className={classes.chatBox__content} ref={messagesContentRef}>
        {loading ? (
          <Loading id="chat-messages-loader" text="Cargando" />
        ) : (
          <>
            {groupedMessages.map(({ messages, title }, i) => {
              const unreadMessages =
                i === groupedMessages.length - 1
                  ? messages.reduce<number>((prev, acc) => {
                      if (!acc[0].read && acc[0].senderId !== meData.id) {
                        return prev + acc.length;
                      }

                      return prev;
                    }, 0)
                  : 0;

              let hasUnreadTitle = false;

              return (
                <div
                  className={classes.chatBox__content__grouped}
                  id={
                    i === groupedMessages.length - 1
                      ? 'chat-grouped-messages'
                      : undefined
                  }
                  key={`chat_grouped_message_${messages.length}_${i}`}
                >
                  <Typography
                    className={classes.chatBox__content__grouped__title}
                    fontSize={12}
                    fontWeight={500}
                  >
                    {title}
                  </Typography>
                  <div className={classes.chatBox__content__grouped__messages}>
                    {messages.map((message, j) => {
                      if (
                        unreadMessages > 0 &&
                        !message[0].read &&
                        message[0].senderId !== meData.id &&
                        !hasUnreadTitle
                      ) {
                        hasUnreadTitle = true;

                        return (
                          <Fragment
                            key={`chat_message_${chatId}_${message.length}_${i}_${j}`}
                          >
                            <Typography
                              withLetterSpacing
                              className={
                                classes.chatBox__content__grouped__messages__unread
                              }
                              fontSize={12}
                            >
                              {unreadMessages} mensaje
                              {unreadMessages === 1 ? '' : 's'} no leído
                              {unreadMessages === 1 ? '' : 's'}
                            </Typography>
                            <ChatMessage data={message} />
                          </Fragment>
                        );
                      }

                      return (
                        <ChatMessage
                          data={message}
                          key={`chat_message_${chatId}_${message.length}_${i}_${j}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      <div className={classes.chatBox__footer}>
        <Grid container>
          <Grid item xs="auto">
            <input
              autoComplete="off"
              className={classes.chatBox__footer__input}
              disabled={sendingPrivateMessage}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleInputKeyDown}
              placeholder={`Mensaje para ${user.username}`}
              ref={messagesInputRef}
              value={messageContent}
            />
          </Grid>
        </Grid>
      </div>
    </Content>
  );
}
