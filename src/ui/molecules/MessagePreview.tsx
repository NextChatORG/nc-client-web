import { USER_CHAT_ROUTE } from '@nc-core/constants/routes';
import { useAuth } from '@nc-core/hooks';
import { RecentChat } from '@nc-core/interfaces/api';
import clsx from 'clsx';
import { differenceInDays, differenceInYears, format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';

export interface MessagePreviewProps {
  data: RecentChat;
}

export function MessagePreview({
  data,
}: MessagePreviewProps): JSX.Element | null {
  const { data: meData } = useAuth();
  const location = useLocation();

  if (meData == null) return null;

  const user = data.chat.toId === meData.id ? data.chat.user : data.chat.toUser;
  if (!user) return null;

  const messageDate = new Date(data.lastMessage.createdAt).setHours(0, 0, 0, 0);
  const currentDate = new Date().setHours(0, 0, 0, 0);

  const messageDateDaysDiff = differenceInDays(currentDate, messageDate);
  const messageDateYearsDiff = differenceInYears(currentDate, messageDate);

  const path = USER_CHAT_ROUTE.replace(':chatId', data.chat.id.toString());

  return (
    <Link
      className={clsx(
        'flex items-center gap-2 py-1 px-2 transition-colors hover:no-underline',
        location.pathname === path ? 'bg-white/5' : 'hover:bg-white/2',
      )}
      to={path}
    >
      <img
        alt={`${user.username}'s chat`}
        className="avatar-normal"
        src={user.profileImage}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h6 className="text-lg font-medium tracking-wide">{user.username}</h6>
          <span className="text-xs tracking-wide">
            {messageDateDaysDiff === 1
              ? 'Ayer'
              : format(
                  new Date(data.lastMessage.createdAt),
                  messageDateDaysDiff === 0
                    ? 'hh:mm a'
                    : `dd/MM${messageDateYearsDiff === 0 ? '' : '/yy'}`,
                )}
          </span>
        </div>
        <div className="flex items-start justify-between gap-x-1">
          <p className="flex-1 text-sm break-all tracking-wide">
            {data.lastMessage.senderId === meData.id ? 'Tú: ' : null}
            {data.lastMessage.content.slice(0, 80)}
            {data.lastMessage.content.length > 80 && '...'}
          </p>
          {Boolean(data.unread) && (
            <span className="badge-normal bg-primary">{data.unread}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
