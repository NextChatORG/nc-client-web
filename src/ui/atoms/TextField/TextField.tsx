import clsx from 'clsx';
import { HTMLInputTypeAttribute, useState } from 'react';
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form';
import {
  CloseIcon,
  SearchIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from '@nc-icons';
import { Button } from '../Button';
import classes from './TextField.module.sass';

interface CommonTextFieldProps<TForm extends FieldValues> {
  control: Control<TForm>;
  defaultValue?: PathValue<TForm, Path<TForm>>;
  endAdorment?: React.ReactNode;
  fullWidth?: boolean;
  helperText?: string;
  name: Path<TForm>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  startAdorment?: React.ReactNode;
  validations?: Omit<ControllerProps<TForm, Path<TForm>>['rules'], 'required'>;
  variant?: 'contained' | 'outlined';
}

interface OtherTextFieldProps<TForm extends FieldValues>
  extends CommonTextFieldProps<TForm> {
  type?: 'email' | 'password' | 'text';
}

interface SearchTextFieldProps<TForm extends FieldValues>
  extends CommonTextFieldProps<TForm> {
  type: 'search';
  onSearchClick: React.MouseEventHandler<HTMLButtonElement>;
}

export type TextFieldProps<TForm extends FieldValues> =
  | OtherTextFieldProps<TForm>
  | SearchTextFieldProps<TForm>;

export function TextField<TForm extends FieldValues>({
  control,
  defaultValue,
  endAdorment,
  fullWidth,
  helperText,
  name,
  onChange,
  placeholder,
  required = false,
  startAdorment,
  validations,
  variant = 'outlined',
  ...props
}: TextFieldProps<TForm>): JSX.Element {
  const [startAdormentRef, setStartAdormentRef] =
    useState<HTMLDivElement | null>(null);
  const [endAdormentRef, setEndAdormentRef] = useState<HTMLDivElement | null>(
    null,
  );
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(
    props.type ?? 'text',
  );
  const [focused, setFocused] = useState<boolean>(false);

  function handleToggleVisibility() {
    setInputType(inputType === 'text' ? 'password' : 'text');
  }

  const hasStartAdorment = props.type === 'search' || Boolean(startAdorment);

  const id = `${props.type ?? 'text'}-input-${name}`;

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
          props.type === 'password' ||
          (props.type === 'search' && Boolean(field.value.length)) ||
          Boolean(endAdorment);

        const hasError = Boolean(error);
        const withHelperText = error?.message ?? helperText;

        return (
          <div
            className={clsx(classes.textField, {
              [classes['textField--fullWidth']]: fullWidth,
              [classes['textField--error']]: hasError,
            })}
          >
            <div
              className={clsx(classes.textField__field, {
                [classes['textField__field--contained']]:
                  variant === 'contained',
                [classes['textField__field--outlined']]: variant === 'outlined',
                [classes['textField__field--focused']]: focused,
              })}
              id={id}
            >
              {hasStartAdorment && (
                <div
                  className={classes.textField__field__startAdorment}
                  id={`${id}-start-adorment`}
                  ref={setStartAdormentRef}
                >
                  {props.type === 'search' ? (
                    <Button
                      color="default"
                      onClick={props.onSearchClick}
                      variant="input-icon"
                    >
                      <SearchIcon />
                    </Button>
                  ) : (
                    startAdorment
                  )}
                </div>
              )}
              <input
                className={clsx(classes.textField__field__input, {
                  [classes['textField__field__input--withBoth']]:
                    hasStartAdorment && hasEndAdorment,
                  [classes['textField__field__input--withStart']]:
                    hasStartAdorment && !hasEndAdorment,
                  [classes['textField__field__input--withEnd']]:
                    hasEndAdorment && !hasStartAdorment,
                })}
                id={`${id}-field`}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                placeholder={placeholder}
                style={{
                  width: `calc(100% - ${
                    startAdormentRef?.offsetWidth ?? 0
                  }px - ${endAdormentRef?.offsetWidth ?? 0}px - 16px)`,
                }}
                type={inputType}
                value={field.value}
              />
              {hasEndAdorment && (
                <div
                  className={classes.textField__field__endAdorment}
                  id={`${id}-end-adorment`}
                  ref={setEndAdormentRef}
                >
                  {props.type === 'password' ? (
                    <Button
                      color="default"
                      onClick={handleToggleVisibility}
                      variant="input-icon"
                    >
                      {inputType === 'text' ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Button>
                  ) : props.type === 'search' ? (
                    <Button
                      color="default"
                      onClick={handleClearValue}
                      variant="input-icon"
                    >
                      <CloseIcon />
                    </Button>
                  ) : (
                    endAdorment
                  )}
                </div>
              )}
            </div>
            {withHelperText && (
              <span
                className={classes.textField__helperText}
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
