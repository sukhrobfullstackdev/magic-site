import React, { useCallback, useEffect } from 'react';
import { clsx, CallToAction } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
import { PPSlideshow } from './pp_slideshow';
import ScrollObserver from '../../../helpers/ScrollObserver';
import styles from './plugandplay.module.less';

export const PlugAndPlay = () => {
  useEffect(() => {
    ScrollObserver('.slideTarget', '.slideAnimWrapper', styles.slideContainerAnimated!, 0);
    ScrollObserver('.leftCapTarget', '.slideAnimWrapper', styles.leftCapAnimated!, 300);
  }, [styles]);

  return (
    <SectionWrapper className={clsx(styles.sectionWrapper, 'slideAnimWrapper')}>
      <div className={clsx(styles.content)}>
        <div className={clsx('d-flex flex-wrap flex-md-nowrap')}>
          <div className={clsx('col-12 col-md-6  d-flex flex-column justify-content-center')}>
            <div className={clsx(styles.slideContainer, 'slideTarget')}>
              <PPSlideshow />
            </div>
          </div>
          <div className={clsx('col-12 col-md-6 d-flex flex-column justify-content-center pt-5 pt-sm-0')}>
            <h3 className={clsx(styles.headline)}>Universal Wallet</h3>
            <div className={clsx(styles.checkListContainer)}>
              <ul>
                <li>Out-of-the-box wallet UI for login, NFT Checkout & Gallery, fiat on-ramp, and more</li>
                <li>Over 90% conversion with email, Google One Tap, or third-party wallets</li>
                <li>Designed for users of all levels</li>
              </ul>
            </div>
            <div>
              <CallToAction.a
                onPress={useCallback(() => AnalyticsService.TrackAction('Plug & Play Section Button Clicked'), [])}
                href="https://dashboard.magic.link/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </CallToAction.a>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.leftCap, 'leftCapTarget')} />
    </SectionWrapper>
  );
};
