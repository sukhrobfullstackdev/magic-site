import React, { useCallback, useEffect } from 'react';
import { clsx, CallToAction, Spacer } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
// import { PPSlideshow } from './pp_slideshow';
import Image from 'next/image';
import ScrollObserver from '../../../../helpers/ScrollObserver';
import styles from './nfts.module.less';

import { MintDemo } from './mint_demo';

import imgNftsPlaceholder from './images/nftsplaceholder.png';
import iconCc from '../icons/cc.svg';
import iconTerminal from '../icons/terminal.svg';
import iconDiamond from '../icons/diamond.svg';
import iconGift from '../icons/gift.svg';

export const ProductsNfts = ({ alignment }) => {
  const bulletPoints = [
    {
      icon: iconCc,
      title: 'NFT Checkout',
      body: 'Buy directly with Credit, Debit, and Instant ACH',
    },
    {
      icon: iconTerminal,
      title: 'Smart Contract',
      body: 'Deploy smart contracts or bring your own',
    },
    {
      icon: iconDiamond,
      title: 'NFT Minting',
      body: 'Create and deliver NFTs fast and at scale',
    },
    {
      icon: iconGift,
      title: 'NFT Gallery',
      body: 'View, manage, and transfer NFTs in wallets',
    },
  ];

  useEffect(() => {
    ScrollObserver('.animTarget1', '.nftAnimWrapper', 'fadeInAndScale', 0);
  }, [styles]);

  return (
    <SectionWrapper className={clsx(styles.sectionWrapper, 'nftAnimWrapper')}>
      <Spacer size={60} orientation="vertical" />
      <div className={clsx(styles.content)}>
        <div className={clsx('d-flex flex-column-reverse flex-md-row flex-md-nowrap')}>
          <div
            className={clsx(
              'pe-0 pe-lg-5 ps-xl-5 ps-xxl-0 pt-5 pt-lg-0 col-12 col-md-6 d-flex flex-column justify-content-center ',
            )}
          >
            <h4>NFTs</h4>
            <h3>
              From concept <br />
              to collection
            </h3>
            <div className={clsx('mt-3 mt-lg-4')}>
              <p>
                Build previously unimaginable digital experiences from loyalty programs to token-gated events and more
              </p>
            </div>
            <div className={clsx(styles.checkListContainer, 'd-none d-lg-block mt-5')}>
              <ul className={clsx('d-flex flex-wrap')}>
                {bulletPoints.map(o => {
                  return (
                    <li key={o.icon} className={clsx('col-12 col-lg-6 d-flex align-items-start pe-3 mb-3 mb-lg-5')}>
                      <div className={clsx(styles.checklistIcon)}>
                        <Image src={o.icon} width={32} height={32} alt={o.title} />
                      </div>
                      <div className={clsx('ps-3')}>
                        <div className={clsx('textBold pb-1')}>{o.title}</div>
                        <div className={clsx(styles.checklistItem)}>{o.body}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className={clsx('pe-0 pe-md-5 col-12 col-md-6  d-flex flex-column justify-content-center')}>
            <div className={clsx(styles.slideContainer, 'animTarget1')}>
              {/* <Image
                className={clsx('animTarget1')}
                src={imgNftsPlaceholder}
                width={696}
                height={714}
                layout="responsive"
              /> */}
              <MintDemo />
            </div>
          </div>
        </div>

        <div className={clsx(styles.checkListContainer, 'd-block d-lg-none mt-5')}>
          <ul className={clsx('d-flex flex-wrap')}>
            {bulletPoints.map(o => {
              return (
                <li key={o.icon} className={clsx('col-12 col-sm-6 d-flex align-items-start pe-3 mb-3 mb-lg-5')}>
                  <div className={clsx(styles.checklistIcon)}>
                    <Image src={o.icon} width={32} height={32} alt={o.title} />
                  </div>
                  <div className={clsx('ps-3')}>
                    <div className={clsx('textBold pb-1')}>{o.title}</div>
                    <div className={clsx(styles.checklistItem)}>{o.body}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={clsx('mt-3 mt-sm-5')}>
          <CallToAction.a
            onPress={useCallback(() => AnalyticsService.TrackAction('NFTs Learn More Button Clicked'), [])}
            href="https://magic.link/nft-checkout-minting"
            rel="noopener noreferrer"
            className={clsx(styles.ctaButton)}
          >
            Learn More
          </CallToAction.a>
        </div>
      </div>
    </SectionWrapper>
  );
};
