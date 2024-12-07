import React from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { clsx, Spacer } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import HubspotFormEmbed from 'components/widgets/hubspot-form/hubspot-form-embed';

import styles from './contactus.module.less';

export const ContactUsSection: React.FC = () => {
  return (
    <SectionWrapper id="bookform" className={clsx(styles.HeroSection, 'mt-0 mt-md-5')}>
      <div className={clsx(styles.requestCallWrapper, 'd-flex flex-column flex-md-row')}>
        <div className={clsx('col-12 col-md-6 pe-0 pe-md-5')}>
          <h3 className={clsx(styles.headline, 'mb-4')}>Delight your customers</h3>
          <p className={clsx(styles.subheadline)}>
            Tell us a bit about your project and we can help you build a custom web3 experience that your customers will
            love.
          </p>
        </div>
        <div className={clsx('col-12 col-md-6 ps-0 ps-md-5 pt-5 pt-md-0')}>
          <div className={clsx(styles.requestCallForm)}>
            <HubspotFormEmbed hubspotFormId="19f9355a-5cd3-4630-9f70-242005cdc0ad" hubspotPortalId="20846682" />
          </div>
        </div>
      </div>
      <Spacer size={80} orientation="vertical" />
    </SectionWrapper>
  );
};
