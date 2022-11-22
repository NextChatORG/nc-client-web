import { CHANGE_PASSWORD_MUTATION } from '@nc-core/api';
import { PASSWORD_FIELD_VALIDATIONS } from '@nc-core/constants/forms';
import { AuthContext } from '@nc-core/contexts';
import { useAuth, useMutation } from '@nc-core/hooks';
import {
  ChangePasswordResponse,
  ChangePasswordVariables,
} from '@nc-core/interfaces/api';
import {
  Button,
  Dialog,
  TextField,
  TwoFactorCode,
  TwoFactorCodeStates,
} from '@nc-ui';
import { differenceInDays } from 'date-fns';
import { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function SettingsChangePasswordTab(): JSX.Element {
  const [requestingTwoFactorCode, setRequestingTwoFactorCode] =
    useState<boolean>(false);
  const [twoFactorCodeState, setTwoFactorCodeState] =
    useState<TwoFactorCodeStates>('input');

  const twoFactorCodeInputRef = useRef<HTMLInputElement>(null);

  const { dispatch } = useContext(AuthContext);

  const { clearErrors, control, getValues, handleSubmit, setValue, watch } =
    useForm<ChangePasswordVariables>();
  const { data: meData } = useAuth();

  const [changePassword, { loading: changingPassword }] = useMutation<
    ChangePasswordResponse,
    ChangePasswordVariables
  >(CHANGE_PASSWORD_MUTATION, {
    onCompleted({ changePassword }) {
      if (!dispatch) return;

      dispatch({
        type: 'update-data',
        payload: {
          accessToken: changePassword,
          profile: { settings: { lastPasswordChanged: new Date().getTime() } },
        },
      });

      setRequestingTwoFactorCode(false);

      toast.success('¡Has cambiado tu contraseña correctamente!');

      clearErrors();

      setValue('currentPassword', '');
      setValue('newPassword', '');
      setValue('confirmNewPassword', '');
    },
  });

  function onSubmit(variables: ChangePasswordVariables) {
    if (!meData?.settings?.twoFactorEnabled) {
      return changePassword({ variables });
    }

    setRequestingTwoFactorCode(true);
  }

  const changePasswordDiff = meData?.settings?.lastPasswordChanged
    ? differenceInDays(
        new Date(),
        new Date(meData.settings.lastPasswordChanged),
      )
    : 16;

  const canChangePassword = changePasswordDiff >= 16;

  const newPassword = watch('newPassword');

  return (
    <>
      <div className="content flex flex-col items-end content-end justify-end gap-2">
        <h3 className="block w-full mb-2 text-title tracking-wide">
          Cambiar contraseña
        </h3>
        {!canChangePassword && (
          <p className="block w-full -mt-2 text-[13px] tracking-wide">
            Debes esperar {16 - changePasswordDiff} día
            {16 - changePasswordDiff === 1 ? '' : 's'} para volver a cambiar tu
            contraseña.
          </p>
        )}
        <TextField
          fullWidth
          required
          control={control}
          disabled={!canChangePassword}
          label="Contraseña actual"
          name="currentPassword"
          type="password"
        />
        <TextField
          fullWidth
          required
          control={control}
          disabled={!canChangePassword}
          label="Nueva contraseña"
          name="newPassword"
          type="password"
          validations={canChangePassword && PASSWORD_FIELD_VALIDATIONS}
        />
        <TextField
          fullWidth
          required
          control={control}
          disabled={!canChangePassword}
          label="Confirma la nueva contraseña"
          name="confirmNewPassword"
          type="password"
          validations={
            canChangePassword && {
              validate(value: string) {
                return newPassword === value || 'Las contraseñas no coinciden';
              },
            }
          }
        />
        <Button
          disabled={!canChangePassword}
          loading={changingPassword}
          onClick={handleSubmit(onSubmit)}
        >
          Cambiar
        </Button>
      </div>
      {requestingTwoFactorCode && (
        <Dialog onClose={() => undefined} title="Autenticación en dos factores">
          <p className="text-center text-[12px] tracking-wide">
            Ingresa el código de 6 digitos generado en la aplicación
          </p>
          <TwoFactorCode
            className="mt-1 mx-auto"
            inputRef={twoFactorCodeInputRef}
            onSubmit={(code) =>
              changePassword({ variables: { ...getValues(), code } })
            }
            setState={setTwoFactorCodeState}
            state={twoFactorCodeState}
          />
        </Dialog>
      )}
    </>
  );
}
