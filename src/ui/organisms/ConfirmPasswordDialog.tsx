import { Dialog, TextField } from '@nc-ui';
import { useForm } from 'react-hook-form';

export interface ConfirmPasswordDialogForm {
  password: string;
}

export interface ConfirmPasswordDialogProps {
  loading?: boolean;
  submitText?: string;
  onClose(): void;
  onSave(password: string): void;
}

export function ConfirmPasswordDialog({
  loading = false,
  onClose,
  onSave,
  submitText = 'Continuar',
}: ConfirmPasswordDialogProps): JSX.Element {
  const { control, handleSubmit } = useForm<ConfirmPasswordDialogForm>();

  function onSubmit(values: ConfirmPasswordDialogForm): void {
    onSave(values.password);
  }

  return (
    <Dialog
      actions={[
        {
          loading,
          onClick: handleSubmit(onSubmit),
          message: submitText,
          size: 'small',
        },
      ]}
      onClose={onClose}
      title="Confirma tu contraseña"
    >
      <TextField
        required
        fullWidth
        control={control}
        defaultValue=""
        placeholder="Contraseña"
        name="password"
        type="password"
      />
    </Dialog>
  );
}
