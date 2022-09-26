import { Button, ButtonProps, Grid, Typography } from '@nc-ui';

export interface LandingFeatureProps {
  action?: ButtonProps & { message: string };
  description: string;
  icon: React.ReactNode;
  position?: 'left' | 'right';
  title: string;
}

export function LandingFeature({
  action,
  description,
  icon,
  position = 'left',
  title,
}: LandingFeatureProps): JSX.Element {
  return (
    <Grid
      container
      alignItems="flex-start"
      direction={position === 'right' ? 'row-reverse' : 'row'}
      spacing={36}
      style={{ width: '53%' }}
    >
      <Grid item>
        <div style={{ width: 200 }}>{icon}</div>
      </Grid>
      <Grid item xs="auto">
        <Typography
          component="h2"
          fontSize={24}
          fontWeight={500}
          style={{ marginTop: 24 }}
        >
          {title}
        </Typography>
        <Typography fontSize={14} lineHeight="19px" style={{ marginTop: 12 }}>
          {description}
        </Typography>
        {action && (
          <Button {...action} style={{ ...action.style, marginTop: 24 }}>
            {action.message}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
