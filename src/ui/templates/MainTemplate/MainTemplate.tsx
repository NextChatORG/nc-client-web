import { useUser } from '@nc-core/hooks';
import { Grid } from '../../atoms';
import { Header, Sidebar } from '../../organisms';
import classes from './MainTemplate.module.sass';

export interface MainTemplateProps {
  title?: string;
  withHeader?: boolean;
}

export function MainTemplate({
  children,
  withHeader = false,
}: React.PropsWithChildren<MainTemplateProps>): JSX.Element {
  const { isLogged } = useUser();

  return (
    <div className={classes.main}>
      <Grid container>
        <Sidebar />
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
