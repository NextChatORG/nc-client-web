import { useMessages } from '@nc-core/hooks';
import {
  ChatBox,
  MainTemplate,
  MessagePreview,
  NoChatSelected,
  Search,
} from '@nc-ui';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';

export default function Chat(): JSX.Element {
  const { recentChats, unreadChats } = useMessages();
  const { chatId } = useParams();

  const height =
    'h-[calc(100vh_-_82px)] sm:h-[calc(100vh_-_70px_-_48px)] lg:h-[calc(100vh_-_48px)]';

  return (
    <MainTemplate noPadding>
      <div className="relative basis-full lg:(flex gap-2) sm:p-2">
        <Search className="p-1 sm:(px-0 pt-0) lg:hidden" />
        <section
          className={clsx(
            'bg-dark-700 sm:rounded-lg lg:basis-1/3 xl:basis-1/5',
            height,
            { '<lg:hidden': Boolean(chatId) },
          )}
        >
          <h3 className="flex items-center gap-[8px] text-title py-[16px] px-2">
            Conversaciones
            {Boolean(unreadChats) && (
              <span className="badge-normal bg-primary">{unreadChats}</span>
            )}
          </h3>
          {recentChats.length > 0 ? (
            recentChats.map((recentChat, i) => (
              <MessagePreview
                data={recentChat}
                key={`chat_${recentChat.chat.id}_${i}`}
              />
            ))
          ) : (
            <p className="pt-1 text-body text-center">
              No tienes conversaciones
            </p>
          )}
        </section>
        <div className="lg:(flex-1 flex flex-col gap-2)">
          <Search className="<lg:hidden" />
          {chatId ? (
            <ChatBox chatId={chatId} className={height} />
          ) : (
            <NoChatSelected />
          )}
        </div>
      </div>
    </MainTemplate>
  );
}
