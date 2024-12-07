import React, { useEffect } from 'react';
import { Flex, PreventTypographicOrphans, Spacer, clsx } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import LazyLoad from 'react-lazy-load';

import { SEO } from 'components/partials/seo';

// Homepage sections
import { Hero } from '../sections/hero';
import { Security } from '../sections/security';
import { Investors } from '../sections/investors';
import { PreFooter } from '../sections/prefooter';
import { CaseStudiesSectionTitle } from '../sections/casestudies/sectiontitle';
import { CaseStudies } from '../sections/casestudies';
import { ProductsWallets } from '../sections/products/wallets';
import { ProductsNfts } from '../sections/products/nfts';
import { GetStarted } from '../sections/products/nfts/get_started';
import { ProductsEnterprise } from '../sections/products/enterprise';

import styles from './home-container.module.less';

export const HomeContainer: React.FC = () => {
  useEffect(() => {
    AnalyticsService.TrackPage('Landing - Home');
  }, []);

  return (
    <div className={clsx(styles.sectionWrapper)}>
      <SEO
        title="Magic | Web3 Auth & Wallet SDKs"
        description="We've onboarded 35 million people to the world's leading apps. We're trusted by over 190,000 developers. We're Magic."
        image="/images/og-img.png"
      />
      <PreventTypographicOrphans>
        <Flex.Column horizontal="center" className={styles.LandingPageContainer}>
          <div className={clsx('homeContainer')}>
            <div style={{ overflowY: 'hidden' }}>
              <Hero />
            </div>
            <Spacer className="d-block d-md-none" size={40} orientation="vertical" />
            <Spacer className="d-none d-md-block" size={120} orientation="vertical" />
            <LazyLoad height="auto">
              <GetStarted alignment="imageLeft" />
            </LazyLoad>
            <Spacer size={120} orientation="vertical" />
            <LazyLoad height="auto">
              <ProductsWallets alignment="imageRight" />
            </LazyLoad>
            <Spacer size={60} orientation="vertical" />
            <LazyLoad height="auto">
              <CaseStudiesSectionTitle />
            </LazyLoad>
            <LazyLoad height="auto">
              <CaseStudies />
            </LazyLoad>
            <Spacer size={60} orientation="vertical" />
            <LazyLoad height="auto">
              <Security />
            </LazyLoad>
          </div>
          <LazyLoad height="auto">
            <Investors />
          </LazyLoad>
          <LazyLoad height="auto">
            <PreFooter />
          </LazyLoad>
        </Flex.Column>
      </PreventTypographicOrphans>
    </div>
  );
};
