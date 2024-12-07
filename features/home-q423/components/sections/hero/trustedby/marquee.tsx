import React from 'react';
import { clsx } from '@magiclabs/ui';
import { useMediaQuery } from 'hooks/use-media-query';
import { useIntersectionObserver } from 'hooks/use-intersection-observer';

import imgImmutable from './images/immutable.svg';
import imgForbes from './images/forbes.svg';
import imgPaypal from './images/paypal.svg';
import imgHelium from './images/helium.svg';
import imgPolymarket from './images/polymarket.svg';
import imgWalletConnect from './images/walletconnect.svg';

import styles from './marquee.module.less';

const ITEMS = [
  {
    image: imgPaypal,
    caption: 'Paypal',
  },
  {
    image: imgWalletConnect,
    caption: 'WalletConnect',
  },
  {
    image: imgHelium,
    caption: 'Helium',
  },
  {
    image: imgPolymarket,
    caption: 'Polymarket',
  },
  {
    image: imgImmutable,
    caption: 'Immutable',
  },
  {
    image: imgForbes,
    caption: 'Forbes',
  },
];

export const Marquee = () => {
  const isMobile = useMediaQuery('(max-width: 400px)');
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '80px',
  });

  const speed = 1.1;
  const repeat = 8;

  return (
    <div className={clsx(styles.marqueeWrapper)}>
      <div className={clsx(styles.marqueeWrapperInner)}>
        <ul
          ref={ref}
          className={clsx(styles.marqueeItems)}
          style={
            isMobile
              ? {
                  animationDuration: `${(1 / speed) * ITEMS.length * repeat}s`,
                  animationPlayState: entry?.isIntersecting ? 'running' : 'paused',
                }
              : {}
          }
        >
          {[...Array(isMobile ? repeat : 1).keys()].map(i =>
            ITEMS.map(({ caption, image }) => (
              <img className={clsx(styles.marqueeItem, styles[caption])} key={caption} src={image} alt={caption} />
            )),
          )}
        </ul>
      </div>
    </div>
  );
};
