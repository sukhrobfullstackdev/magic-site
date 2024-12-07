import React, { useEffect } from 'react';
import Head from 'next/head';
import { Flex, clsx, Spacer } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { PricingOptionsSection } from '../../components/pricingoptions';
import { FeaturesSection } from '../../components/features';
import { AddOnsSection } from '../../components/add-ons';
import { FaqSection } from '../../components/faq';
import { PreFooter } from '../../components/prefooter';

import styles from './pricing-view.module.less';

export const PricingView: React.FC = () => {
  useEffect(() => {
    AnalyticsService.TrackPage('Landing - Pricing');
  }, []);

  return (
    <>
      <Head>
        <title>Pricing | Magic</title>
        <meta
          name="description"
          content="Your first 1,000 MAUs with Magic are free. No credit card required. Then, only pay for what you use."
        />
        <style>{`html, body {
          background-color: #000 !important;
        }`}</style>
      </Head>
      <Flex.Column className={clsx(styles.pricing, 'pricingContainer')} horizontal="center">
        <div className={clsx(styles.pricingHero)}>
          <div className={clsx(styles.pricingInner)}>
            <PricingOptionsSection />
            <Spacer size={80} orientation="vertical" />
          </div>
          <div className={clsx(styles.topCap)} />
        </div>
        <div className={clsx(styles.pricingLightBackground)}>
          <div className={clsx(styles.pricingInner)}>
            <FeaturesSection />
            <Spacer size={80} orientation="vertical" />
            <AddOnsSection />
            <Spacer size={80} orientation="vertical" />
            <FaqSection />
          </div>
        </div>
        <PreFooter />
      </Flex.Column>
    </>
  );
};
