import { FieldValues } from "react-hook-form";
import { NCButton, NCTextField, NCTextFieldProps } from "../../atoms";
import { NCFooter, NCHeader, NCHeaderProps } from "../../organisms";
import classes from './AuthTemplate.module.sass';

export interface AuthTemplateProps<TForm extends FieldValues> {
  fields: NCTextFieldProps<TForm>[];
  figure: {
    caption: string;
    image: JSX.Element;
  };
  handleSubmit(): Promise<void>;
  navButtons: NCHeaderProps['navButtons'];
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
      <NCHeader navButtons={navButtons} />
      <section className={classes.authTemplate__section}>
        <form className={classes.authTemplate__section__form} onSubmit={handleSubmit}>
          <h2>{title}</h2>
          {fields.map((props, i) => (
            <NCTextField {...props} key={`authTemplate_text_field_${i}`} />
          ))}
          <NCButton
            color="success"
            onClick={handleSubmit}
            type="submit"
            variant="contained"
          >
            {submitMessage}
          </NCButton>
        </form>
        <figure className={classes.authTemplate__section__figure}>
          {figure.image}
          <figcaption>{figure.caption}</figcaption>
        </figure>
      </section>
      <NCFooter />
    </div>
  );
}
