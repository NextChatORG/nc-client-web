import { FieldValues } from "react-hook-form";
import { Button, TextField, TextFieldProps } from "../../atoms";
import { Footer, Header, HeaderProps } from "../../organisms";
import classes from './AuthTemplate.module.sass';

export interface AuthTemplateProps<TForm extends FieldValues> {
  fields: TextFieldProps<TForm>[];
  figure: {
    caption: string;
    image: JSX.Element;
  };
  handleSubmit(): Promise<void>;
  navButtons: HeaderProps['navButtons'];
  submitMessage: string;
  title: string;
}

export function AuthTemplate<TForm extends FieldValues>({
  fields,
  figure,
  handleSubmit,
  navButtons,
  submitMessage,
  title
}: AuthTemplateProps<TForm>) {
  return (
    <div className={classes.authTemplate}>
      <Header navButtons={navButtons} />
      <section className={classes.authTemplate__section}>
        <form className={classes.authTemplate__section__form} onSubmit={handleSubmit}>
          <h2>{title}</h2>
          {fields.map((props, i) => (
            <TextField {...props} key={`authTemplate_text_field_${i}`} />
          ))}
          <Button
            color="success"
            onClick={handleSubmit}
            type="submit"
            variant="contained"
          >
            {submitMessage}
          </Button>
        </form>
        <figure className={classes.authTemplate__section__figure}>
          {figure.image}
          <figcaption>{figure.caption}</figcaption>
        </figure>
      </section>
      <Footer />
    </div>
  );
}
