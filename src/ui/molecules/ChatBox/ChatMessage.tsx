import { useAuth } from '@nc-core/hooks';
import { UserMessage } from '@nc-core/interfaces/api';
import { Avatar, Typography } from '@nc-ui';
import clsx from 'clsx';
import { format } from 'date-fns';
import classes from './ChatMessage.module.sass';

export interface ChatMessageProps {
  data: UserMessage[];
}

export function ChatMessage({ data }: ChatMessageProps): JSX.Element | null {
  const { data: meData } = useAuth();

  const senderUser = data[0].senderUser;

  if (!meData || !senderUser) return null;

  const isMe = meData.id === data[0].senderId;

  return (
    <div className={classes.chatMessage}>
      {data.map((message, i) => (
        <div
          className={clsx(classes.chatMessage__content, {
            [classes['chatMessage__content--end']]: isMe,
          })}
          key={`chat_message_${message.id}_${i}`}
        >
          {!isMe && i === 0 && (
            <Avatar url={senderUser.profileImage} size="small" />
          )}
          <div
            className={clsx(classes.chatMessage__content__message, {
              [classes['chatMessage__content__message--margin']]: i > 0,
            })}
          >
            <Typography
              withLetterSpacing
              className={classes.chatMessage__content__message__text}
              fontSize={14}
            >
              {message.content}
            </Typography>
            {i === data.length - 1 && (
              <Typography
                withLetterSpacing
                className={classes.chatMessage__content__message__date}
                fontSize={10}
              >
                {format(new Date(message.createdAt), 'hh:mm a')}
              </Typography>
            )}
          </div>
          {isMe && i === 0 && (
            <Avatar url={senderUser.profileImage} size="small" />
          )}
        </div>
      ))}
    </div>
  );
}
