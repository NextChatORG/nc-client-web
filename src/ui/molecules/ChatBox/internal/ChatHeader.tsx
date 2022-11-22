import { CHAT_ROUTE } from '@nc-core/constants/routes';
import { User } from '@nc-core/interfaces/api';
import { ChevronLeftIcon, MoreVertIcon } from '@nc-icons';
import { Button } from '@nc-ui';

interface ChatHeaderProps {
  user: User;
  onOpenDetailsClick(): void;
}

export default function ChatHeader({
  onOpenDetailsClick,
  user,
}: ChatHeaderProps): JSX.Element {
  return (
    <header className="bg-dark-600 flex items-center p-1 lg:pl-2 gap-[8px]">
      <Button
        link
        className="lg:hidden"
        color="white"
        to={CHAT_ROUTE}
        variant="icon"
      >
        <ChevronLeftIcon size="1.25em" />
      </Button>
      <div className="flex-1 flex items-center justify-between">
        <button
          className="flex items-center gap-1"
          onClick={onOpenDetailsClick}
        >
          <img
            alt={`${user.username}'s chat`}
            className="avatar-normal"
            src={user.profileImage}
          />
          <p className="text-subtitle">{user.username}</p>
        </button>
        <Button color="white" onClick={onOpenDetailsClick} variant="icon">
          <MoreVertIcon size="1.25em" />
        </Button>
      </div>
    </header>
  );
}
