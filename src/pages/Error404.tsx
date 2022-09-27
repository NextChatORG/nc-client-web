import { useAuth } from '@nc-core/hooks';
import { Grid, MainTemplate, Typography } from '@nc-ui';
import { Link } from 'react-router-dom';

export default function Error404(): JSX.Element {
  const { isLogged } = useAuth();

  const header = document.getElementById('nc-header');

  const Component = (
    <Grid
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
      spacing={24}
      style={{
        height: `calc(100vh + 24px - ${header?.offsetHeight ?? 0}px - ${
          header ? 48 : 0
        }px)`,
        width: 'calc(100% + 24px)',
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
    return <MainTemplate withHeader>{Component}</MainTemplate>;
  }

  return Component;
}
