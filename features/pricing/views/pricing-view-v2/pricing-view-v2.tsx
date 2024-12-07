import React, { useEffect } from 'react';
import Head from 'next/head';
import { clsx, Spacer } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { PreFooter } from '../../components/prefooter';

import { PlanSummary } from '../../components/plan-summary/plan-summary';
import { CustomPricing } from '../../components/custom-pricing/custom-pricing';
import { TrustedBy } from '../../components/trusted-by/trusted-by';
import { FAQs } from '../../components/faqs/faqs';
import { CompareAllFeatures } from '../../components/compare-all-features/compare-all-features';

import styles from './pricing-view-v2.module.less';

export const PricingViewV2 = (props: any, c: any): React.ReactNode => {
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
          background: radial-gradient(109.18% 87.69% at 50% 0%, #FFF 0%, #F8F8F8 24%, #DFDFDF 100%) !important;
        }`}</style>
      </Head>

      <div className={clsx(styles.pagePricing)}>
        {/* page title */}
        <div className={clsx(styles.contentTitle)}>
          <h1 className={clsx(styles.copyTitle, 'typography-h1')}>Discover the perfect plan</h1>
        </div>

        {/* pricing */}
        <div className={clsx(styles.contentPricing)}>
          <PlanSummary />

          <Spacer size={24} orientation="vertical" />

          <CustomPricing />
        </div>

        <Spacer size={126} orientation="vertical" />

        <TrustedBy />

        <div className={styles.contentWhiteBoard}>
          <CompareAllFeatures />
          <Spacer size={120} orientation="vertical" />
          <FAQs />
        </div>

        <PreFooter />
      </div>
    </>
  );
};
