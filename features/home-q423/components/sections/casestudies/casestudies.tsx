import React, { useState, useEffect, useCallback } from 'react';
import { clsx, Spacer, CallToAction } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import ScrollObserver from '../../../helpers/ScrollObserver';
import styles from './casestudies.module.less';

import imgBackgroundmask from './images/backgroundmask.png';
import imgCaseStudyPlaceholder from './images/casestudyplaceholder.png';
import imgCaseStudyLogo1 from './images/mattel.svg';
import heliumPng from './images/helium.png';
import heliumSvg from './images/helium.svg';

export const CaseStudies = () => {
  const [img1_loaded, set_img1_loaded] = useState(false);

  useEffect(() => {
    ScrollObserver('.animTarget1', '.caseStudyAnimWrapper', 'fadeInAndScale', 0);
  }, [styles]);

  return (
    <SectionWrapper className={clsx(styles.sectionWrapper, 'caseStudyAnimWrapper')}>
      <div className={clsx(styles.imageContent, 'animTarget1 d-flex flex-column justify-content-center')}>
        <Image
          src={heliumPng}
          width={658}
          height={599}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
          alt=""
        />
      </div>
      <div className={clsx(styles.caseStudyContainer, 'mx-auto my-3')}>
        <div
          className={clsx(
            'd-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-center',
          )}
        >
          <div className={clsx('')}>
            <Image src={heliumSvg} width={80} height={80} alt="" />
          </div>
          <div className={clsx('pt-sm-0 ps-0 ps-sm-5')}>
            <h4>Depin & Wireless Networks</h4>
            <div className={clsx('mt-2')}>
              <p>
                Helium provides decentralized wireless infrastructure such as mobile service and low-power connectivity
                for IoT devices, using blockchain technology to incentivize user-hosted hotspots.
              </p>
            </div>
            <div className={clsx('mt-4')}>
              <CallToAction.a
                onPress={useCallback(() => AnalyticsService.TrackAction('Plug & Play Section Button Clicked'), [])}
                href="https://magic.link/posts/helium-magic-partner"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(styles.ctaButton, 'btnLarge')}
              >
                Learn More
              </CallToAction.a>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.backgroundImage)}>
        <Image
          onLoadingComplete={() => {
            set_img1_loaded(true);
          }}
          src={imgBackgroundmask}
          width={1920}
          height={675}
          className={clsx('imageLoad', img1_loaded ? 'imageLoaded' : '')}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
          alt=""
        />
      </div>
    </SectionWrapper>
  );
};
