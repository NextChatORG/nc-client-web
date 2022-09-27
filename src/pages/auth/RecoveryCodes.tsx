import { useAuth } from '@nc-core/hooks';
import { Button, Grid, Logo, Typography } from '@nc-ui';

const spacing = 20;

export default function RecoveryCodes(): JSX.Element {
  const { clearRecoveryCodes, data, recoveryCodes } = useAuth();

  function handleDownloadClick() {
    const el = document.createElement('a');

    el.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
      recoveryCodes.join('\r\n'),
    )}`;

    el.download = `${data?.username}_nextchat_recovery_codes.txt`;
    el.style.display = 'none';

    document.body.appendChild(el);

    el.click();
    el.remove();
  }

  return (
    <Grid
      container
      alignItems="center"
      alignContent="center"
      justifyContent="center"
      spacing={spacing}
      style={{
        color: 'var(--color-text)',
        height: `calc(100vh + ${spacing / 2}px)`,
        width: `calc(100% + ${spacing / 2}px)`,
      }}
    >
      <Grid item>
        <Logo color="white" />
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={11} sm={6} md={4} lg={3} xl={2}>
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
          <Grid item>
            <Typography withLetterSpacing component="h1" variant="title">
              Códigos de recuperación
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              withLetterSpacing
              component="p"
              fontSize={13}
              style={{ textAlign: 'center' }}
            >
              Guarda muy bien estos códigos, te servirán para recuperar tu
              cuenta en caso de que olvides la contraseña.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={11} sm={6} md={4} lg={3} xl={2}>
        <Grid container spacing={6}>
          {recoveryCodes.map((code, i) => (
            <Grid item key={`recovery_code_${i}`} xs={12}>
              <Typography
                withLetterSpacing
                component="div"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, .3)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  textAlign: 'center',
                }}
              >
                {code}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={11} sm={6} md={4} lg={3} xl={2}>
        <Grid container spacing={12}>
          <Grid item xs={6}>
            <Button fullWidth color="success" onClick={handleDownloadClick}>
              Descargar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              color="white"
              onClick={clearRecoveryCodes}
              variant="outlined"
            >
              Continuar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
