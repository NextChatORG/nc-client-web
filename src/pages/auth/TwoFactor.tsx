import { useAuth } from '@nc-core/hooks';
import { LogoutIcon } from '@nc-icons';
import { Button, Logo, TwoFactorCode, TwoFactorCodeStates } from '@nc-ui';
import clsx from 'clsx';
import { useRef, useState } from 'react';

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
    <div
      className={clsx(
        'flex flex-row flex-wrap content-center justify-center h-[100vh] w-full',
        'px-2 sm:px-5',
      )}
    >
      <Logo color="white" />
      <div className="basis-full" />
      <section
        className={clsx(
          'mt-4 flex flex-col items-center gap-[6px]',
          'basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3',
        )}
      >
        <h2 className="text-title tracking-wide">
          Autenticación en dos factores
        </h2>
        <p className="tracking-wide text-center text-[13px] leading-relaxed">
          Ingresa el código de 6 dígitos generado en la aplicación.
        </p>
      </section>
      <div className="basis-full" />
      <section className="mt-1">
        <TwoFactorCode
          inputRef={inputRef}
          onSubmit={(code) => logInTwoFactor({ code })}
          setState={setState}
          state={state}
        />
      </section>
      <div className="basis-full" />
      <section className="mt-4">
        <Button
          color="error"
          onClick={logOut}
          startIcon={<LogoutIcon />}
          variant="text"
        >
          Cerrar sesión
        </Button>
      </section>
    </div>
  );
}
