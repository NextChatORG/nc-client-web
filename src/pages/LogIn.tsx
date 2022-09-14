import { LogInResponse, LogInVariables, LOGIN_MUTATION } from "@nc-core/api";
import { JWT_TOKEN } from "@nc-core/constants/local-storage";
import { UserContext } from "@nc-core/contexts";
import { useMutation } from "@nc-core/hooks";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthTemplate } from "../ui/templates";

export default function LogIn(): JSX.Element {
  const { control, handleSubmit } = useForm<LogInVariables>();
  const { dispatch } = useContext(UserContext);

  const [logIn] = useMutation<LogInResponse, LogInVariables>(LOGIN_MUTATION, {
    onCompleted({ logIn: { accessToken } }) {
      if (!dispatch) return;

      localStorage.setItem(JWT_TOKEN, accessToken);

      dispatch({ type: 'login', payload: { jwt: accessToken } });
    }
  });

  function onSubmit(variables: LogInVariables) {
    return logIn({ variables });
  }

  return (
    <AuthTemplate
      fields={[
        {
          control,
          defaultValue: '',
          name: 'username',
          placeholder: 'Nombre de usuario'
        },
        {
          control,
          defaultValue: '',
          name: 'password',
          placeholder: 'Contraseña',
          type: 'password'
        }
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
      handleSubmit={handleSubmit(onSubmit)}
      navButtons={[
        {
          link: true,
          message: 'Regístrate',
          to: '/signup',
          variant: 'outlined'
        }
      ]}
      submitMessage="INGRESAR"
      title="Inicia sesión"
    />
  );
}
