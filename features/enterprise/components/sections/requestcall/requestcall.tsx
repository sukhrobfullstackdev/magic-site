import React, { useCallback } from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { CallToAction, clsx } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Lottie from 'lottie-react';
import enterpriseAnimation from './json/hiro-enterprise-sdk.json';

import styles from './requestcall.module.less';

export const RequestCallSection: React.FC = () => {
  return (
    <SectionWrapper className={clsx(styles.HeroSection, 'mt-0 mt-lg-5')}>
      <div className={clsx(styles.requestCallWrapper, 'd-flex flex-column flex-lg-row align-items-lg-center')}>
        <div className={clsx(styles.requestCallImg, 'col-12 col-lg-6 pe-0 pe-lg-5')}>
          <h3 className={clsx(styles.headline, 'mb-4 d-block d-lg-none')}>We can help, at every step</h3>
          <Lottie animationData={enterpriseAnimation} loop />
        </div>
        <div className={clsx('col-12 col-lg-6 ps-0 ps-lg-5 pt-5 pt-lg-0')}>
          <h3 className={clsx(styles.headline, 'mb-4 d-none d-lg-block')}>We can help, at every step</h3>
          <p className={clsx(styles.subheadline)}>
            Magic uses existing developer standards to save you time. With Magic SDK and dedicated support, you will
            launch on time, on budget.
          </p>
          <p className={clsx(styles.subheadline)}>
            If you’re still early, <a href="/">request a consultation</a> with our team of experts, who can guide you on
            your enterprise web3 strategy.
          </p>

          <div className={clsx(styles.buttonContainer)}>
            <CallToAction.a
              onPress={useCallback(() => AnalyticsService.TrackAction('Request Call Button Clicked'), [])}
              color="primary"
              href="/contact"
              className={clsx(styles.gradientButton, styles.ctaButton, 'mt-3')}
            >
              Request a Call
            </CallToAction.a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
