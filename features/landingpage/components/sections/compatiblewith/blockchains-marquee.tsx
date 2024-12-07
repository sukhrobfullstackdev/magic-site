import React, { useEffect } from 'react';
import { clsx } from '@magiclabs/ui';
import styles from './blockchains-marquee.module.less';
import ScrollObserver from '../../../helpers/ScrollObserver';

const marqueeItems = [
  {
    image: '/images/landingpage/blockchains_marquee/solana.svg',
    caption: 'Solana',
  },
  {
    image: '/images/landingpage/blockchains_marquee/algorand.svg',
    caption: 'Algorand',
  },
  {
    image: '/images/landingpage/blockchains_marquee/avalanche.svg',
    caption: 'Avalanche',
  },
  {
    image: '/images/landingpage/blockchains_marquee/binance.svg',
    caption: 'Binance',
  },
  {
    image: '/images/landingpage/blockchains_marquee/cello.svg',
    caption: 'Cello',
  },
  {
    image: '/images/landingpage/blockchains_marquee/tezos.svg',
    caption: 'Tezos',
  },
  {
    image: '/images/landingpage/blockchains_marquee/moonbeam.svg',
    caption: 'Moonbeam',
  },
  {
    image: '/images/landingpage/blockchains_marquee/polygon.svg',
    caption: 'Polygon',
  },
  {
    image: '/images/landingpage/blockchains_marquee/ethereum.svg',
    caption: 'Ethereum',
  },
  {
    image: '/images/landingpage/blockchains_marquee/bitcoin.svg',
    caption: 'Bitcoin',
  },
  {
    image: '/images/landingpage/blockchains_marquee/optimism.svg',
    caption: 'Optimism',
  },
  {
    image: '/images/landingpage/blockchains_marquee/arbitrum.svg',
    caption: 'Arbitrum',
  },
  {
    image: '/images/landingpage/blockchains_marquee/near.svg',
    caption: 'Near',
  },
  {
    image: '/images/landingpage/blockchains_marquee/flow.svg',
    caption: 'Flow',
  },
];

export const BlockchainsMarquee = () => {
  useEffect(() => {
    ScrollObserver('.bcMarqueeTarget', '.bcMarqueeAnimWrapper', styles.bcMarqueeAnimated!, 0);
  }, [styles]);

  return (
    <div className={clsx(styles.marqueeWrapper, 'bcMarqueeAnimWrapper')}>
      <div className={clsx(styles.marqueeWrapperInner)}>
        <div className={clsx(styles.marqueeItems, 'd-flex align-items-center bcMarqueeTarget')}>
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
