import { Grid, Typography } from '@nc-ui';
import { Link } from 'react-router-dom';

export function NoChatSelected(): JSX.Element {
  return (
    <Grid
      container
      fullHeight
      alignItems="center"
      direction="column"
      justifyContent="center"
      spacing={16}
    >
      <Grid item xs={4}>
        <img alt="Begin chat" src="/images/begin-chat.svg" width="100%" />
      </Grid>
      <Grid item>
        <Grid container alignItems="center" direction="column" spacing={4}>
          <Grid item>
            <Typography variant="title">Selecciona una conversación</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body">
              Si no tienes una conversación puedes buscar{' '}
              <Link to="/explore">nuevas conexiones</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
