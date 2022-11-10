import {
  CloseIcon,
  SearchIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from '@nc-icons';
import { Button } from '@nc-ui';
import clsx from 'clsx';
import React, { HTMLInputTypeAttribute, useState } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';

export interface TextFieldProps<TForm extends FieldValues> {
  control: Control<TForm>;
  defaultValue?: PathValue<TForm, Path<TForm>>;
  disabled?: boolean;
  endAdorment?: React.ReactNode;
  fullWidth?: boolean;
  helperText?: React.ReactNode;
  label?: string;
  name: Path<TForm>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  startAdorment?: React.ReactNode;
  type?: 'email' | 'password' | 'search' | 'text';
  validations?: Omit<ControllerProps<TForm, Path<TForm>>['rules'], 'required'>;
  variant?: 'contained' | 'outlined';
}

export function TextField<TForm extends FieldValues>({
  control,
  defaultValue,
  disabled = false,
  endAdorment,
  fullWidth,
  helperText,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  startAdorment,
  type = 'text',
  validations,
  variant = 'outlined',
}: TextFieldProps<TForm>): JSX.Element {
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);
  const [focused, setFocused] = useState<boolean>(false);

  function handleToggleVisibility() {
    setInputType(inputType === 'text' ? 'password' : 'text');
  }

  const hasStartAdorment = type === 'search' || Boolean(startAdorment);
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
          if (!focused) setFocused(true);
        }

        function handleClearValue() {
          field.onChange('');
        }

        const hasEndAdorment =
          type === 'password' ||
          (type === 'search' && Boolean(field.value.length)) ||
          Boolean(endAdorment);

        const hasError = Boolean(error);
        const withHelperText = error?.message ?? helperText;

        return (
          <div
            className={clsx({
              'w-full': fullWidth,
            })}
            id={id}
          >
            {label && (
              <p className="ml-2 mb-[6px] text-body font-medium tracking-wide">
                {label}
              </p>
            )}
            <section
              className={clsx('flex items-center', {
                [clsx(
                  'rounded-full border-[1px] border-white/12 hover:border-white/25',
                  {
                    'hover:border-white/12': disabled,
                    '!border-red-500': hasError,
                    '!border-primary': focused && !hasError,
                  },
                )]: variant === 'outlined',
                [clsx(
                  'rounded-[26px] bg-black/30 border-1 border-black/50 hover:border-black',
                  {
                    '!border-red-500': hasError,
                    '!border-primary': focused && !hasError,
                  },
                )]: variant === 'contained',
              })}
            >
              {hasStartAdorment && (
                <div className="pl-[6px]" id={`${id}-start-adorment`}>
                  {type === 'search' ? (
                    <div className="leading-[0.5] p-[0.5em]">
                      <SearchIcon />
                    </div>
                  ) : (
                    startAdorment
                  )}
                </div>
              )}
              <input
                autoComplete="off"
                className={clsx(
                  'flex-1 bg-transparent outline-0 w-full rounded-full p-[16px]',
                  {
                    'pl-[6px]': hasStartAdorment,
                    'pr-[6px]': hasEndAdorment,
                    'cursor-not-allowed': disabled,
                  },
                )}
                disabled={disabled}
                id={`${id}-field`}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                placeholder={placeholder}
                type={inputType}
                value={field.value}
              />
              {hasEndAdorment && (
                <div className="pr-[6px]" id={`${id}-end-adorment`}>
                  {type === 'password' ? (
                    <Button
                      color={hasError ? 'error' : 'white'}
                      disabled={disabled}
                      onClick={handleToggleVisibility}
                      variant="icon"
                    >
                      {inputType === 'text' ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Button>
                  ) : type === 'search' ? (
                    <Button
                      color={hasError ? 'error' : 'white'}
                      disabled={disabled}
                      onClick={handleClearValue}
                      variant="icon"
                    >
                      <CloseIcon />
                    </Button>
                  ) : (
                    endAdorment
                  )}
                </div>
              )}
            </section>
            {withHelperText && (
              <span
                className={clsx('ml-2 mt-[4px] text-[12px]', {
                  'text-red-500': hasError,
                })}
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
