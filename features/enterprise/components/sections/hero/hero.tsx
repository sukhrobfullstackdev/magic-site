import React, { useCallback } from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { CallToAction, clsx } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';

import styles from './hero.module.less';

export const HeroSection: React.FC = () => {
  return (
    <SectionWrapper className={clsx(styles.HeroSection)}>
      <h3 className={clsx(styles.headline, 'mb-4 mx-auto')}>Web3 built on your brand</h3>
      <p className={clsx(styles.subheadline, 'mb-5 mx-auto')}>
        With Magic’s Enterprise Services, leverage your current login flow to onboard customers to web3 apps
      </p>
      <CallToAction.a
        onPress={useCallback(() => AnalyticsService.TrackAction('Hero Section Demo Button Clicked'), [])}
        color="primary"
        href="#bookform"
        className={clsx(styles.gradientButton, styles.ctaButton)}
      >
        Book Demo
      </CallToAction.a>
    </SectionWrapper>
  );
};
