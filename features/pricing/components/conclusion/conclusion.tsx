import React, { useCallback } from 'react';
import { CallToAction, Flex, Spacer, Media } from '@magiclabs/ui';
import { GradientText } from 'components/widgets/gradient-text';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper/section-wrapper';
import Image from 'next/image';
import imgFooterGrid from 'public/images/landing-page-july-2021/conclusion-section/grid-section.png';

import styles from './conclusion.module.less';

export const ConclusionSection: React.FC = () => {
  return (
    <>
      <SectionWrapper className={styles.ConclusionSection}>
        <Flex justifyContent="center" alignItems="center" direction="column">
          <h1>
            <GradientText data="Help welcome the" gradient={['#dc90ff', '#6851ff']} /> <br />
            <GradientText data="world to Web3" gradient={['#dc90ff', '#6851ff']} />
          </h1>

          <p className="textXL">
            <b>1,000 free</b> monthly active users. No credit card required.
          </p>

          <Flex className={styles.ctaWrapper}>
            <CallToAction.a
              onPress={useCallback(() => AnalyticsService.TrackAction('Closing Section Signup Button Clicked'), [])}
              href="https://dashboard.magic.link/signup"
              rel="noopener noreferrer"
              target="_blank"
            >
              Try for free
            </CallToAction.a>

            <Spacer size={16} orientation="horizontal" />

            <CallToAction.a
              onPress={useCallback(() => {
                AnalyticsService.TrackAction('Closing Section Talk to an Expert Button Clicked');
                AnalyticsService.TrackDemo();
              }, [])}
              href="/contact"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.greyButton}
            >
              Contact Sales
            </CallToAction.a>
          </Flex>
        </Flex>
      </SectionWrapper>
      <div className={styles.ConclusionGrid}>
        <Image
          src={imgFooterGrid}
          alt="Magic"
          width={1175}
          height={156}
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center center',
          }}
        />
      </div>
    </>
  );
};
