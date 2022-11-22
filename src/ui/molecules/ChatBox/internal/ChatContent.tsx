import { useAuth } from '@nc-core/hooks';
import { ObjectId, UserMessage } from '@nc-core/interfaces/api';
import { groupMessages } from '@nc-core/utils';
import { Loading } from '@nc-ui';
import clsx from 'clsx';
import { Fragment } from 'react';
import ChatMessage from './ChatMessage';

interface ChatContentProps {
  chatId: ObjectId;
  loading: boolean;
  messages: UserMessage[];
}

export default function ChatContent({
  chatId,
  loading,
  messages,
}: ChatContentProps): JSX.Element {
  const { data: meData } = useAuth();

  const groupedMessages = groupMessages(messages);

  return (
    <>
      {loading && <Loading id="chat-messages-loader" text="Cargando" />}
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
          <Fragment key={`chat_grouped_message_${messages.length}_${i}`}>
            <h4 className="py-1 text-center text-[12px] font-medium">
              {title}
            </h4>
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
                    <h6
                      className={clsx(
                        'rounded-md bg-red-500 text-center text-[13px] font-medium tracking-wide',
                        'max-w-[50%] sm:max-w-[30%] lg:max-w-[40%] xl:max-w-[20%] mx-auto my-1 py-[6px]',
                      )}
                    >
                      {unreadMessages} mensaje
                      {unreadMessages === 1 ? '' : 's'} no leído
                      {unreadMessages === 1 ? '' : 's'}
                    </h6>
                    <ChatMessage data={message} />
                  </Fragment>
                );
              }

              return (
                <div
                  className={j > 0 ? 'mt-1' : undefined}
                  key={`chat_message_${chatId}_${message.length}_${i}_${j}`}
                >
                  <ChatMessage data={message} />
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
}
