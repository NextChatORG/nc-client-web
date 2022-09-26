import { Button, ButtonProps, Grid, Logo } from '@nc-ui';
import { Link } from 'react-router-dom';
import classes from './Footer.module.sass';

export interface FooterProps {
  actionButton?: ButtonProps & { message: string };
}

export function Footer({ actionButton }: FooterProps): JSX.Element {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__top}>
        <Grid container alignItems="flex-start" justifyContent="space-between">
          <Grid item xs={12} md="auto">
            <Grid container direction="column" spacing={12}>
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
          <Grid item xs={12} md="auto">
            <Grid container direction="column" spacing={12}>
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
          <Grid item xs={12} md="auto">
            <Grid container direction="column" spacing={12}>
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
          <Grid item xs={12} md="auto">
            <Grid container direction="column" spacing={12}>
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
          <Grid item xs={12} md="auto">
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
      </div>
      <div className={classes.footer__bottom}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm="auto">
            <p className={classes.footer__bottom__copyright}>
              &copy; NextChat 2022
            </p>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Grid container justifyContent="flex-end" spacing={12}>
              <Grid item xs={12} sm="auto">
                <Link to="/terms">Términos y Condiciones</Link>
              </Grid>
              <Grid item xs={12} sm="auto">
                <Link to="/privacy">Políticas de Privacidad</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}
