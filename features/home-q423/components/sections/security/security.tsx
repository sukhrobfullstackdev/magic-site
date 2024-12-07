import React, { useCallback } from 'react';
import { clsx, CallToAction } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
// import imgSecurity1 from 'public/images/landingpage/security/fff_1.svg';
// import imgSecurity2 from 'public/images/landingpage/security/ddf_1.svg';
// import imgSecurity3 from 'public/images/landingpage/security/eef_1.svg';
// import imgMagicLogo from 'public/images/landingpage/security/magiclogo.svg';
import imgSecurityBg from './images/securityBackground.png';
import styles from './security.module.less';

export const Security = () => {
  return (
    <SectionWrapper className={styles.sectionWrapper}>
      <div className={clsx(styles.content)}>
        <div className={clsx('d-flex flex-column flex-md-row')}>
          <div className={clsx(styles.securityContent, 'col-12 col-lg-5 col-xl-6')}>
            <h4>Security</h4>
            <h3 className={clsx('headingLight mb-5')}>
              Top-tier security
              <br />
              for peace of mind
            </h3>

            <p className={clsx('mb-3')}>
              Magic's patented Delegated Key Management System was designed for security, scalability, and performance.
            </p>
            <p className={clsx('mb-5')}>
              Compliance and business continuity ensured by SOC 2 Type 2, HIPAA, and ISO 27001:2013.
            </p>

            <div>
              <a
                onClick={useCallback(() => AnalyticsService.TrackAction('Security Learn More Button Clicked'), [])}
                href="/docs/home/security"
                rel="noopener noreferrer"
                className={clsx('btnGlass btnLightText')}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.securityBackground)} style={{ backgroundImage: 'url(' + imgSecurityBg + ')' }} />
    </SectionWrapper>
  );
};
