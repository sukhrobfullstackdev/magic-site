import React, { useCallback, useEffect } from 'react';
import { clsx, CallToAction, Spacer } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
// import { PPSlideshow } from './pp_slideshow';
import Image from 'next/image';
import ScrollObserver from '../../../../helpers/ScrollObserver';
import styles from './nfts.module.less';

import { LiveConsole } from './live_console';

import imgNftsPlaceholder from './images/nftsplaceholder.png';
import iconLightning from '../icons/lightning.svg';
import iconKey from '../icons/key.svg';
import iconLock from '../icons/lock.svg';
import iconCheck from '../icons/check.svg';

export const GetStarted = ({ alignment }) => {
  const bulletPoints = [
    {
      icon: iconLightning,
      title: 'Magic SDK',
      body: 'Set up and run an app in less than 2 mins',
    },
    {
      icon: iconKey,
      title: 'Non-custodial',
      body: 'Users have sole control over their keys and assets',
    },
    {
      icon: iconLock,
      title: 'Top-tier Security',
      body: 'SOC 2 Type II, HIPAA, and ISO 27001:2013 compliant',
    },
    {
      icon: iconCheck,
      title: 'Guaranteed SLAs',
      body: '99.9% uptime',
    },
  ];

  useEffect(() => {
    ScrollObserver('.animTarget1', '.walletsAnimWrapper', 'fadeInAndScale', 0);
  }, [styles]);

  return (
    <SectionWrapper className={clsx(styles.sectionWrapper, 'walletsAnimWrapper')}>
      <div className={clsx(styles.content)}>
        <div className={clsx('d-flex flex-column flex-lg-row flex-lg-nowrap ')}>
          <div className={clsx('col-12 col-lg-6 d-flex flex-column justify-content-center mb-lg-0')}>
            <div className={clsx(styles.slideContainer, 'slideTarget')}>
              <LiveConsole />
            </div>
          </div>
          <div className={clsx('pe-0 pe-md-5 pt-5 col-12 col-lg-6 d-flex flex-column pt-lg-0')}>
            <div className="d-flex justify-content-center justify-content-md-start">
              <h3 className="text-nowrap">Get started in minutes.</h3>
            </div>

            <div className={clsx(styles.checkListContainer, 'd-none d-lg-block mt-5')}>
              <ul className={clsx('d-flex flex-wrap')}>
                {bulletPoints.map(o => (
                  <li key={o.icon} className={clsx('col-12 col-lg-6 d-flex align-items-start pe-3 mb-3 mb-lg-5')}>
                    <div className={clsx(styles.checklistIcon)}>
                      <Image src={o.icon} width={32} height={32} alt={o.title} />
                    </div>
                    <div className={clsx('ps-3')}>
                      <div className={clsx('textBold pb-1')}>{o.title}</div>
                      <div className={clsx(styles.checklistItem)}>{o.body}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={clsx('d-none d-lg-flex justify-content-center justify-content-lg-start mt-3 mt-sm-0')}>
              <CallToAction.a
                href="https://magic.link/docs"
                rel="noopener noreferrer"
                className={clsx('btnLarge btnLightText btnPurple me-4')}
              >
                Quickstart Guide
              </CallToAction.a>
              <CallToAction.a
                href="https://magic.link/docs"
                rel="noopener noreferrer"
                className={clsx(styles.ctaButton, 'btnLarge ')}
              >
                Get API Keys
              </CallToAction.a>
            </div>
          </div>
        </div>

        <div className={clsx(styles.checkListContainer, 'd-block d-lg-none mt-5')}>
          <ul className={clsx('d-flex flex-wrap')}>
            {bulletPoints.map(o => (
              <li key={o.icon} className={clsx('col-12 col-sm-6 d-flex align-items-start pe-3 mb-3 mb-sm-5')}>
                <div className={clsx(styles.checklistIcon)}>
                  <Image src={o.icon} width={32} height={32} alt={o.title} />
                </div>
                <div className={clsx('ps-3')}>
                  <div className={clsx('textBold pb-1')}>{o.title}</div>
                  <div className={clsx(styles.checklistItem)}>{o.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={clsx('d-flex d-lg-none justify-content-center px-4 pt-4')}>
          <CallToAction.a
            href="https://magic.link/docs"
            rel="noopener noreferrer"
            className={clsx('btnLarge btnLightText btnPurple me-4')}
          >
            Quickstart Guide
          </CallToAction.a>
          <CallToAction.a
            href="https://magic.link/docs"
            rel="noopener noreferrer"
            className={clsx(styles.ctaButton, 'btnLarge ')}
          >
            Get API Keys
          </CallToAction.a>
        </div>
      </div>
    </SectionWrapper>
  );
};
