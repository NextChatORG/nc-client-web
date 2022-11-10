import { useOutlet } from 'react-router-dom';
import SettingsNavigation from './SettingsNavigation';
import SettingsGeneralTab from './tabs/SettingsGeneralTab';

export default function Settings(): JSX.Element {
  const outlet = useOutlet();

  return (
    <>
      <div className="basis-full lg:basis-1/3 xl:basis-1/5">
        <SettingsNavigation />
      </div>
      <div className="<sm:basis-full sm:flex-1">
        {outlet ?? <SettingsGeneralTab />}
      </div>
    </>
  );
}
