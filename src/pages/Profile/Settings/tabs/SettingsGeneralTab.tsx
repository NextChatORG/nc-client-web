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
  Dialog,
  TextField,
  TwoFactorCode,
  TwoFactorCodeStates,
} from '@nc-ui';
import { differenceInDays } from 'date-fns';
import { useContext, useRef, useState } from 'react';
import { Path, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
        type: 'update-data',
        payload: { profile: { settings: { twoFactorEnabled: false } } },
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
        new Date(),
        new Date(meData.settings.lastUsernameChanged),
      )
    : 60;

  const canChangeUsername = changeUsernameDiff >= 60;

  return (
    <>
      <div className="content">
        <h3 className="mb-2 text-title tracking-wide">Información general</h3>
        <TextField
          fullWidth
          control={control}
          defaultValue={meData?.username}
          disabled={!canChangeUsername || currentAction !== 'change_username'}
          endAdorment={
            canChangeUsername &&
            (currentAction === 'change_username' ? (
              <div className="flex items-center gap-[4px]">
                <Button
                  color="success"
                  onClick={handleSubmit(() =>
                    setConfirmPasswordDialogStatus(true),
                  )}
                  variant="icon"
                >
                  <DoneIcon size="1.25em" />
                </Button>
                <Button
                  color="error"
                  onClick={handleCloseChangeUsername}
                  variant="icon"
                >
                  <CloseIcon size="1.25em" />
                </Button>
              </div>
            ) : (
              <Button
                color="white"
                onClick={() => setAction('change_username')}
                variant="icon"
              >
                <EditIcon size="1.25em" />
              </Button>
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
        <div className="divider mt-2 mb-[18px]" />
        <h3 className="mb-2 text-title tracking-wide">
          Autenticación en dos factores (2AF)
        </h3>
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-1">
          <p className="basis-full lg:basis-4/6 xl:basis-3/6 text-[14px] !leading-relaxed tracking-wide">
            La autenticación en dos factores (2FA) es una buena forma de añadir
            una capa extra de seguridad a tu cuenta de NextChat, para asegurarte
            que solo tú puedes ingresar a tu cuenta.
          </p>
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
        </div>
      </div>
      {currentAction === 'scan_two_factor' && (
        <Dialog onClose={() => undefined} title="Autenticación en dos factores">
          <h4 className="text-center text-[12px] tracking-wide">
            Escanea el siguiente código QR con tu aplicación
          </h4>
          <img
            alt="Two Factor QR Code"
            className="mt-2 rounded-lg mx-auto overflow-hidden"
            src={twoFactorCodeImage}
          />
          <p className="mt-2 text-center text-[12px] tracking-wide">
            Ingresa el código de 6 digitos generado en la aplicación
          </p>
          <TwoFactorCode
            className="mt-1 mx-auto"
            inputRef={twoFactorCodeInputRef}
            onSubmit={(code) => verifyTwoFactorCode({ variables: { code } })}
            setState={setTwoFactorCodeState}
            state={twoFactorCodeState}
          />
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
