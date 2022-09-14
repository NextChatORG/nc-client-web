import clsx from "clsx";
import React, { HTMLInputTypeAttribute, useRef, useState } from "react";
import { Control, Controller, ControllerProps, FieldValues, Path, PathValue } from "react-hook-form";
import { VisibilityIcon, VisibilityOffIcon } from "../../../icons/mui";
import { NCButton } from "../NCButton";
import classes from './NCTextField.module.sass';

export interface NCTextFieldProps<TForm extends FieldValues> {
  control: Control<TForm>;
  defaultValue?: PathValue<TForm, Path<TForm>>;
  helperText?: string;
  name: Path<TForm>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  type?: 'email' | 'password' | 'text';
  validations?: Omit<ControllerProps<TForm, Path<TForm>>['rules'], 'required'>
  variant?: 'outlined';
}

export function NCTextField<TForm extends FieldValues>({
  control,
  defaultValue,
  helperText,
  name,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  validations,
  variant = 'outlined'
}: NCTextFieldProps<TForm>): JSX.Element {
  const [endAdormentRef, setEndAdormentRef] = useState<HTMLDivElement | null>(null);
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);
  const [focused, setFocused] = useState<boolean>(false);

  function handleToggleVisibility() {
    setInputType(inputType === 'text' ? 'password' : 'text');
  }

  const hasEndAdorment = type === 'password';
  const id = `${type}-input-${name}`;

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      rules={{
        ...validations,
        required: { message: 'Campo requerido', value: required },
      }}
      render={({ field, fieldState: { error } }) => {
        function handleOnBlur() {
          if (focused) setFocused(false);
          field.onBlur();
        }

        function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
          field.onChange(e);
          if (onChange) onChange(e);
        }

        function handleOnFocus() {
          if(!focused) setFocused(true);
        }

        const hasError = Boolean(error);
        const withHelperText = error?.message ?? helperText;

        return (
          <div
            className={clsx(classes.ncTextField, {
              [classes['ncTextField--error']]: hasError,
            })}
          >
            <div
              className={clsx(classes.ncTextField__field, {
                [classes['ncTextField__field--outlined']]: variant === 'outlined',
                [classes['ncTextField__field--focused']]: focused
              })}
              id={id}
            >
              <input
                className={clsx(classes.ncTextField__field__input, {
                  [classes['ncTextField__field__input--withEnd']]: hasEndAdorment,
                })}
                id={`${id}-field`}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                placeholder={placeholder}
                style={{
                  width: `calc(100% - ${endAdormentRef?.offsetWidth ?? 0}px - 16px)`
                }}
                type={inputType}
                value={field.value}
              />
              {hasEndAdorment && (
                <div
                  className={classes.ncTextField__field__endAdorment}
                  id={`${id}-end-adorment`}
                  ref={setEndAdormentRef}
                >
                  {type === 'password' && (
                    <NCButton color="default" onClick={handleToggleVisibility} variant="input-icon">
                      {inputType === 'text' ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </NCButton>
                  )}
                </div>
              )}
            </div>
            {withHelperText && (
              <span
                className={classes.ncTextField__helperText}
                id={`${id}-helper-text`}
              >
                {withHelperText}
              </span>
            )}
          </div>
        );
      }}
    />
  );
}
