import { LogInVariables } from '@nc-core/api';
import { useUser } from '@nc-core/hooks';
import { useForm } from 'react-hook-form';
import { AuthTemplate } from '../ui/templates';

export default function LogIn(): JSX.Element {
  const { control, handleSubmit } = useForm<LogInVariables>();
  const { logIn } = useUser();

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
          to: '/signup',
          variant: 'outlined',
        },
      ]}
      submitMessage="INGRESAR"
      title="Inicia sesión"
    />
  );
}
