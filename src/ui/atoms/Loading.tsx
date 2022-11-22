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
    <div className="tracking-[0.5em]" id={id}>
      {text &&
        text.split('').map((letter, i) => (
          <span
            className="tracking-[0.5em]"
            id={`${id}-letter`}
            key={`loading_letter_${letter}_${i}`}
          >
            {letter}
          </span>
        ))}
    </div>
  );
}
