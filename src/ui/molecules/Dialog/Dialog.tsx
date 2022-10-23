import { Button, ButtonPropsWithMessage, Grid, Typography } from '@nc-ui';
import classes from './Dialog.module.sass';

export interface DialogProps {
  actions?: ButtonPropsWithMessage[];
  title?: string;
  onClose(): void;
}

export function Dialog({
  actions,
  children,
  onClose,
  title,
}: React.PropsWithChildren<DialogProps>): JSX.Element {
  function onBgKeyPress(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key === 'Enter') onClose();
  }

  return (
    <div className={classes.dialog}>
      <div
        className={classes.dialog__bg}
        onClick={onClose}
        onKeyPress={onBgKeyPress}
        role="button"
        tabIndex={0}
      />
      <div className={classes.dialog__content}>
        {title && (
          <Typography
            className={classes.dialog__content__title}
            variant="title"
          >
            {title}
          </Typography>
        )}
        <div className={classes.dialog__content__content}>{children}</div>
        {actions && actions.length > 0 && (
          <Grid
            container
            alignItems="center"
            className={classes.dialog__content__actions}
            justifyContent="flex-end"
            spacing={12}
          >
            {actions.map((action, i) => (
              <Grid item key={`dialog_action_${i}`}>
                <Button {...action}>{action.message}</Button>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}
