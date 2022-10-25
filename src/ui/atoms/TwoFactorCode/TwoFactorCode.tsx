import { capitalize } from '@nc-core/utils';
import clsx from 'clsx';
import { CodeInput, getSegmentCssWidth } from 'rci';
import { useIsFocused } from 'use-is-focused';
import classes from './TwoFactorCode.module.sass';

export type TwoFactorCodeStates = 'input' | 'loading' | 'error' | 'success';

export const TWO_FACTOR_CODE_INPUT_SPACING = '10px';

export interface TwoFactorCodeProps {
  inputRef: React.RefObject<HTMLInputElement>;
  state: TwoFactorCodeStates;
  onSubmit(code: string): void;
  setState: React.Dispatch<React.SetStateAction<TwoFactorCodeStates>>;
}

export function TwoFactorCode({
  inputRef,
  onSubmit,
  setState,
  state,
}: TwoFactorCodeProps): JSX.Element {
  const width = getSegmentCssWidth(TWO_FACTOR_CODE_INPUT_SPACING);
  const focused = useIsFocused(inputRef);

  return (
    <CodeInput
      autoComplete="one-time-code"
      className={clsx(
        classes.twoFactor__input,
        classes[`twoFactor__input--state${capitalize(state)}`],
        {
          [classes['twoFactor__input--focused']]: focused,
        },
      )}
      disabled={state === 'loading'}
      id="two-factor-code"
      inputMode="numeric"
      inputRef={inputRef}
      length={6}
      onChange={({ currentTarget: input }) => {
        input.value = input.value.replace(/\D+/g, '');

        if (input.value.length === 6) {
          setState('loading');
          onSubmit(input.value);
        }
      }}
      padding={TWO_FACTOR_CODE_INPUT_SPACING}
      pattern="[0-9]*"
      readOnly={state !== 'input'}
      renderSegment={({ state, index }) => (
        <div
          className={classes.twoFactor__input__segment}
          data-state={state}
          key={index}
          style={{ width, height: '100%' }}
        >
          <div />
        </div>
      )}
      spacing={TWO_FACTOR_CODE_INPUT_SPACING}
      spellCheck={false}
    />
  );
}
