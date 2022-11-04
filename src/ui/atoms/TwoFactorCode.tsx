import clsx from 'clsx';
import { CodeInput, getSegmentCssWidth } from 'rci';
import { useIsFocused } from 'use-is-focused';

export type TwoFactorCodeStates = 'input' | 'loading' | 'error' | 'success';

export const TWO_FACTOR_CODE_INPUT_SPACING = '10px';

export interface TwoFactorCodeProps {
  inputRef: React.RefObject<HTMLInputElement>;
  state: TwoFactorCodeStates;
  onSubmit(code: string): void;
  setState: React.Dispatch<React.SetStateAction<TwoFactorCodeStates>>;
}

const GENERAL_SEGMENT_STATE: { [key in TwoFactorCodeStates]: string } = {
  input: 'text-white/50',
  loading: 'animate-pulseBorder',
  error: 'text-red-500',
  success: 'text-green-500',
};

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
      className={clsx({
        'animate-shake': state === 'error',
      })}
      disabled={state === 'loading'}
      id="two-factor-code"
      inputClassName="caret-transparent selection:bg-transparent"
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
      renderSegment={({ state: segmentState, index }) => (
        <div
          className={clsx(
            'flex appearance-none bg-transparent rounded-md border-2 border-current h-full',
            GENERAL_SEGMENT_STATE[state],
            {
              '!text-primary': focused && segmentState === 'cursor',
              [clsx(
                'outline-solid-transparent',
                'shadow-[rgb(255,_255,_255)_0px_0px_0px_0px,_currentColor_0px_0px_0px_1px,_rgba(0,_0,_0,_0)_0px_0px_0px_0px]',
              )]:
                (focused &&
                  (segmentState === 'cursor' || segmentState === 'selected')) ||
                state === 'error' ||
                state === 'success',
            },
          )}
          data-state={segmentState}
          key={index}
          style={{ width }}
        >
          <div
            className={clsx('bg-current', {
              'flex-1 rounded-[2px] m-[3px] opacity-[0.15625]':
                (focused && segmentState === 'selected') ||
                state === 'error' ||
                state === 'success',
              'animate-blinkCaret rounded-full justify-self-center flex-[0_0_2px] mx-auto my-[8px] w-[2px]':
                focused && segmentState === 'cursor',
            })}
          />
        </div>
      )}
      spacing={TWO_FACTOR_CODE_INPUT_SPACING}
      spellCheck={false}
    />
  );
}
