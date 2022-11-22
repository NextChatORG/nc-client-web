import {
  FriendsAnimationData,
  LockAnimationData,
  UsingKeyToUnlockAnimationData,
} from '@nc-assets/lottie';
import {
  BETA_ROUTE,
  LOG_IN_ROUTE,
  PRIVACY_POLICY_ROUTE,
  SIGN_UP_ROUTE,
} from '@nc-core/constants/routes';
import { OpenInNewIcon } from '@nc-icons';
import { Button, Footer, Header, LandingFeature } from '@nc-ui';
import clsx from 'clsx';
import Lottie from 'lottie-react';

export default function LandingView(): JSX.Element {
  return (
    <>
      <section
        className={clsx(
          'relative bg-primary sm:rounded-bl-[50%_20%] sm:rounded-br-[50%_20%]',
          'h-[450px] sm:h-[520px] xl:h-[550px]',
          'mb-[22%] sm:mb-[23%] lg:mb-[27%] xl:mb-[20.5%]',
        )}
      >
        <Header
          auth={{
            navButtons: [
              {
                color: 'white',
                link: true,
                message: 'Inicia sesión',
                to: LOG_IN_ROUTE,
                variant: 'text',
              },
              {
                color: 'white',
                link: true,
                message: 'Regístrate',
                to: SIGN_UP_ROUTE,
                variant: 'outlined',
              },
            ],
          }}
        />
        <div
          className={clsx(
            'relative flex flex-col items-center justify-center gap-2 px-2 z-[2]',
            'mt-1 sm:mt-2',
          )}
        >
          <p
            className={clsx(
              'text-[20px] text-center font-medium',
              'sm:text-[30px] sm:max-w-[60%] lg:max-w-[40%]',
              'xl:text-[32px] xl:max-w-[40%]',
            )}
          >
            ¡Conecta con otras personas alrededor del mundo!
          </p>
          <Button
            external
            link
            color="white"
            startIcon={<OpenInNewIcon />}
            to={BETA_ROUTE}
            variant="outlined"
          >
            Conoce el programa Beta
          </Button>
        </div>
        <div
          className={clsx(
            'absolute w-full flex items-center justify-center z-[2]',
            'mt-4 lg:mt-6',
          )}
        >
          <img
            alt="NextChat Desktop preview"
            className="rounded-xl shadow-md shadow-black/75 w-[90%] sm:w-[85%] lg:w-[80%] xl:w-[60%]"
            src="/images/screenshots/chat_desktop_screenshot.jpeg"
          />
        </div>
      </section>
      <section className="flex flex-col items-center gap-6 px-2 sm:px-4 pb-6">
        <LandingFeature
          action={{
            color: 'white',
            external: true,
            link: true,
            message: 'Políticas de Privacidad',
            startIcon: <OpenInNewIcon />,
            to: PRIVACY_POLICY_ROUTE,
            variant: 'outlined',
          }}
          description="Tus mensajes son alojados en nuestros servidores con el sistema criptográfico EdDSA para brindarte la seguridad de que tus mensajes no serán leídos por ningún integrante de nuestro equipo."
          icon={<Lottie animationData={LockAnimationData} />}
          title="Protegemos tus datos"
        />
        <LandingFeature
          description="¿Conoces personas con pasiones similares a las tuyas? ¿Por qué no hacer una sala para compartir con esas personas? En ellas podrás crear diferentes canales con temáticas distintas para interactuar."
          icon={<Lottie animationData={FriendsAnimationData} />}
          position="right"
          title="Crea salas"
        />
        <LandingFeature
          action={{
            color: 'white',
            external: true,
            link: true,
            message: 'Conoce más',
            startIcon: <OpenInNewIcon />,
            to: BETA_ROUTE,
            variant: 'outlined',
          }}
          description="¡Sé una de las personas elegidas para probar la aplicación! Solo debes hacer click en el botón de abajo para conocer más información."
          icon={<Lottie animationData={UsingKeyToUnlockAnimationData} />}
          title="Beta"
        />
      </section>
      <Footer
        actionButton={{
          color: 'white',
          link: true,
          message: 'Regístrate',
          to: SIGN_UP_ROUTE,
          variant: 'outlined',
        }}
      />
    </>
  );
}
