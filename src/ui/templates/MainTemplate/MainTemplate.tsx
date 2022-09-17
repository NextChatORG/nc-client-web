import { Grid } from '../../atoms';
import { Sidebar } from '../../organisms';
import classes from './MainTemplate.module.sass';

export function MainTemplate(): JSX.Element {
  return (
    <Grid container alignItems="flex-start" className={classes.main}>
      <Grid item>
        <Sidebar />
      </Grid>
      <Grid item>Main</Grid>
    </Grid>
  );
}
