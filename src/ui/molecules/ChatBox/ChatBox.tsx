import { useAuth, useMessages } from '@nc-core/hooks';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ChatContent, ChatDetails, ChatFooter, ChatHeader } from './internal';

export interface ChatBoxProps {
  chatId: string;
  className?: string;
}

export function ChatBox({
  chatId,
  className,
}: ChatBoxProps): JSX.Element | null {
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
    <div
      className={clsx(
        className,
        'flex gap-2 lg:(flex-1 max-h-[calc(100vh_-_58px_-_72px)])',
      )}
    >
      <section
        className={clsx('flex-1 bg-dark-700 sm:(rounded-lg overflow-hidden) ', {
          '<lg:hidden': detailsOpened,
        })}
      >
        <ChatHeader
          onOpenDetailsClick={() => setDetailsStatus(!detailsOpened)}
          user={user}
        />
        <div
          className={clsx(
            'overflow-y-auto max-h-[calc(100%_-_69px_-_72px)] pb-1',
            'scrollbar-thin scrollbar-thumb-dark-800 hover:scrollbar-thumb-dark-900',
          )}
          ref={messagesContentRef}
        >
          <ChatContent
            chatId={chatId}
            loading={loading}
            messages={currentChat.messages}
          />
        </div>
        <ChatFooter chatId={chatId} user={user} />
      </section>
      {detailsOpened && (
        <ChatDetails onBackClick={() => setDetailsStatus(false)} user={user} />
      )}
    </div>
  );
}
