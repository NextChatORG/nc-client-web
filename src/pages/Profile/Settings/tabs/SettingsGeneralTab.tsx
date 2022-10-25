import {
  CHANGE_USERNAME_MUTATION,
  DISABLE_TWO_FACTOR_MUTATION,
  GENERATE_TWO_FACTOR_QR_CODE_MUTATION,
  VERIFY_TWO_FACTOR_CODE_MUTATION,
} from '@nc-core/api';
import { USERNAME_FIELD_VALIDATIONS } from '@nc-core/constants/forms';
import { PROFILE_ROUTE } from '@nc-core/constants/routes';
import { AuthContext } from '@nc-core/contexts';
import { useAuth, useMutation } from '@nc-core/hooks';
import {
  ChangeUsernameResponse,
  ChangeUsernameVariables,
  DisableTwoFactorResponse,
  DisableTwoFactorVariables,
  GenerateTwoFactorQRCodeResponse,
  GenerateTwoFactorQRCodeVariables,
  VerifyTwoFactorCodeResponse,
  VerifyTwoFactorCodeVariables,
} from '@nc-core/interfaces/api';
import { CloseIcon, DoneIcon, EditIcon } from '@nc-icons';
import {
  Button,
  ConfirmPasswordDialog,
  Content,
  Dialog,
  Divider,
  Grid,
  IconButton,
  TextField,
  TwoFactorCode,
  TwoFactorCodeStates,
  Typography,
} from '@nc-ui';
import { differenceInDays } from 'date-fns';
import { useContext, useRef, useState } from 'react';
import { Path, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classes from '../Settings.module.sass';

interface SettingsGeneralForm {
  username: string;
}

export default function SettingsGeneralTab(): JSX.Element {
  const [currentAction, setAction] = useState<
    | 'change_username'
    | 'enable_two_factor'
    | 'scan_two_factor'
    | 'disable_two_factor'
    | null
  >(null);
  const [openConfirmPasswordDialog, setConfirmPasswordDialogStatus] =
    useState<boolean>(false);
  const [twoFactorCodeImage, setTwoFactorCodeImage] = useState<string>('');
  const [twoFactorCodeState, setTwoFactorCodeState] =
    useState<TwoFactorCodeStates>('input');

  const twoFactorCodeInputRef = useRef<HTMLInputElement>(null);

  const { clearErrors, control, getValues, handleSubmit, setError, setValue } =
    useForm<SettingsGeneralForm>();
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: meData, logInTwoFactor } = useAuth({
    onLogInTwoFactorCompleted() {
      setTwoFactorCodeState('success');
      setTwoFactorCodeImage('');
      setAction(null);
    },
    onLogInTwoFactorErrors() {
      setTwoFactorCodeState('error');

      setTimeout(() => {
        setTwoFactorCodeState('input');

        if (!twoFactorCodeInputRef.current) return;

        twoFactorCodeInputRef.current.value = '';
        twoFactorCodeInputRef.current.dispatchEvent(new Event('input'));
        twoFactorCodeInputRef.current.focus();
      }, 500);
    },
  });

  const [changeUsername, { loading: changingUsername }] = useMutation<
    ChangeUsernameResponse,
    ChangeUsernameVariables
  >(CHANGE_USERNAME_MUTATION, {
    onCompleted({ changeUsername }) {
      if (!changeUsername || !dispatch) return;

      setConfirmPasswordDialogStatus(false);
      setAction(null);

      dispatch({
        type: 'change-access-token',
        payload: {
          accessToken: changeUsername.accessToken,
          profileData: changeUsername.profile,
        },
      });

      navigate(PROFILE_ROUTE);
    },
    onError({ fields }) {
      if (fields.length > 0) {
        setConfirmPasswordDialogStatus(false);

        for (const field of fields) {
          setError(field.field as Path<SettingsGeneralForm>, {
            message: field.message,
          });
        }
      }
    },
  });

  const [generateTwoFactorQRCode, { loading: generatingTwoFactorQRCode }] =
    useMutation<
      GenerateTwoFactorQRCodeResponse,
      GenerateTwoFactorQRCodeVariables
    >(GENERATE_TWO_FACTOR_QR_CODE_MUTATION, {
      onCompleted({ generateTwoFactorQRCode }) {
        setTwoFactorCodeImage(generateTwoFactorQRCode);

        setConfirmPasswordDialogStatus(false);
        setAction('scan_two_factor');
      },
    });

  const [verifyTwoFactorCode] = useMutation<
    VerifyTwoFactorCodeResponse,
    VerifyTwoFactorCodeVariables
  >(VERIFY_TWO_FACTOR_CODE_MUTATION, {
    onCompleted({ verifyTwoFactorCode }) {
      if (!verifyTwoFactorCode) return;

      logInTwoFactor({ code: verifyTwoFactorCode });
    },
  });

  const [disableTwoFactor, { loading: disablingTwoFactor }] = useMutation<
    DisableTwoFactorResponse,
    DisableTwoFactorVariables
  >(DISABLE_TWO_FACTOR_MUTATION, {
    onCompleted({ disableTwoFactor }) {
      if (!disableTwoFactor || !dispatch) return;

      dispatch({
        type: 'update-profile-data',
        payload: { settings: { twoFactorEnabled: false } },
      });

      setAction(null);
    },
  });

  function handleCloseChangeUsername(): void {
    setAction(null);
    clearErrors();

    setValue('username', meData?.username ?? '');
  }

  function handleCloseConfirmPasswordDialog(): void {
    setConfirmPasswordDialogStatus(false);
  }

  function handleEnableTwoFactor(): void {
    setConfirmPasswordDialogStatus(true);
    setAction('enable_two_factor');
  }

  function handleDisableTwoFactor(): void {
    setConfirmPasswordDialogStatus(true);
    setAction('disable_two_factor');
  }

  async function handleSaveConfirmPasswordDialog(
    password: string,
  ): Promise<void> {
    switch (currentAction) {
      case 'change_username': {
        await changeUsername({
          variables: { password, username: getValues().username },
        });

        break;
      }

      case 'enable_two_factor': {
        await generateTwoFactorQRCode({
          variables: { currentPassword: password },
        });

        break;
      }

      case 'disable_two_factor': {
        await disableTwoFactor({ variables: { currentPassword: password } });
        break;
      }
    }
  }

  const changeUsernameDiff = meData?.settings?.lastUsernameChanged
    ? differenceInDays(
        new Date(meData.settings.lastUsernameChanged),
        new Date(),
      )
    : 60;

  const canChangeUsername = changeUsernameDiff >= 60;

  return (
    <>
      <Content>
        <Typography
          withLetterSpacing
          className={classes.settings__subtitle}
          variant="subtitle"
        >
          Información general
        </Typography>
        <TextField
          fullWidth
          control={control}
          defaultValue={meData?.username}
          disabled={!canChangeUsername || currentAction !== 'change_username'}
          endAdorment={
            canChangeUsername &&
            (currentAction === 'change_username' ? (
              <div
                style={{ alignItems: 'center', display: 'flex', gap: '4px' }}
              >
                <IconButton
                  color="success"
                  onClick={handleSubmit(() =>
                    setConfirmPasswordDialogStatus(true),
                  )}
                  size="small"
                  variant="transparent"
                >
                  <DoneIcon fontSize="1.5em" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={handleCloseChangeUsername}
                  size="small"
                  variant="transparent"
                >
                  <CloseIcon fontSize="1.5em" />
                </IconButton>
              </div>
            ) : (
              <IconButton
                color="white"
                onClick={() => setAction('change_username')}
                size="small"
                variant="transparent"
              >
                <EditIcon size="1.5em" />
              </IconButton>
            ))
          }
          helperText={
            canChangeUsername
              ? 'Recuerda que no podrás cambiar tu nombre de usuario nuevamente hasta dentro de 60 días'
              : `No puedes cambiar tu nombre de usuario hasta dentro de ${
                  60 - changeUsernameDiff
                } día${60 - changeUsernameDiff === 1 ? '' : 's'}`
          }
          label="Nombre de usuario"
          name="username"
          validations={canChangeUsername && USERNAME_FIELD_VALIDATIONS}
        />
        <Divider className={classes.settings__divider} />
        <Typography
          withLetterSpacing
          className={classes.settings__subtitle}
          variant="subtitle"
        >
          Autenticación en dos factores (2AF)
        </Typography>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={8}>
            <Typography withLetterSpacing fontSize={12}>
              La autenticación en dos factores (2FA) es una buena forma de
              añadir una capa extra de seguridad a tu cuenta de NextChat, para
              asegurarte que solo tú puedes ingresar a tu cuenta.
            </Typography>
          </Grid>
          <Grid item>
            {meData?.settings?.twoFactorEnabled ? (
              <Button
                color="error"
                onClick={handleDisableTwoFactor}
                size="small"
                variant="outlined"
              >
                Desactivar 2FA
              </Button>
            ) : (
              <Button
                color="success"
                onClick={handleEnableTwoFactor}
                size="small"
                variant="outlined"
              >
                Activar 2FA
              </Button>
            )}
          </Grid>
        </Grid>
      </Content>
      {currentAction === 'scan_two_factor' && (
        <Dialog onClose={() => undefined} title="Autenticación en dos factores">
          <Grid container alignItems="center" direction="column" spacing={12}>
            <Grid item>
              <Typography withLetterSpacing fontSize={12}>
                Escanea el siguiente código QR con tu aplicación
              </Typography>
            </Grid>
            <Grid item>
              <img
                alt="Two Factor QR Code"
                src={twoFactorCodeImage}
                style={{ borderRadius: 12, overflow: 'hidden' }}
              />
            </Grid>
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
                  verifyTwoFactorCode({ variables: { code } })
                }
                setState={setTwoFactorCodeState}
                state={twoFactorCodeState}
              />
            </Grid>
          </Grid>
        </Dialog>
      )}
      {openConfirmPasswordDialog && currentAction && (
        <ConfirmPasswordDialog
          loading={
            changingUsername || generatingTwoFactorQRCode || disablingTwoFactor
          }
          onClose={handleCloseConfirmPasswordDialog}
          onSave={handleSaveConfirmPasswordDialog}
          submitText={
            currentAction === 'change_username'
              ? 'Cambiar nombre de usuario'
              : currentAction === 'enable_two_factor'
              ? 'Generar Código QR'
              : 'Desactivar 2FA'
          }
        />
      )}
    </>
  );
}
