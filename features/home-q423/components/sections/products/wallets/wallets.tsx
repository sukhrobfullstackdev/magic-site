import React, { useCallback, useEffect } from 'react';
import { clsx, CallToAction, Spacer } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
// import { PPSlideshow } from './pp_slideshow';
import Image from 'next/image';
import ScrollObserver from '../../../../helpers/ScrollObserver';
import styles from './wallets.module.less';

import imgWalletsPlaceholder from './images/walletsplaceholder.png';
import iconSecurity from '../icons/security.svg';
import iconWallet from '../icons/wallet.svg';
import iconFingerprint from '../icons/fingerprint.svg';
import iconWidget from '../icons/widget.svg';
import iconFiat from '../icons/fiat.svg';
import iconGlobe from '../icons/globe.svg';

export const ProductsWallets = ({ alignment }) => {
  const bulletPoints = [
    {
      icon: iconSecurity,
      title: 'Invisible wallets',
      body: 'Users get wallets after sign in with email or social',
    },
    {
      icon: iconWallet,
      title: 'Non-custodial',
      body: 'Users have sole control over their keys and assets',
    },
    {
      icon: iconFingerprint,
      title: 'Authentication',
      body: '10+ authentication methods or bring your own',
    },
    {
      icon: iconWidget,
      title: 'White-label',
      body: 'Customize to your brand and create familiar UX',
    },
    {
      icon: iconFiat,
      title: 'Fiat on-ramps',
      body: 'Onboard new web3 users with easy access to crypto',
    },
    {
      icon: iconGlobe,
      title: 'Multi-chain',
      body: 'Supports 30+ blockchains',
    },
  ];

  useEffect(() => {
    ScrollObserver('.animTarget1', '.walletsAnimWrapper', 'fadeInAndScale', 0);
  }, [styles]);

  return (
    <SectionWrapper className={clsx(styles.sectionWrapper, 'walletsAnimWrapper')}>
      <div className={clsx(styles.content)}>
        <div className={clsx('d-flex flex-column-reverse flex-md-row flex-md-nowrap align-items-center')}>
          <div className={clsx('pe-0 pe-md-5 col-12 col-md-6 d-flex flex-column justify-content-center pt-5 pt-sm-0')}>
            <h4>Wallets</h4>
            <h3>
              Seamless onboarding.
              <br />
              High conversion.
            </h3>
            <div className={clsx('mt-3 mt-lg-4')}>
              <p>
                Wallet infrastructure <strong>without</strong> seed phrases, downloads, or steps that add friction.
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

          <div className={clsx('ps-5 col-12 col-md-6  d-flex flex-column justify-content-center')}>
            <div className={clsx(styles.slideContainer, 'slideTarget')}>
              <Image
                className={clsx('animTarget1')}
                src={imgWalletsPlaceholder}
                width={696}
                height={782}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className={clsx(styles.checkListContainer, 'd-block d-lg-none mt-5')}>
          <ul className={clsx('d-flex flex-wrap')}>
            {bulletPoints.map(o => {
              return (
                <li key={o.icon} className={clsx('col-12 col-sm-6 d-flex align-items-start pe-3 mb-3 mb-sm-5')}>
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

        <div className={clsx('mt-3 mt-sm-0')}>
          <CallToAction.a
            onPress={useCallback(() => AnalyticsService.TrackAction('Wallets Learn More Desktop Button Clicked'), [])}
            href="https://magic.link/docs"
            rel="noopener noreferrer"
            className={clsx(styles.ctaButton, 'btnLarge')}
          >
            Learn More
          </CallToAction.a>
        </div>
      </div>
    </SectionWrapper>
  );
};
