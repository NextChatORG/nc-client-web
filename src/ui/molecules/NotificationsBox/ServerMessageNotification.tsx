import { Logo } from '@nc-ui';
import clsx from 'clsx';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

export interface ServerMessageNotificationData {
  message: string;
}

export interface ServerMessageNotificationProps {
  className: string;
  createdAt: Date;
  data: ServerMessageNotificationData;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function ServerMessageNotification({
  className,
  createdAt,
  data,
  onClick,
}: ServerMessageNotificationProps): JSX.Element {
  return (
    <Link
      className={clsx(className, 'flex flex-wrap items-center gap-2')}
      onClick={onClick}
      to="#"
    >
      <Logo onlyIcon />
      <div className="flex-1">
        <h6 className="text-lg font-bold tracking-wide">
          Mensaje de NextChat:
        </h6>
        <p className="text-sm tracking-wide my-1">{data.message}</p>
        <span className="text-xs font-bold tracking-wide">
          {format(createdAt, 'dd MMMM/yyyy hh:mm', { locale: es })}
        </span>
      </div>
    </Link>
  );
}
