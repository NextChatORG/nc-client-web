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
  Content,
  Dialog,
  Grid,
  TextField,
  TwoFactorCode,
  TwoFactorCodeStates,
  Typography,
} from '@nc-ui';
import clsx from 'clsx';
import { differenceInDays } from 'date-fns';
import { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import classes from '../Settings.module.sass';

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
        new Date(meData.settings.lastPasswordChanged),
        new Date(),
      )
    : 16;

  const canChangePassword = changePasswordDiff >= 16;

  const newPassword = watch('newPassword');

  return (
    <>
      <Content
        className={clsx(
          classes.settings__content,
          classes['settings__content--changePassword'],
        )}
      >
        <Typography
          withLetterSpacing
          className={classes.settings__subtitle}
          variant="subtitle"
        >
          Cambiar contraseña
        </Typography>
        {!canChangePassword && (
          <Typography
            withLetterSpacing
            className={classes.settings__information}
            fontSize={13}
          >
            Debes esperar {16 - changePasswordDiff} día
            {16 - changePasswordDiff === 1 ? '' : 's'} para volver a cambiar tu
            contraseña.
          </Typography>
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
      </Content>
      {requestingTwoFactorCode && (
        <Dialog onClose={() => undefined} title="Autenticación en dos factores">
          <Grid container alignItems="center" direction="column" spacing={12}>
            <Grid item>
              <Typography
                withLetterSpacing
                component="p"
                fontSize={12}
                style={{ marginTop: 20 }}
              >
                Ingresa el código de 6 digitos generado en la aplicación
              </Typography>
            </Grid>
            <Grid item>
              <TwoFactorCode
                inputRef={twoFactorCodeInputRef}
                onSubmit={(code) =>
                  changePassword({ variables: { ...getValues(), code } })
                }
                setState={setTwoFactorCodeState}
                state={twoFactorCodeState}
              />
            </Grid>
          </Grid>
        </Dialog>
      )}
    </>
  );
}
