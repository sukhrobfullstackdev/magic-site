import React, { useEffect, useState, useRef } from 'react';
import { Player } from '@lordicon/react';
import { clsx } from '@magiclabs/ui';

export const IS_CLIENT = typeof window !== 'undefined';
interface LordiconPlayerInterface {
  icon: any;
  name: string;
  size: number;
  color: string;
  once?: boolean;
}

const LordiconPlayer: React.FC<LordiconPlayerInterface> = ({ size, icon, name, color, once = false }) => {
  const playerRef = useRef<Player>(null);
  const [iconState, setIconState] = useState('in-' + name);
  const [isPlayed, setIsPlayed] = useState(false);

  useEffect(() => {
    if (!IS_CLIENT || !name) {
      return;
    }

    const cn = '.' + name;
    const key = document.querySelector(cn)!;

    const observer = new IntersectionObserver(entries => {
      const el = playerRef.current!;

      if (el && entries[0]) {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIconState('in-' + name);
            playerRef.current?.playFromBeginning();
            if (once) {
              observer.unobserve(key);
            }
            return;
          }, 500);
        }
      }
    });

    observer.observe(key);

    return () => {
      observer.unobserve(key);
      observer.disconnect();
    };
  }, [IS_CLIENT, name]);

  return (
    <>
      {IS_CLIENT ? (
        <div
          className={clsx(name)}
          onMouseEnter={() => {
            setIconState('hover-' + name);
            playerRef.current?.playFromBeginning();
          }}
        >
          <Player ref={playerRef} size={size} icon={icon} colorize={color} state={iconState} />
        </div>
      ) : null}
    </>
  );
};

export default LordiconPlayer;
