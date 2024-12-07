import { SectionWrapper } from 'components/layout/section-wrapper';
import React, { useCallback } from 'react';
import { clsx } from '@magiclabs/ui';

import styles from './launch-section.module.less';
import { HeroMarquee } from '../../partials/marquee/marquee';
import { AnalyticsService } from '../../../../../lib/analytics-service';

export const LaunchSection = () => {
  return (
    <SectionWrapper className={styles.LaunchSection}>
      <h2
        className={clsx('headingLight textCentered pb-0 mb-3')}
        style={{ maxWidth: 500, position: 'relative', zIndex: 2 }}
      >
        Ready to launch your <br />
        NFT collection?
      </h2>
      <div
        className={clsx('d-flex justify-content-center justify-content-md-start mt-4 py-1')}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <a
          onClick={useCallback(() => AnalyticsService.TrackAction('Hero Section Book a Demo button Clicked'), [])}
          href="https://magic.link/contact"
          target="_blank"
          rel="noopener noreferrer"
          className={clsx('btnGlass btnLightText btnPurple')}
        >
          Contact Sales
        </a>
      </div>
      <HeroMarquee className={styles.Marquee} />
    </SectionWrapper>
  );
};
