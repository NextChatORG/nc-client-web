import { useAuth } from '@nc-core/hooks';
import { UserMessage } from '@nc-core/interfaces/api';
import clsx from 'clsx';
import { format } from 'date-fns';

interface ChatMessageProps {
  data: UserMessage[];
}

export default function ChatMessage({
  data,
}: ChatMessageProps): JSX.Element | null {
  const { data: meData } = useAuth();

  const senderUser = data[0].senderUser;

  if (!meData || !senderUser) return null;

  const isMe = meData.id === data[0].senderId;

  return (
    <>
      {data.map((message, i) => (
        <div
          className={clsx(
            'w-full flex flex-wrap items-start content-start justify-start gap-1 px-2',
            { 'justify-end': isMe, 'mt-[4px]': i > 0 },
          )}
          key={`chat_message_${message.id}_${i}`}
        >
          {!isMe && i === 0 && (
            <img
              alt={`${senderUser.username}'s profile`}
              className="avatar-small"
              src={senderUser.profileImage}
            />
          )}
          <div
            className={clsx(
              'flex-1 flex flex-col items-start gap-[4px]',
              i > 0 ? (isMe ? 'pr-[37px]' : 'pl-[37px]') : '',
              { 'items-end': isMe },
            )}
          >
            <p
              className={clsx(
                'max-w-[70%] px-1 py-[6px] text-sm tracking-wide',
                isMe ? 'bg-dark-500' : 'bg-dark-800',
                isMe
                  ? i === 0
                    ? 'rounded-tl-md rounded-b-md'
                    : 'rounded-md'
                  : i === 0
                  ? 'rounded-tr-md rounded-b-md'
                  : 'rounded-md',
              )}
            >
              {message.content}
            </p>
            {i === data.length - 1 && (
              <span
                className={clsx(
                  'text-xs tracking-wide',
                  isMe ? 'mr-[4px]' : 'ml-[4px]',
                )}
              >
                {format(new Date(message.createdAt), 'hh:mm a')}
              </span>
            )}
          </div>
          {isMe && i === 0 && (
            <img
              alt={`${senderUser.username}'s profile`}
              className="avatar-small"
              src={senderUser.profileImage}
            />
          )}
        </div>
      ))}
    </>
  );
}
