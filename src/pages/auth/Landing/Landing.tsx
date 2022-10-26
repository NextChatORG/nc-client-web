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
import Lottie from 'lottie-react';
import classes from './Landing.module.sass';

export default function LandingView(): JSX.Element {
  return (
    <div className={classes.landing}>
      <section className={classes.landing__firstSection}>
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
        <div className={classes.landing__firstSection__content}>
          <p>¡Conecta con otras personas alrededor del mundo!</p>
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
        <div className={classes.landing__firstSection__previews}>
          <div className={classes.landing__firstSection__previews__desktop} />
        </div>
      </section>
      <section className={classes.landing__secondSection}>
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
    </div>
  );
}
