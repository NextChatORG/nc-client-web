import { LockAnimationData } from '@nc-assets/lottie';
import { RECOVER_ACCOUNT_MUTATION } from '@nc-core/api';
import { AuthContext } from '@nc-core/contexts';
import { useMutation } from '@nc-core/hooks';
import {
  RecoverAccountResponse,
  RecoverAccountVariables,
} from '@nc-core/interfaces/api';
import { AuthTemplate } from '@nc-ui';
import Lottie from 'lottie-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function RecoverAccount(): JSX.Element {
  const { control, handleSubmit } = useForm<RecoverAccountVariables>();
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [recoverAccount] = useMutation<
    RecoverAccountResponse,
    RecoverAccountVariables
  >(RECOVER_ACCOUNT_MUTATION, {
    onCompleted({ recoverAccount }) {
      if (!recoverAccount || !dispatch) return;

      dispatch({ type: 'recover-account', payload: recoverAccount });
      navigate('/', { replace: true });
    },
  });

  function onSubmit(variables: RecoverAccountVariables) {
    return recoverAccount({ variables });
  }

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
          name: 'code',
          placeholder: 'Código de recuperación',
          required: true,
        },
        {
          control,
          defaultValue: '',
          name: 'password',
          placeholder: 'Nueva contraseña',
          required: true,
        },
        {
          control,
          defaultValue: '',
          name: 'confirmPassword',
          placeholder: 'Confirmar nueva contraseña',
          required: true,
        },
      ]}
      figure={{
        caption:
          'La seguridad de tu cuenta es nuestra prioridad; por eso, te recomendamos guardar los códigos de recuperación en un lugar seguro y evita compartirlos con alguien.',
        image: <Lottie animationData={LockAnimationData} />,
      }}
      handleSubmit={handleSubmit(onSubmit)}
      navButtons={[
        {
          color: 'white',
          link: true,
          message: 'Inicia sesión',
          to: '/login',
          variant: 'text',
        },
        {
          color: 'white',
          link: true,
          message: 'Regístrate',
          to: '/signup',
          variant: 'outlined',
        },
      ]}
      submitMessage="VALIDAR"
      title="Recupera tu cuenta"
    />
  );
}
