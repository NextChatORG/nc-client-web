import {
  GetMessagesResponse,
  GetMessagesVariables,
  GET_MESSAGES_QUERY,
  NewMessageResponse,
  NewMessageVariables,
  NEW_MESSAGE_SUBSCRIPTION,
  ReadAllMessagesResponse,
  ReadAllMessagesVariables,
  READ_ALL_MESSAGES_MUTATION,
  SendMessageResponse,
  SendMessageVariables,
  SEND_MESSAGE_MUTATION,
} from '@nc-core/api';
import { useMutation, useQuery } from '@nc-core/hooks';
import { groupMessages } from '@nc-core/utils';
import { Fragment, useEffect, useRef, useState } from 'react';
import { MoreVertIcon } from '../../../icons/mui';
import {
  Avatar,
  Content,
  Grid,
  IconButton,
  Loading,
  Typography,
} from '../../atoms';
import classes from './ChatBox.module.sass';
import { ChatMessage } from './ChatMessage';

export interface ChatBoxProps {
  chatId: string;
  refetchRecentMessages(): void;
}

export function ChatBox({
  chatId,
  refetchRecentMessages,
}: ChatBoxProps): JSX.Element {
  const [messageContent, setMessageContent] = useState<string>('');

  const messagesContentRef = useRef<HTMLDivElement | null>(null);
  const messagesInputRef = useRef<HTMLInputElement | null>(null);

  const { data, loading, updateQuery, subscribeToMore } = useQuery<
    GetMessagesResponse,
    GetMessagesVariables
  >(GET_MESSAGES_QUERY, {
    variables: { chatId },
  });

  const [readAllMessages] = useMutation<
    ReadAllMessagesResponse,
    ReadAllMessagesVariables
  >(READ_ALL_MESSAGES_MUTATION, {
    onCompleted({ readAllMessages }) {
      if (!readAllMessages) return;

      refetchRecentMessages();

      updateQuery((prev) => ({
        messages: prev.messages.map((message) => {
          if (!message.read && message.fromUserId === chatId) {
            return { ...message, read: true };
          }

          return message;
        }),
        profile: prev.profile,
      }));
    },
  });

  const [sendMessage, { loading: sendingMessage }] = useMutation<
    SendMessageResponse,
    SendMessageVariables
  >(SEND_MESSAGE_MUTATION, {
    onCompleted({ sendMessage }) {
      setMessageContent('');

      refetchRecentMessages();

      updateQuery((prev) => ({
        messages: [...prev.messages, sendMessage],
        profile: prev.profile,
      }));

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
      sendMessage({ variables: { chatId, content: messageContent } });
    }
  }

  const messages = data?.messages ?? [];
  const groupedMessages = groupMessages(messages);

  useEffect(() => {
    subscribeToMore<NewMessageResponse, NewMessageVariables>({
      document: NEW_MESSAGE_SUBSCRIPTION,
      variables: { chatId },
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) return prev;

        refetchRecentMessages();

        return {
          messages: [...prev.messages, subscriptionData.data.newMessage],
          profile: prev.profile,
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

  return (
    <Content className={classes.chatBox} fullHeight noPadding>
      {data?.profile && (
        <div className={classes.chatBox__header}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container alignItems="center" spacing={12}>
                <Grid item>
                  <Avatar url={data.profile.profileImage} size="small" />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle">
                    {data.profile.username}
                  </Typography>
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
      )}
      <div className={classes.chatBox__content} ref={messagesContentRef}>
        {loading ? (
          <Loading id="chat-messages-loader" text="Cargando" />
        ) : (
          <>
            {groupedMessages.map(({ messages, title }, i) => {
              const unreadMessages =
                i === groupedMessages.length - 1
                  ? messages.reduce<number>((prev, acc) => {
                      if (!acc[0].read && acc[0].fromUserId === chatId) {
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
                        message[0].fromUserId === chatId &&
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
      {data?.profile && (
        <div className={classes.chatBox__footer}>
          <Grid container>
            <Grid item xs="auto">
              <input
                autoComplete="off"
                className={classes.chatBox__footer__input}
                disabled={sendingMessage}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyDown={handleInputKeyDown}
                placeholder={`Mensaje para ${data.profile.username}`}
                ref={messagesInputRef}
                value={messageContent}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Content>
  );
}
