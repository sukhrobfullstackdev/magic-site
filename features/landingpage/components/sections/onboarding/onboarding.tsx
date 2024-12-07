import React from 'react';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';

import imgOnboarding1 from 'public/images/landingpage/onboarding/bgAnim1-placeholder.png';
import imgOnboarding2 from 'public/images/landingpage/onboarding/bgAnim2-placeholder.png';
import imgOnboarding3 from 'public/images/landingpage/onboarding/bgAnim3-placeholder.png';
import styles from './onboarding.module.less';

export const Onboarding = () => {
  return (
    <SectionWrapper className={styles.sectionWrapper}>
      <div className={clsx(styles.content)}>
        <h3 className={clsx(styles.headline, 'textCentered mb-5')}>End-to-End Web3 Onboarding</h3>
        <div className={clsx('d-flex flex-wrap')}>
          <div className={clsx('flex-grow-1 pb-4')}>
            <div className={clsx(styles.onboardingCol, 'd-flex flex-wrap flex-md-nowrap')}>
              <div className={clsx(styles.onboardingColContent, ' col-md-4')}>
                <h4 className={clsx(styles.onboardingColTitle, 'mb-3')}>On-ramps and NFT services</h4>
                <p>
                  Streamline NFT and crypto onboarding with <strong>NFT Checkout & Minting</strong> and
                  <strong>Fiat On-Ramps</strong> via Credit, Debit, Instant Bank ACH
                </p>
              </div>
              <div className={clsx('ms-auto d-flex align-items-end ')}>
                <Image
                  src={imgOnboarding1}
                  alt="Onramps and NFT services"
                  className={clsx(styles.onboardingColPlaceholderImage)}
                  width={687}
                  height={360}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'center center',
                  }}
                />
              </div>
            </div>
          </div>
          <div className={clsx('d-flex flex-wrap flex-md-nowrap')}>
            <div className={clsx('col col-md align-self-stretch pe-2 mb-3 mb-md-0')}>
              <div className={clsx(styles.onboardingCol)}>
                <div className={clsx(styles.onboardingColContent, ' col-md-8')}>
                  <h4 className={clsx(styles.onboardingColTitle, 'mb-3')}>Authentication</h4>
                  <p>
                    Access to <strong>20+ Auth methods</strong> (including email, SMS, social), integration with
                    <strong>any identity provider</strong>, MFA and phishing protection
                  </p>
                </div>
                <div className={clsx('ms-auto d-flex align-items-end')}>
                  <Image
                    src={imgOnboarding2}
                    alt="Authentication"
                    className={clsx(styles.onboardingColPlaceholderImage)}
                    width={578}
                    height={250}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      objectPosition: 'center center',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={clsx('col col-md align-self-stretch ps-2')}>
              <div className={clsx(styles.onboardingCol)}>
                <div className={clsx(styles.onboardingColContent, ' col-md-8')}>
                  <h4 className={clsx(styles.onboardingColTitle, 'mb-3')}>Access to Web3 Experts</h4>
                  <p>
                    Launch with confidence with Magic’s on-call <strong>VIP support</strong>,
                    <strong>White-Glove Service</strong> custom implementations, and guaranteed <strong>SLAs</strong>
                    (99.99% uptime)
                  </p>
                </div>
                <div className={clsx('ms-auto d-flex align-items-end')}>
                  <Image
                    src={imgOnboarding3}
                    alt="Access to Web3 Experts"
                    className={clsx(styles.onboardingColPlaceholderImage)}
                    width={578}
                    height={262}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      objectPosition: 'center center',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
