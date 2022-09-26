import { Typography } from '@nc-ui';
import anime from 'animejs';
import { useEffect } from 'react';

export interface LoadingProps {
  id: string;
  text?: string;
}

export function Loading({ id, text }: LoadingProps): JSX.Element {
  useEffect(() => {
    anime
      .timeline({ loop: true })
      .add({
        targets: `#${id}-letter`,
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 500,
        delay: (_el, i) => 500 + 30 * i,
      })
      .add({
        targets: `#${id}-letter`,
        translateX: [0, -30],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 400,
        delay: (_el, i) => 100 + 30 * i,
      });
  }, []);

  return (
    <Typography component="div" id={id} style={{ letterSpacing: '0.5em' }}>
      {text &&
        text.split('').map((letter, i) => (
          <Typography
            id={`${id}-letter`}
            key={`loading_letter_${letter}_${i}`}
            style={{ display: 'inline-block', letterSpacing: '0.5em' }}
          >
            {letter}
          </Typography>
        ))}
    </Typography>
  );
}
