import { useAuth } from '@nc-core/hooks';
import { Grid, Header, Sidebar } from '@nc-ui';
import clsx from 'clsx';
import classes from './MainTemplate.module.sass';

export interface MainTemplateProps {
  noPadding?: boolean;
  title?: string;
  withHeader?: boolean;
}

export function MainTemplate({
  children,
  noPadding = false,
  withHeader = false,
}: React.PropsWithChildren<MainTemplateProps>): JSX.Element {
  const { isLogged } = useAuth();

  return (
    <div className={classes.main}>
      <Grid container>
        <Sidebar withHeader={withHeader} />
        <Grid item xs="auto">
          <div
            className={clsx(classes.main__content, {
              [classes['main__content--withPadding']]: !noPadding,
            })}
          >
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
