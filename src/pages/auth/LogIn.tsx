import {
  RECOVER_ACCOUNT_ROUTE,
  SIGN_UP_ROUTE,
} from '@nc-core/constants/routes';
import { useAuth } from '@nc-core/hooks';
import { LogInVariables } from '@nc-core/interfaces/api';
import { AuthTemplate } from '@nc-ui';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function LogIn(): JSX.Element {
  const { control, handleSubmit } = useForm<LogInVariables>();
  const { logIn } = useAuth();

  return (
    <AuthTemplate
      fields={[
        {
          control,
          defaultValue: '',
          name: 'username',
          placeholder: 'Nombre de usuario',
          required: true,
        },
        {
          control,
          defaultValue: '',
          helperText: (
            <Link to={RECOVER_ACCOUNT_ROUTE}>¿Olvidaste tu contraseña?</Link>
          ),
          name: 'password',
          placeholder: 'Contraseña',
          required: true,
          type: 'password',
        },
      ]}
      figure={{
        caption: '¡Conecta con otras personas alrededor del mundo!',
        image: (
          <img
            alt="Planeta con las 4 estaciones (Primavera, verano, otoño, invierno) y un océano en un fondo estrellado con una luna menguante"
            src="/images/planet.png"
            style={{ marginBottom: 32 }}
          />
        ),
      }}
      handleSubmit={handleSubmit(logIn)}
      navButtons={[
        {
          color: 'white',
          link: true,
          message: 'Regístrate',
          to: SIGN_UP_ROUTE,
          variant: 'outlined',
        },
      ]}
      submitMessage="INGRESAR"
      title="Inicia sesión"
    />
  );
}
