import { FieldValues } from 'react-hook-form';
import {
  Button,
  ButtonPropsWithMessage,
  Checkbox,
  CheckboxProps,
  Footer,
  Header,
  TextField,
  TextFieldProps,
} from '@nc-ui';
import clsx from 'clsx';

export interface AuthTemplateProps<TForm extends FieldValues> {
  fields: (
    | TextFieldProps<TForm>
    | (CheckboxProps<TForm> & { type: 'checkbox' })
  )[];
  figure: {
    caption: string;
    image: JSX.Element;
  };
  handleSubmit(): Promise<void>;
  navButtons: ButtonPropsWithMessage[];
  submitMessage: string;
  title: string;
}

export function AuthTemplate<TForm extends FieldValues>({
  fields,
  figure,
  handleSubmit,
  navButtons,
  submitMessage,
  title,
}: AuthTemplateProps<TForm>) {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Header auth={{ navButtons }} />
      <section
        className={clsx(
          'flex-1 flex flex-row flex-wrap items-center justify-evenly gap-3 lg:gap-5',
          'px-2 sm:px-5 pb-3 sm:pb-8 pt-2 sm:pt-3',
        )}
      >
        <form
          className="flex flex-col items-end gap-[16px] basis-full sm:basis-[40%] lg:basis-1/3 xl:basis-1/4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[36px] font-medium w-full">{title}</h2>
          {fields.map((props, i) => {
            const key = `authTemplate_text_field_${i}`;

            if (props.type === 'checkbox') {
              return (
                <Checkbox
                  {...props}
                  fullWidth
                  className="pl-[18px]"
                  key={key}
                  style={{ marginLeft: 16 }}
                />
              );
            }

            return <TextField {...props} fullWidth key={key} />;
          })}
          <Button
            color="success"
            onClick={handleSubmit}
            type="submit"
            variant="contained"
          >
            {submitMessage}
          </Button>
        </form>
        <figure className="flex flex-col items-center basis-full sm:basis-[40%]">
          {figure.image}
          <figcaption className="text-white/35 text-sm sm:text-lg lg:text-xl text-center">
            {figure.caption}
          </figcaption>
        </figure>
      </section>
      <Footer />
    </div>
  );
}
