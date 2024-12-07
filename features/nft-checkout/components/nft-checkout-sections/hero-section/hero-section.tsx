import React, { useCallback } from 'react';

import Image from 'next/image';
import gradientBlur from 'public/images/nft-checkout/gradient-blur.png';
import { SectionWrapper } from 'components/layout/section-wrapper';
import { clsx, Flex, Spacer } from '@magiclabs/ui';
import { HeroMarquee } from '../../partials/marquee/marquee';

import styles from './hero-section.module.less';
// import { NFTInput } from '../../partials/input/input';
import { AnalyticsService } from '../../../../../lib/analytics-service';

export const HeroSection = () => {
  return (
    <>
      <SectionWrapper className={styles.Hero}>
        <Flex.Column className={styles.HeroContent} alignItems="center">
          <h1>NFT Launches Simplified</h1>
          <p>Seamless end-to-end experience from Minting to Checkout for primary NFT drops</p>

          <div className={clsx('d-flex justify-content-center justify-content-md-start')}>
            <a
              onClick={useCallback(() => AnalyticsService.TrackAction('Hero Section Book a Demo button Clicked'), [])}
              href="https://magic.link/contact"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx('btnGlass btnLightText btnPurple')}
            >
              Contact Sales
            </a>
          </div>
        </Flex.Column>

        <HeroMarquee className={styles.Marquee} />
      </SectionWrapper>
      <div className={styles.GradientBlurContainer}>
        <div className={styles.GradientBlur}>
          <Image
            priority
            quality={100}
            src={gradientBlur}
            width={1900}
            height={2200}
            alt="Blur"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </>
  );
};
