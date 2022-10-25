import { Grid } from '@nc-ui';
import { useOutlet } from 'react-router-dom';
import SettingsNavigation from './SettingsNavigation';
import SettingsGeneralTab from './tabs/SettingsGeneralTab';

export default function Settings(): JSX.Element {
  const outlet = useOutlet();

  return (
    <>
      <Grid item xs={3}>
        <SettingsNavigation />
      </Grid>
      <Grid item xs={9}>
        {outlet ?? <SettingsGeneralTab />}
      </Grid>
    </>
  );
}
