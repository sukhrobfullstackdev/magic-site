import React, { useEffect } from 'react';
import { Flex, PreventTypographicOrphans, Spacer } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import LazyLoad from 'react-lazy-load';

import { SEO } from 'components/partials/seo';

// Homepage sections
import { Hero } from '../sections/hero';
import { TrustedBy } from '../sections/trustedby';
import { PlugAndPlay } from '../sections/plugandplay';
import { WhiteLabel } from '../sections/whitelabel';
import { CompatibleWith } from '../sections/compatiblewith';
import { Onboarding } from '../sections/onboarding';
import { Security } from '../sections/security';
import { Testimonials } from '../sections/testimonials';
import { Investors } from '../sections/investors';
import { PreFooter } from '../sections/prefooter';

// import '/styles/custom.css';
import styles from './landingpage-container.module.less';

export const LandingPageContainer: React.FC = () => {
  useEffect(() => {
    AnalyticsService.TrackPage('Landing - Home');
  }, []);

  return (
    <div className={styles.sectionWrapper}>
      <SEO
        title="Magic | Web3 Auth & Key Management SDKs"
        description="Onboard users to your dApp with just an email, phone number, or social login. Multi-chain, highly scalable, and battle-tested."
        image="/images/og-img.png"
      />
      <PreventTypographicOrphans>
        <Flex.Column horizontal="center" className={styles.LandingPageContainer}>
          <Hero />
          {process.env.NEXT_PUBLIC_NFT_MINTING_ENABLED === 'true' && <Spacer size={60} orientation="vertical" />}
          <TrustedBy />
          <LazyLoad height="auto">
            <PlugAndPlay />
          </LazyLoad>
          <Spacer size={60} orientation="vertical" />
          <LazyLoad height="auto">
            <WhiteLabel />
          </LazyLoad>
          <LazyLoad height="auto">
            <CompatibleWith />
          </LazyLoad>
          <LazyLoad height="auto">
            <Onboarding />
          </LazyLoad>
          <LazyLoad height="auto">
            <Security />
          </LazyLoad>
          <LazyLoad height="auto">
            <Testimonials />
          </LazyLoad>
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
