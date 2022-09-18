import { Grid, MainTemplate } from '@nc-ui';

export default function Home(): JSX.Element {
  return (
    <MainTemplate>
      <Grid item xs={12}>
        Header
      </Grid>
      <Grid item xs={3}>
        Left
      </Grid>
      <Grid item xs={6}>
        Center
      </Grid>
      <Grid item xs={3}>
        Right
      </Grid>
    </MainTemplate>
  );
}
