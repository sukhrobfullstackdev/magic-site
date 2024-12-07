import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, clsx, Spacer } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import { AnalyticsService } from 'lib/analytics-service';
import { HeroSection } from '../sections/hero';
import { BuildUxSection } from '../sections/buildux';
import { FeaturesSection } from '../sections/features';
import { RequestCallSection } from '../sections/requestcall';
import { ContactUsSection } from '../sections/contactus';
import { StackAnimationSection } from '../sections/stackanimation';

import styles from './enterprise-view.module.less';

export const EnterpriseView: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    AnalyticsService.TrackPage('Landing - Enterprise');
  }, []);

  const startFreeTrial = useCallback(() => {
    AnalyticsService.TrackAction('Pricing - Start Free Trial Clicked');
    const dashboardSignupLink = 'https://dashboard.magic.link/signup';
    window.open(dashboardSignupLink, '_blank');
  }, []);

  return (
    <>
      <Head>
        <title>Magic Enterprise Services | Magic</title>
        <meta
          name="description"
          content="Magic's Enterprise Services offers web3 wallet SDK options that integrate seamlessly with any identity provider."
        />
      </Head>
      <Flex.Column className={clsx(styles.enterprise, styles.infoColumnViewContainer)} horizontal="center">
        <HeroSection />
        <Spacer size={0} orientation="vertical" />
        <StackAnimationSection />
        <Spacer size={0} orientation="vertical" />
        <BuildUxSection />
        <Spacer size={80} orientation="vertical" />
        <FeaturesSection />
        <Spacer size={80} orientation="vertical" />
        <RequestCallSection />
        <Spacer size={80} orientation="vertical" />
        <div className={clsx(styles.contactWrapper)}>
          <ContactUsSection />
          <div className={clsx(styles.contactBg)} />
        </div>
      </Flex.Column>
    </>
  );
};
