import React, { useCallback, useEffect } from 'react';
import { clsx, CallToAction, Spacer } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
// import { PPSlideshow } from './pp_slideshow';
import Image from 'next/image';
import ScrollObserver from '../../../../helpers/ScrollObserver';
import styles from './enterprise.module.less';
import { SpeedTest } from './speed_test';

import imgEnterprisePlaceholder from './images/enterpriseplaceholder.png';
import iconLightning from '../icons/lightning.svg';
import iconMobile from '../icons/mobile.svg';
import iconCube from '../icons/cube.svg';
import iconLock from '../icons/lock.svg';

export const ProductsEnterprise = ({ alignment }) => {
  const bulletPoints = [
    {
      icon: iconLightning,
      title: 'Battle-tested performance',
      body: 'Scales to 2000+ wallet generations per second',
    },
    {
      icon: iconMobile,
      title: 'On-call VIP Support',
      body: 'Dedicated support teams',
    },
    {
      icon: iconCube,
      title: 'White-Glove Service',
      body: 'Custom development and implementation support',
    },
    {
      icon: iconLock,
      title: 'Guaranteed SLAs',
      body: '99.9% uptime',
    },
  ];

  useEffect(() => {
    ScrollObserver('.animTarget1', '.enterpriseAnimWrapper', 'fadeInAndScale', 0);
  }, [styles]);

  return (
    <SectionWrapper className={clsx(styles.sectionWrapper, 'enterpriseAnimWrapper')}>
      <Spacer size={60} orientation="vertical" />
      <div className={clsx(styles.content)}>
        <div className={clsx('d-flex flex-column-reverse flex-md-row flex-md-nowrap align-items-center')}>
          <div
            className={clsx('pe-0 pe-lg-5 ps-xl-5 ps-xxl-0 col-12 col-md-6 d-flex flex-column justify-content-center ')}
          >
            <h4>Enterprise Scale</h4>
            <h3>
              Operate with <br />
              confidence
            </h3>
            <div className={clsx(styles.checkListContainer, 'd-none d-lg-block mt-5')}>
              <ul className={clsx('d-flex flex-wrap')}>
                {bulletPoints.map(o => {
                  return (
                    <li key={o.icon} className={clsx('col-12 col-lg-6 d-flex align-items-start pe-3 mb-3 mb-lg-5')}>
                      <div className={clsx(styles.checklistIcon)}>
                        <Image src={o.icon} width={32} height={32} alt="" />
                      </div>
                      <div className={clsx('ps-3')}>
                        <div className={clsx('textBold pb-1')}>{o.title}</div>
                        <div className={clsx(styles.checklistItem)}>{o.body}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className={clsx('mb-5 mb-md-0 pe-0 pe-md-5 col-12 col-md-6  d-flex flex-column justify-content-center')}>
            <div className={clsx(styles.slideContainer, 'animTarget1')}>
              {/* <Image
                className={clsx('animTarget1')}
                src={imgEnterprisePlaceholder}
                width={696}
                height={731}
                layout="responsive"
              /> */}
              <SpeedTest />
            </div>
          </div>
        </div>

        <div className={clsx(styles.checkListContainer, 'd-block d-lg-none mt-5')}>
          <ul className={clsx('d-flex flex-wrap')}>
            {bulletPoints.map(o => {
              return (
                <li key={o.icon} className={clsx('col-12 col-sm-6 d-flex align-items-start pe-3 mb-3 mb-lg-5')}>
                  <div className={clsx(styles.checklistIcon)}>
                    <Image src={o.icon} width={32} height={32} alt="" />
                  </div>
                  <div className={clsx('ps-3')}>
                    <div className={clsx('textBold pb-1')}>{o.title}</div>
                    <div className={clsx(styles.checklistItem)}>{o.body}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={clsx('mt-2')}>
          <CallToAction.a
            onPress={useCallback(() => AnalyticsService.TrackAction('Plug & Play Section Button Clicked'), [])}
            href="https://magic.link/contact"
            rel="noopener noreferrer"
            className={clsx(styles.ctaButton)}
          >
            Contact Sales
          </CallToAction.a>
        </div>
      </div>
    </SectionWrapper>
  );
};
