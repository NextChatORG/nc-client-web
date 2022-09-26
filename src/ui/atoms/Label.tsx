import { Grid, Typography } from '@nc-ui';

export interface LabelProps {
  layout?: 'horizontal' | 'vertical';
  name: string;
  value: string;
}

export function Label({
  layout = 'horizontal',
  name,
  value,
}: LabelProps): JSX.Element {
  return (
    <Grid
      container
      alignItems="center"
      direction={layout === 'horizontal' ? 'row' : 'column'}
      justifyContent={layout === 'horizontal' ? 'space-between' : undefined}
      spacing={4}
    >
      <Grid item>
        <Typography withLetterSpacing fontWeight={500}>
          {name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography fontSize={14}>{value}</Typography>
      </Grid>
    </Grid>
  );
}
