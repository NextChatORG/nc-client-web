import { Logo } from '@nc-ui';
import anime from 'animejs';
import { useEffect } from 'react';
import classes from './Loader.module.sass';

export function Loader(): JSX.Element {
  useEffect(() => {
    anime
      .timeline({ loop: true, targets: `#loader-logo` })
      .add({ duration: 500, easing: 'easeInElastic(1, .6)', scale: 1.5 })
      .add({ duration: 600, easing: 'easeInElastic(1, .6)', scale: 0.75 });
  }, []);

  return (
    <div className={classes.loader}>
      <Logo id="loader-logo" />
    </div>
  );
}
