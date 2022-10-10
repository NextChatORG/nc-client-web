import clsx from 'clsx';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import classes from './Checkbox.module.sass';

export interface CheckboxProps<TForm extends FieldValues> {
  control: Control<TForm>;
  defaultValue?: PathValue<TForm, Path<TForm>>;
  id: string;
  label: React.ReactNode;
  name: Path<TForm>;
  required?: boolean;
  style?: React.CSSProperties;
  validations?: Omit<ControllerProps<TForm, Path<TForm>>['rules'], 'required'>;
}

export function Checkbox<TForm extends FieldValues>({
  control,
  defaultValue,
  id,
  label,
  name,
  required = false,
  style,
  validations,
}: CheckboxProps<TForm>): JSX.Element {
  function handleCheckboxClick(
    onChange: (...event: unknown[]) => void,
    value: boolean,
  ): React.MouseEventHandler<HTMLButtonElement> {
    return function () {
      onChange(!value);
    };
  }

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{
        ...validations,
        required: { message: 'Campo requerido', value: required },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div
          className={clsx(classes.checkbox, {
            [classes['checkbox--error']]: Boolean(error?.message),
          })}
          id={id}
          style={style}
        >
          <input
            readOnly
            checked={value}
            className={classes.checkbox__input}
            id={`${id}-input`}
            type="checkbox"
          />
          <button
            className={classes.checkbox__check}
            onClick={handleCheckboxClick(onChange, value)}
            type="button"
          >
            ✔
          </button>
          <div className={classes.checkbox__text}>
            <label
              className={classes.checkbox__text__label}
              htmlFor={`${id}-input`}
            >
              {label}
            </label>
            {required && (
              <span className={classes.checkbox__text__required}>*</span>
            )}
          </div>
        </div>
      )}
    />
  );
}
