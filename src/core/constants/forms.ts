export const PASSWORD_FIELD_VALIDATIONS = {
  maxLength: {
    message: 'La contraseña debe tener entre 8 y 40 caracteres',
    value: 40,
  },
  minLength: {
    message: 'La contraseña debe tener entre 8 y 40 caracteres',
    value: 8,
  },
  validate(value: string) {
    return !value.includes(' ') || 'La contraseña no puede contener espacios';
  },
};

export const USERNAME_FIELD_VALIDATIONS = {
  maxLength: {
    message: 'El nombre de usuario debe tener entre 4 y 15 caracteres',
    value: 15,
  },
  minLength: {
    message: 'El nombre de usuario debe tener entre 4 y 15 caracteres',
    value: 4,
  },
  pattern: {
    message: 'El nombre de usuario no es válido',
    value: /^[a-zA-Z0-9_]*$/,
  },
};
