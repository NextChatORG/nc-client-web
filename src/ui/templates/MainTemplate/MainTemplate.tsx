import { Grid } from '../../atoms';
import { Sidebar } from '../../organisms';
import classes from './MainTemplate.module.sass';

export interface MainTemplateProps {
  title?: string;
}

export function MainTemplate({
  children,
}: React.PropsWithChildren<MainTemplateProps>): JSX.Element {
  return (
    <div className={classes.main}>
      <Grid container>
        <Sidebar />
        <Grid item xs="auto">
          <div className={classes.main__content}>
            <Grid container alignContent="flex-start" spacing={24}>
              {children}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
