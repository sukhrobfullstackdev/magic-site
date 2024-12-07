import React, { useEffect } from 'react';
import { Flex, PreventTypographicOrphans } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';

import Head from 'next/head';
import { HeroSection } from '../careers-sections/hero-section';
import { PassportSection } from '../careers-sections/passport-section';
import { CoreValuesSection } from '../careers-sections/core-values-section';
import { CultureSection } from '../careers-sections/culture-section';
import { DiversitySection } from '../careers-sections/diversity-section';
import { PerksAndBenefitsSection } from '../careers-sections/perks-and-benefits-section';
import { RolesSection } from '../careers-sections/roles-section';
import { ConclusionSection } from '../careers-sections/conclusion-section';

export function CareersView() {
  useEffect(() => {
    AnalyticsService.TrackPage('Landing - Careers');
  }, []);

  return (
    <>
      <Head>
        <title>Careers | Magic</title>
        <meta
          name="description"
          content="We’re a globally distributed team passionate about building a more authentic internet for all."
        />
      </Head>
      <PreventTypographicOrphans>
        <Flex.Column horizontal="center">
          <HeroSection />
          <PassportSection />
          <CoreValuesSection />
          <CultureSection />
          <DiversitySection />
          <PerksAndBenefitsSection />
          <RolesSection />
          <ConclusionSection />
        </Flex.Column>
      </PreventTypographicOrphans>
    </>
  );
}
