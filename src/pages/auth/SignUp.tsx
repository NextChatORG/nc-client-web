import { CompleteTasksAnimationData } from '@nc-assets/lottie';
import {
  PASSWORD_FIELD_VALIDATIONS,
  USERNAME_FIELD_VALIDATIONS,
} from '@nc-core/constants/forms';
import { LOG_IN_ROUTE, TERMS_ROUTE } from '@nc-core/constants/routes';
import { useAuth } from '@nc-core/hooks';
import { SignUpVariables } from '@nc-core/interfaces/api';
import { AuthTemplate } from '@nc-ui';
import Lottie from 'lottie-react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export default function SignUp(): JSX.Element {
  const { clearErrors, control, handleSubmit, setError, setValue, watch } =
    useForm<SignUpVariables>();

  const { signUp } = useAuth({
    onSignUpErrors({ fields }) {
      setValue('confirmPassword', '');
      setValue('betaKey', '');

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
          validations: USERNAME_FIELD_VALIDATIONS,
        },
        {
          control,
          defaultValue: '',
          name: 'password',
          onChange: () => clearErrors('confirmPassword'),
          placeholder: 'Contraseña',
          required: true,
          type: 'password',
          validations: PASSWORD_FIELD_VALIDATIONS,
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
        {
          control,
          defaultValue: false,
          id: 'signup-terms',
          label: (
            <>
              Acepto los{' '}
              <Link className="underline" target="_blank" to={TERMS_ROUTE}>
                Términos y Condiciones
              </Link>
            </>
          ),
          name: 'terms',
          required: true,
          type: 'checkbox',
        },
      ]}
      figure={{
        caption:
          'Deberás recordar muy bien tu contraseña, solo podrás recuperarla con uno de los códigos que te daremos al finalizar el registro.',
        image: (
          <Lottie
            animationData={CompleteTasksAnimationData}
            className="-mb-4 sm:-mb-2 lg:-mb-4 xl:-mb-6 -mt-4 sm:-mt-2 lg:-mt-4 xl:-mt-6"
          />
        ),
      }}
      handleSubmit={handleSubmit(signUp)}
      navButtons={[
        {
          color: 'white',
          link: true,
          message: 'Inicia sesión',
          to: LOG_IN_ROUTE,
          variant: 'outlined',
        },
      ]}
      submitMessage="CONTINUAR"
      title="Registro"
    />
  );
}
