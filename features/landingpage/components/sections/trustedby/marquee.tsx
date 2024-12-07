import React, { useEffect } from 'react';
import { clsx } from '@magiclabs/ui';
import styles from './marquee.module.less';
import ScrollObserver from '../../../helpers/ScrollObserver';

const marqueeItems = [
  {
    image: '/images/landingpage/tr_marquee/mattel.svg',
    caption: 'Mattel',
  },
  {
    image: '/images/landingpage/tr_marquee/macys.svg',
    caption: "Macy's",
  },
  {
    image: '/images/landingpage/tr_marquee/7-Eleven.svg',
    caption: '7 Eleven',
  },
  {
    image: '/images/landingpage/tr_marquee/Animoca.svg',
    caption: 'Animoca',
  },
  {
    image: '/images/landingpage/tr_marquee/xsolla.svg',
    caption: 'Xsolla',
  },
  {
    image: '/images/landingpage/tr_marquee/immutable.svg',
    caption: 'Immutable',
  },
  {
    image: '/images/landingpage/tr_marquee/magiceden.svg',
    caption: 'Magic Eden',
  },
  {
    image: '/images/landingpage/tr_marquee/moralis.svg',
    caption: 'Moralis',
  },
  {
    image: '/images/landingpage/tr_marquee/even.svg',
    caption: 'Even',
  },
  {
    image: '/images/landingpage/tr_marquee/kongregate.svg',
    caption: 'Kongregate',
  },
  {
    image: '/images/landingpage/tr_marquee/voice.svg',
    caption: 'Voice',
  },
  {
    image: '/images/landingpage/tr_marquee/kx.svg',
    caption: 'KX',
  },
];

export const Marquee = () => {
  useEffect(() => {
    ScrollObserver('.marqueeTarget', '.marqueeAnimWrapper', styles.marqueeAnimated!, 0);
  }, [styles]);

  return (
    <div className={clsx(styles.marqueeWrapper, 'marqueeAnimWrapper')}>
      <div className={clsx(styles.marqueeWrapperInner)}>
        <div className={clsx(styles.marqueeItems, 'd-flex align-items-center marqueeTarget')}>
          {marqueeItems.map((o, i) => {
            return (
              <div key={o.caption} className={clsx('px-4')}>
                <img src={o.image} alt={o.caption} className={clsx(styles.marqueeItem)} />
              </div>
            );
          })}
          {marqueeItems.map((o, i) => {
            return (
              <div key={o.caption + '1'} className={clsx('px-4')}>
                <img src={o.image} alt={o.caption} className={clsx(styles.marqueeItem)} />
              </div>
            );
          })}
        </div>
        <div className={clsx(styles.marqueeGradientLeft)} />
        <div className={clsx(styles.marqueeGradientRight)} />
      </div>
    </div>
  );
};
