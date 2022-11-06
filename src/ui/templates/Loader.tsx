import { Logo } from '@nc-ui';
import anime from 'animejs';
import { useEffect } from 'react';

export function Loader(): JSX.Element {
  useEffect(() => {
    anime
      .timeline({ loop: true, targets: `#loader-logo` })
      .add({ duration: 500, easing: 'easeInElastic(1, .6)', scale: 1.5 })
      .add({ duration: 600, easing: 'easeInElastic(1, .6)', scale: 0.75 });
  }, []);

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <Logo className="transform scale-0" id="loader-logo" />
    </div>
  );
}
