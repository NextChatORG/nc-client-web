import { useAuth } from '@nc-core/hooks';
import { Grid, MainTemplate, Typography } from '@nc-ui';
import { Link } from 'react-router-dom';

export default function Error404(): JSX.Element | null {
  const { isLogged } = useAuth();

  const Component = (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
      spacing={24}
      style={{
        height: isLogged ? 'calc(100vh - 24px)' : 'calc(100vh - 12px)',
        width: isLogged ? 'calc(100% + 24px)' : 'calc(100% - 12px)',
      }}
    >
      <Grid item>
        <Typography fontSize={96}>404</Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" direction="column" spacing={4}>
          <Grid item>
            <Typography component="h3" fontWeight={600} variant="title">
              Página no encontrada
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontSize={13}>
              La página que estás buscando no existe, haz{' '}
              <Link to="/">click aquí</Link> para volver al inicio
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  if (isLogged) {
    return (
      <MainTemplate>
        <Grid item xs="auto">
          {Component}
        </Grid>
      </MainTemplate>
    );
  }

  return <div style={{ color: 'var(--color-text)' }}>{Component}</div>;
}
