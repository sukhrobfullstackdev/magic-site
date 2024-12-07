import React, { useCallback, useEffect } from 'react';
import { clsx, CallToAction } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import imgStackPlaceholder from 'public/images/landingpage/wl_stack/stack_placeholder.png';
import imgStack from 'public/images/landingpage/wl_stack/mattel-mws-stack.png';
import styles from './whitelabel.module.less';
import ScrollObserver from '../../../helpers/ScrollObserver';

export const WhiteLabel = () => {
  useEffect(() => {
    ScrollObserver('.stackTarget', '.animWrapper', styles.stackContainerAnimated!, 0);
    ScrollObserver('.capTarget', '.animWrapper', styles.rightCapAnimated!, 300);
  }, [styles]);

  return (
    <SectionWrapper className={clsx(styles.sectionWrapper, 'animWrapper')}>
      <div className={clsx(styles.content)}>
        <div className={clsx('d-flex flex-column-reverse flex-md-row flex-wrap flex-md-nowrap')}>
          <div className={clsx('col-12 col-md-6 d-flex flex-column justify-content-center pt-5 pt-md-0')}>
            <h3 className={clsx(styles.headline)}>Dedicated Wallet</h3>
            <div className={clsx(styles.checkListContainer)}>
              <ul>
                <li>Fully customizable; optional UI widgets</li>
                <li>10+ authentication methods or plug into your existing identity provider</li>
                <li>Enterprise-grade, fast and scalable</li>
              </ul>
            </div>
            <div>
              <CallToAction.a
                onPress={useCallback(() => AnalyticsService.TrackAction('White Label Section Button Clicked'), [])}
                color="primary"
                href="https://magic.link/enterprise"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(styles.ctaButton)}
              >
                Learn More
              </CallToAction.a>
            </div>
          </div>
          <div className={clsx('col-12 col-md-6')}>
            <div className={clsx(styles.stackContainer, 'stackTarget')}>
              <Image
                src={imgStackPlaceholder}
                alt="Stack"
                className={clsx(styles.stackPlaceholder)}
                width={588}
                height={509}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
              <Image
                src={imgStack}
                alt="Stack"
                className={clsx(styles.stackImage)}
                width={588}
                height={509}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.rightCap, 'capTarget')} />
    </SectionWrapper>
  );
};
