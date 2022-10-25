import { useAuth } from '@nc-core/hooks';
import { LogoutIcon } from '@nc-icons';
import {
  Button,
  Grid,
  Logo,
  TwoFactorCode,
  TwoFactorCodeStates,
  Typography,
} from '@nc-ui';
import { useRef, useState } from 'react';

const spacing = 20;

export default function TwoFactor(): JSX.Element {
  const [state, setState] = useState<TwoFactorCodeStates>('input');

  const inputRef = useRef<HTMLInputElement>(null);

  const { logInTwoFactor, logOut } = useAuth({
    onLogInTwoFactorCompleted() {
      setState('success');
    },
    onLogInTwoFactorErrors() {
      setState('error');

      setTimeout(() => {
        setState('input');

        if (!inputRef.current) return;

        inputRef.current.value = '';
        inputRef.current.dispatchEvent(new Event('input'));
        inputRef.current.focus();
      }, 500);
    },
  });

  return (
    <Grid
      container
      alignItems="center"
      alignContent="center"
      justifyContent="center"
      spacing={spacing}
      style={{
        color: 'var(--color-text)',
        height: `calc(100vh + ${spacing / 2}px)`,
        width: `calc(100% + ${spacing / 2}px)`,
      }}
    >
      <Grid item>
        <Logo color="white" />
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={11} sm={6} md={4} lg={3} xl={2}>
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
          <Grid item>
            <Typography withLetterSpacing component="h1" variant="title">
              Autenticación en dos factores
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              withLetterSpacing
              component="p"
              fontSize={13}
              style={{ textAlign: 'center' }}
            >
              Ingresa el código de 6 digitos generado en la aplicación.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} />
      <Grid item>
        <TwoFactorCode
          inputRef={inputRef}
          onSubmit={(code) => logInTwoFactor({ code })}
          setState={setState}
          state={state}
        />
      </Grid>
      <Grid item xs={12} />
      <Grid item>
        <Button
          color="error"
          onClick={logOut}
          size="small"
          startIcon={<LogoutIcon />}
          variant="text"
        >
          Cerrar sesión
        </Button>
      </Grid>
    </Grid>
  );
}
