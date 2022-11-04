import { useAuth } from '@nc-core/hooks';
import { Button, Logo } from '@nc-ui';
import clsx from 'clsx';

export default function RecoveryCodes(): JSX.Element {
  const { clearRecoveryCodes, data, recoveryCodes } = useAuth();

  function handleDownloadClick() {
    const el = document.createElement('a');

    el.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
      recoveryCodes.join('\r\n'),
    )}`;

    el.download = `${data?.username}_nextchat_recovery_codes.txt`;
    el.style.display = 'none';

    document.body.appendChild(el);

    el.click();
    el.remove();
  }

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
        <h2 className="text-title tracking-wide">Códigos de recuperación</h2>
        <p className="tracking-wide text-center text-[13px] leading-relaxed">
          Guarda muy bien estos códigos, te servirán para recuperar tu cuenta en
          caso de que olvides la contraseña.
        </p>
      </section>
      <div className="basis-full" />
      <section className="mt-2 basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3 flex flex-col gap-[6px]">
        {recoveryCodes.map((code, i) => (
          <div
            className="bg-black/30 text-center tracking-wider w-full py-1 rounded-full"
            key={`recovery_code_${i}`}
          >
            {code}
          </div>
        ))}
      </section>
      <div className="basis-full" />
      <section className="mt-2 basis-full sm:basis-2/3 lg:basis-1/2 xl:basis-1/3 flex gap-1">
        <Button fullWidth color="success" onClick={handleDownloadClick}>
          Descargar
        </Button>
        <Button
          fullWidth
          color="white"
          onClick={clearRecoveryCodes}
          variant="outlined"
        >
          Continuar
        </Button>
      </section>
    </div>
  );
}
