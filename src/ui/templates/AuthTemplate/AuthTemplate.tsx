import { FieldValues } from 'react-hook-form';
import {
  Button,
  Grid,
  GridSizeProps,
  TextField,
  TextFieldProps,
} from '../../atoms';
import { Footer, Header, HeaderProps } from '../../organisms';
import classes from './AuthTemplate.module.sass';

export interface AuthTemplateProps<TForm extends FieldValues> {
  fields: TextFieldProps<TForm>[];
  figure: {
    caption: string;
    image: JSX.Element;
    xs?: GridSizeProps;
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
  title,
}: AuthTemplateProps<TForm>) {
  return (
    <div className={classes.authTemplate}>
      <Header navButtons={navButtons} />
      <Grid
        container
        alignItems="center"
        justifyContent="space-evenly"
        style={{ padding: '36px 60px 72px 60px' }}
      >
        <Grid item xs={3}>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={16}>
              <Grid item>
                <h2 className={classes.authTemplate__title}>{title}</h2>
              </Grid>
              <Grid item xs={12}>
                <Grid container direction="column" spacing={16}>
                  {fields.map((props, i) => (
                    <Grid item key={`authTemplate_text_field_${i}`} xs={12}>
                      <TextField {...props} fullWidth />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="flex-end">
                  <Button
                    color="success"
                    onClick={handleSubmit}
                    type="submit"
                    variant="contained"
                  >
                    {submitMessage}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={4}>
          <Grid container alignItems="center" direction="column">
            <Grid item xs={figure.xs}>
              {figure.image}
            </Grid>
            <Grid item className={classes.authTemplate__figureCaption}>
              {figure.caption}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
