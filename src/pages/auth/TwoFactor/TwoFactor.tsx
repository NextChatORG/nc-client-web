import { LogInTwoFactorVariables } from '@nc-core/api';
import { useAuth } from '@nc-core/hooks';
import { capitalize } from '@nc-core/utils';
import { LogoutIcon } from '@nc-icons';
import { Button, Grid, Logo, Typography } from '@nc-ui';
import clsx from 'clsx';
import { CodeInput, getSegmentCssWidth } from 'rci';
import { useRef, useState } from 'react';
import { useIsFocused } from 'use-is-focused';
import classes from './TwoFactor.module.sass';

type CodeState = 'input' | 'loading' | 'error' | 'success';

const spacing = 20;
const inputSpacing = '10px';

export default function TwoFactor(): JSX.Element {
  const [state, setState] = useState<CodeState>('input');

  const inputRef = useRef<HTMLInputElement>(null);

  const width = getSegmentCssWidth(inputSpacing);
  const focused = useIsFocused(inputRef);

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

  function onSubmit(variables: LogInTwoFactorVariables) {
    return logInTwoFactor(variables);
  }

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
        <CodeInput
          autoComplete="one-time-code"
          className={clsx(
            classes.twoFactor__input,
            classes[`twoFactor__input--state${capitalize(state)}`],
            {
              [classes['twoFactor__input--focused']]: focused,
            },
          )}
          disabled={state === 'loading'}
          id="two-factor-code"
          inputMode="numeric"
          inputRef={inputRef}
          length={6}
          onChange={({ currentTarget: input }) => {
            input.value = input.value.replace(/\D+/g, '');

            if (input.value.length === 6) {
              setState('loading');
              onSubmit({ code: input.value });
            }
          }}
          padding={inputSpacing}
          pattern="[0-9]*"
          readOnly={state !== 'input'}
          renderSegment={({ state, index }) => (
            <div
              className={classes.twoFactor__input__segment}
              data-state={state}
              key={index}
              style={{ width, height: '100%' }}
            >
              <div />
            </div>
          )}
          spacing={inputSpacing}
          spellCheck={false}
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
