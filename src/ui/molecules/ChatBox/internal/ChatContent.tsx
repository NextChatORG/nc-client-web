import { useAuth } from '@nc-core/hooks';
import { ObjectId, UserMessage } from '@nc-core/interfaces/api';
import { groupMessages } from '@nc-core/utils';
import { Loading, Typography } from '@nc-ui';
import { Fragment } from 'react';
import ChatMessage from './ChatMessage';

interface ChatContentProps {
  chatId: ObjectId;
  classes: CSSModuleClasses;
  loading: boolean;
  messages: UserMessage[];
}

export default function ChatContent({
  chatId,
  classes,
  loading,
  messages,
}: ChatContentProps): JSX.Element {
  const { data: meData } = useAuth();

  if (loading) return <Loading id="chat-messages-loader" text="Cargando" />;

  const groupedMessages = groupMessages(messages);

  return (
    <>
      {groupedMessages.map(({ messages, title }, i) => {
        const unreadMessages =
          i === groupedMessages.length - 1
            ? messages.reduce<number>((prev, acc) => {
                if (!acc[0].read && acc[0].senderId !== meData?.id) {
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
                  message[0].senderId !== meData?.id &&
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
                      <ChatMessage classes={classes} data={message} />
                    </Fragment>
                  );
                }

                return (
                  <ChatMessage
                    classes={classes}
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
  );
}
