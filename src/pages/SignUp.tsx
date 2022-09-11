import { SignUpResponse, SignUpVariables, SIGNUP_MUTATION } from "@nc-core/api";
import { JWT_TOKEN } from "@nc-core/constants/local-storage";
import { UserContext } from "@nc-core/contexts";
import { useMutation } from "@nc-core/hooks";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthTemplate } from "../ui/templates";
import Lottie from 'lottie-react';
import CompleteTasksAnimationData from '@nc-assets/lottie/complete-tasks.json';

export default function SignUp() {
  const { control, handleSubmit } = useForm<SignUpVariables>();
  const { dispatch } = useContext(UserContext);

  const [signUp] = useMutation<SignUpResponse, SignUpVariables>(SIGNUP_MUTATION, {
    onCompleted({ signUp: { accessToken, recoveryCodes } }) {
      if (!dispatch) return;

      localStorage.setItem(JWT_TOKEN, accessToken);

      dispatch({ type: 'login', payload: { jwt: accessToken } });
    }
  });

  function onSubmit(variables: SignUpVariables) {
    return signUp({ variables });
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
        },
        {
          control,
          defaultValue: '',
          name: 'confirmPassword',
          placeholder: 'Confirma la contraseña',
          type: 'password'
        }
      ]}
      figure={{
        caption: 'Deberás recordar muy bien tu contraseña, solo podrás recuperarla con uno de los códigos que te daremos al finalizar el registro.',
        image: (
          <Lottie
            animationData={CompleteTasksAnimationData}
            style={{ width: '65%' }}
          />
        ),
      }}
      handleSubmit={handleSubmit(onSubmit)}
      navButtons={[
        {
          link: true,
          message: 'Inicia sesión',
          to: '/login',
          variant: 'outlined'
        }
      ]}
      submitMessage="CONTINUAR"
      title="Registro"
    />
  );
}
