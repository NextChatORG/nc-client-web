import { Button, ButtonPropsWithMessage } from '@nc-ui';
import clsx from 'clsx';

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
    <div className="fixed left-0 top-0 z-dialog w-full h-[100vh] flex items-center justify-center">
      <div
        className="absolute z-0 w-full h-full backdrop-filter backdrop-blur-sm bg-black/40 transition-colors hover:bg-black/50"
        onClick={onClose}
        onKeyPress={onBgKeyPress}
        role="button"
        tabIndex={0}
      />
      <div
        className={clsx(
          'relative z-1 rounded-lg bg-dark-700 pt-2 pb-1',
          'min-w-[90%] sm:min-w-[400px] lg:min-w-[400px] xl:min-w-[500px]',
        )}
      >
        {title && <h3 className="text-title block px-2 mb-2">{title}</h3>}
        <div className="px-2">{children}</div>
        {actions && actions.length > 0 && (
          <div className="flex items-center justify-end gap-1 pt-2 pr-1">
            {actions.map((action, i) => (
              <Button {...action} key={`dialog_action_${i}`}>
                {action.message}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
