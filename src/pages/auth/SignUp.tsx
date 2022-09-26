import { CompleteTasksAnimationData } from '@nc-assets/lottie';
import { SignUpVariables } from '@nc-core/api';
import { useAuth } from '@nc-core/hooks';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import { AuthTemplate } from '../../ui/templates';

export default function SignUp(): JSX.Element {
  const { clearErrors, control, handleSubmit, setError, watch } =
    useForm<SignUpVariables>();

  const { signUp } = useAuth({
    onSignUpErrors({ fields }) {
      if (fields.length > 0) {
        for (const { field, message } of fields) {
          setError(field as keyof SignUpVariables, { message });
        }
      }
    },
  });

  const password = watch('password');

  return (
    <AuthTemplate
      fields={[
        {
          control,
          defaultValue: '',
          name: 'username',
          placeholder: 'Nombre de usuario',
          required: true,
          validations: {
            maxLength: {
              message:
                'El nombre de usuario debe tener entre 4 y 15 caracteres',
              value: 15,
            },
            minLength: {
              message:
                'El nombre de usuario debe tener entre 4 y 15 caracteres',
              value: 4,
            },
            pattern: {
              message: 'El nombre de usuario no es válido',
              value: /^[a-zA-Z0-9_]*$/,
            },
          },
        },
        {
          control,
          defaultValue: '',
          name: 'password',
          onChange: () => clearErrors('confirmPassword'),
          placeholder: 'Contraseña',
          required: true,
          type: 'password',
          validations: {
            maxLength: {
              message: 'La contraseña debe tener entre 8 y 40 caracteres',
              value: 40,
            },
            minLength: {
              message: 'La contraseña debe tener entre 8 y 40 caracteres',
              value: 8,
            },
            validate(value: string) {
              return (
                !value.includes(' ') ||
                'La contraseña no puede contener espacios'
              );
            },
          },
        },
        {
          control,
          defaultValue: '',
          name: 'confirmPassword',
          placeholder: 'Confirma la contraseña',
          required: true,
          type: 'password',
          validations: {
            validate(value: string) {
              return password === value || 'Las contraseñas no coinciden';
            },
          },
        },
        {
          control,
          defaultValue: '',
          name: 'betaKey',
          placeholder: 'Código beta',
          required: true,
          type: 'password',
        },
      ]}
      figure={{
        caption:
          'Deberás recordar muy bien tu contraseña, solo podrás recuperarla con uno de los códigos que te daremos al finalizar el registro.',
        image: <Lottie animationData={CompleteTasksAnimationData} />,
        xs: 8,
      }}
      handleSubmit={handleSubmit(signUp)}
      navButtons={[
        {
          color: 'white',
          link: true,
          message: 'Inicia sesión',
          to: '/login',
          variant: 'outlined',
        },
      ]}
      submitMessage="CONTINUAR"
      title="Registro"
    />
  );
}
