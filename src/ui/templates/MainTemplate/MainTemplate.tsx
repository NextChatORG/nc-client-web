import { useAuth } from '@nc-core/hooks';
import { Grid, Header, Sidebar } from '@nc-ui';
import classes from './MainTemplate.module.sass';

export interface MainTemplateProps {
  title?: string;
  withHeader?: boolean;
}

export function MainTemplate({
  children,
  withHeader = false,
}: React.PropsWithChildren<MainTemplateProps>): JSX.Element {
  const { isLogged } = useAuth();

  return (
    <div className={classes.main}>
      <Grid container>
        <Sidebar withHeader={withHeader} />
        <Grid item xs="auto">
          <div className={classes.main__content}>
            <Grid container alignContent="flex-start" spacing={24}>
              {isLogged && withHeader && (
                <Grid item xs={12}>
                  <Header />
                </Grid>
              )}
              {children}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
