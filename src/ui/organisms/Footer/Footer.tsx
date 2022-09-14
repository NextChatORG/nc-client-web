import { Link } from 'react-router-dom';
import { Button, ButtonProps, Grid, Logo } from '../../atoms';
import classes from './Footer.module.sass';

export interface FooterProps {
  actionButton?: ButtonProps & { message: string };
}

export function Footer({ actionButton }: FooterProps): JSX.Element {
  return (
    <footer className={classes.footer}>
      <Grid
        container
        alignItems="flex-start"
        className={classes.footer__top}
        justifyContent="space-between"
      >
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <p className={classes.footer__top__title}>General</p>
            </Grid>
            <Grid item>
              <Link to="/download">Descarga</Link>
            </Grid>
            <Grid item>
              <Link to="/team">Nuestro equipo</Link>
            </Grid>
            <Grid item>
              <Link to="/blog">Blog</Link>
            </Grid>
            <Grid item>
              <Link to="/feedback">Opiniones</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <p className={classes.footer__top__title}>Desarrolladores</p>
            </Grid>
            <Grid item>
              <Link to="/dev/docs">Documentación</Link>
            </Grid>
            <Grid item>
              <Link to="/dev/api">Referencias del API</Link>
            </Grid>
            <Grid item>
              <Link to="/dev/open-source">Código abierto</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <p className={classes.footer__top__title}>Recursos</p>
            </Grid>
            <Grid item>
              <Link to="/faq">Preguntas frecuentes</Link>
            </Grid>
            <Grid item>
              <Link to="/support">Soporte técnico</Link>
            </Grid>
            <Grid item>
              <Link to="/help-center">Centro de Ayuda</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <p className={classes.footer__top__title}>Acerca de</p>
            </Grid>
            <Grid item>
              <Link to="/about">Compañía</Link>
            </Grid>
            <Grid item>
              <Link to="/agrees">Agradecimientos</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" direction="column" spacing={16}>
            <Grid item>
              <Logo onlyIcon size="big" />
            </Grid>
            <Grid item>
              {actionButton && (
                <Button {...actionButton}>{actionButton.message}</Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        className={classes.footer__bottom}
        justifyContent="space-between"
      >
        <Grid item>
          <p className={classes.footer__bottom__copyright}>
            &copy; NextChat 2022
          </p>
        </Grid>
        <Grid item>
          <Grid container justifyContent="flex-end">
            <Grid item xs="auto">
              <Link to="/terms">Términos y Condiciones</Link>
            </Grid>
            <Grid item>
              <Link to="/privacy">Políticas de Privacidad</Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
}
