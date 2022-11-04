import clsx from 'clsx';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

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
        <div className="flex items-center gap-[8px]" id={id} style={style}>
          <input
            readOnly
            checked={value}
            className="checkbox__input hidden"
            id={`${id}-input`}
            type="checkbox"
          />
          <button
            className="checkbox__input__check transition-colors bg-white leading-[0.5] rounded-[6px] cursor-pointer h-[20px] w-[20px]"
            onClick={handleCheckboxClick(onChange, value)}
            type="button"
          >
            ✔
          </button>
          <div
            className={clsx('flex items-center gap-[0.05em]', {
              'text-red-500': Boolean(error),
            })}
          >
            <label
              className="text-[13px] leading-[0.05em]"
              htmlFor={`${id}-input`}
            >
              {label}
            </label>
            {required && <span>*</span>}
          </div>
        </div>
      )}
    />
  );
}
