import { Link } from 'react-router-dom';
import { Grid, Logo, Typography } from '@nc-ui';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
    <Link className={className} onClick={onClick} to="#">
      <Grid container alignItems="center" spacing={12}>
        <Grid item>
          <Logo onlyIcon />
        </Grid>
        <Grid item xs={10}>
          <Typography
            withLetterSpacing
            component="p"
            fontWeight="bold"
            style={{ marginBottom: 4 }}
          >
            Mensaje de NextChat:
          </Typography>
          <Typography fontSize={13}>{data.message}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            withLetterSpacing
            component="p"
            fontSize={11}
            fontWeight="bold"
            style={{ paddingLeft: 'calc(45px + 12px)' }}
          >
            {format(createdAt, 'dd MMMM/yyyy hh:mm', { locale: es })}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
}
