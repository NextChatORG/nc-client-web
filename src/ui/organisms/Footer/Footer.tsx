import { Link } from "react-router-dom";
import { Button, ButtonProps, Logo } from "../../atoms";
import classes from './Footer.module.sass';

export interface FooterProps {
  actionButton?: ButtonProps & { message: string };
}

export function Footer({ actionButton }: FooterProps): JSX.Element {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__top}>
        <section>
          <p>General</p>
          <ul>
            <li><Link to="/download">Descarga</Link></li>
            <li><Link to="/team">Nuestro equipo</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/feedback">Opiniones</Link></li>
          </ul>
        </section>
        <section>
          <p>Desarrolladores</p>
          <ul>
            <li><Link to="/dev/docs">Documentación</Link></li>
            <li><Link to="/dev/api">Referencias del API</Link></li>
            <li><Link to="/dev/open-source">Código abierto</Link></li>
          </ul>
        </section>
        <section>
          <p>Recursos</p>
          <ul>
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
            <li><Link to="/support">Soporte técnico</Link></li>
            <li><Link to="/help-center">Centro de Ayuda</Link></li>
          </ul>
        </section>
        <section>
          <p>Acerca de</p>
          <ul>
            <li><Link to="/about">Compañía</Link></li>
            <li><Link to="/agrees">Agradecimientos</Link></li>
          </ul>
        </section>
        <section>
          <Logo onlyIcon size="big" />
          {actionButton && (
            <Button {...actionButton}>
              {actionButton.message}
            </Button>
          )}
        </section>
      </div>
      <div className={classes.footer__bottom}>
        <p>
          &copy; NextChat 2022
        </p>
        <ul>
          <li><Link to="/terms">Términos y Condiciones</Link></li>
          <li><Link to="/privacy">Políticas de Privacidad</Link></li>
        </ul>
      </div>
    </footer>
  );
}
