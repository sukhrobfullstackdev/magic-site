import React from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import { OptionsSection } from './options/options';

import styles from './pricingoptions.module.less';

export const PricingOptionsSection: React.FC = () => {
  return (
    <SectionWrapper className={clsx(styles.HeroSection)}>
      <h1 className={clsx(styles.headline, 'textCentered my-5 mx-auto')}>
        Discover the perfect plan for your business
      </h1>
      <OptionsSection />
    </SectionWrapper>
  );
};
