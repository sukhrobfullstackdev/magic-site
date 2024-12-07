import React, { useEffect } from 'react';
import Head from 'next/head';
import { Flex, clsx, Spacer } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
import HubspotFormEmbed from 'components/widgets/hubspot-form/hubspot-form-embed';
import { show } from '@intercom/messenger-js-sdk';
import { TrustedBy } from '../../../landingpage/components/sections/trustedby';

import styles from './contact-view.module.less';

export const ContactView: React.FC = () => {
  const handleShowIntercomMessenger = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    try {
      event.preventDefault();
      show();
    } catch (error: unknown) {
      console.log('Error showing Intercom messenger');
      console.error(error);
    }
  };

  useEffect(() => {
    AnalyticsService.TrackPage('Contact Magic');
  }, []);

  return (
    <>
      <Head>
        <title>Contact Sales | Magic</title>
        <meta
          name="description"
          content="Contact us to find out more about how you can integrate passwordless authentication into your dApp with just a few lines of code."
        />
      </Head>
      <Flex.Column className={clsx(styles.contactViewContainer)} horizontal="center">
        <SectionWrapper className={clsx(styles.SectionWrapper)}>
          <h3 className={clsx(styles.headline, 'mb-4')}>Contact Sales</h3>
          <p className={clsx(styles.subheadline, 'mb-5')}>
            Tell us a bit about your project and we can help you find the right solution.
          </p>
          <Spacer size={40} orientation="vertical" />
          <div className={clsx('d-flex flex-wrap flex-lg-nowrap position-relative')}>
            <div className={clsx(styles.contactFormCol, 'col-10 col-lg-6')}>
              <div className={clsx(styles.contactForm)}>
                <HubspotFormEmbed hubspotFormId="19f9355a-5cd3-4630-9f70-242005cdc0ad" hubspotPortalId="20846682" />
              </div>
              <div className={clsx(styles.contactFormBackground)} />
            </div>
            <div className={clsx('col-12 col-lg-6 mt-5 mt-lg-0')}>
              <div className={clsx(styles.contactSidebarBlock, 'mt-5 mb-5')}>
                <h4 className={clsx(styles.contactSidebarTitle)}>We’re here to help</h4>
                <ul className={clsx(styles.contactSidebarList)}>
                  <li className={clsx(styles.contactSidebarListItem)}>
                    <div className={clsx(styles.contactSidebarIcon)}>
                      <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.6544 3.84793C13.847 4.03546 13.8569 4.34176 13.6767 4.5413L6.40985 12.5893C6.21131 12.8092 5.86619 12.8092 5.66765 12.5893L2.32226 8.88435C2.14208 8.6848 2.15195 8.3785 2.34461 8.19097L2.8434 7.70546C3.04654 7.50772 3.37327 7.51825 3.56326 7.72866L6.03875 10.4703L12.4357 3.38562C12.6257 3.17521 12.9525 3.16468 13.1556 3.36242L13.6544 3.84793Z"
                          fill="#A799FF"
                          stroke="#A799FF"
                        />
                      </svg>
                    </div>
                    <div className={clsx(styles.contactSidebarListText)}>Find the right solution for you</div>
                  </li>
                  <li className={clsx(styles.contactSidebarListItem)}>
                    <div className={clsx(styles.contactSidebarIcon)}>
                      <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.6544 3.84793C13.847 4.03546 13.8569 4.34176 13.6767 4.5413L6.40985 12.5893C6.21131 12.8092 5.86619 12.8092 5.66765 12.5893L2.32226 8.88435C2.14208 8.6848 2.15195 8.3785 2.34461 8.19097L2.8434 7.70546C3.04654 7.50772 3.37327 7.51825 3.56326 7.72866L6.03875 10.4703L12.4357 3.38562C12.6257 3.17521 12.9525 3.16468 13.1556 3.36242L13.6544 3.84793Z"
                          fill="#A799FF"
                          stroke="#A799FF"
                        />
                      </svg>
                    </div>
                    <div className={clsx(styles.contactSidebarListText)}>Explain general enterprise contract</div>
                  </li>
                  <li className={clsx(styles.contactSidebarListItem)}>
                    <div className={clsx(styles.contactSidebarIcon)}>
                      <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.6544 3.84793C13.847 4.03546 13.8569 4.34176 13.6767 4.5413L6.40985 12.5893C6.21131 12.8092 5.86619 12.8092 5.66765 12.5893L2.32226 8.88435C2.14208 8.6848 2.15195 8.3785 2.34461 8.19097L2.8434 7.70546C3.04654 7.50772 3.37327 7.51825 3.56326 7.72866L6.03875 10.4703L12.4357 3.38562C12.6257 3.17521 12.9525 3.16468 13.1556 3.36242L13.6544 3.84793Z"
                          fill="#A799FF"
                          stroke="#A799FF"
                        />
                      </svg>
                    </div>
                    <div className={clsx(styles.contactSidebarListText)}>Provide helpful resources</div>
                  </li>
                </ul>
              </div>
              <div className={clsx(styles.contactSidebarBlock)}>
                <h4 className={clsx(styles.contactSidebarTitle)}>Have other questions?</h4>
                <p>
                  Visit our{' '}
                  <a href="https://magic.link/docs/home/welcome" rel="noopener noreferrer">
                    Docs
                  </a>{' '}
                  to learn how to integrate the Magic SDK with just a few lines of codes.
                </p>
                {typeof window !== 'undefined' && (
                  <p>
                    For technical support, please use our{' '}
                    <a href={`${window.location.href}`} onClick={handleShowIntercomMessenger}>
                      support chat widget
                    </a>{' '}
                    at the bottom of this page.
                  </p>
                )}
              </div>
            </div>
          </div>
        </SectionWrapper>

        <TrustedBy />
      </Flex.Column>
    </>
  );
};
