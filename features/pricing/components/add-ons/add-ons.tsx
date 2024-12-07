import React from 'react';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import imgCheckmark from 'public/images/pricing/check.svg';

import styles from './add-ons.module.less';

export const AddOnsSection: React.FC = () => {
  return (
    <SectionWrapper id="addOns" className={clsx(styles.HeroSection, 'mb-4')}>
      <div className={clsx('textCentered mb-5 pb-3')}>
        <h2 className={clsx(styles.headline)}>Add-ons</h2>
      </div>
      <div className={clsx(styles.containerBox, 'd-flex flex-column flex-md-row')}>
        <div className={clsx(styles.box, 'col-12 col-md-6 pb-5 pb-md-0 pe-0 pe-md-3')}>
          <a
            href="https://dashboard.magic.link/signup?ma_premium_bundle=true"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className={clsx(styles.boxInner)}>
              <h3> Pro Bundle </h3>
              <h4 className={clsx('my-2')}> $199 / Month </h4>
              <ul>
                <li className={clsx('d-flex align-items-center')}>
                  {' '}
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />{' '}
                  MFA with Authenticator Apps
                </li>
                <li className={clsx('d-flex align-items-center')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />{' '}
                  Custom Session Lengths
                </li>
                <li className={clsx('d-flex align-items-center')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />{' '}
                  Custom Email Provider (SMTP)
                </li>
                <li className={clsx('d-flex align-items-center')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />{' '}
                  5 Total Team Seats
                </li>
                <li className={clsx('d-flex align-items-center')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />{' '}
                  User Data Export
                </li>
              </ul>
              <a
                href="https://dashboard.magic.link/signup?ma_premium_bundle=true"
                className={clsx(styles.ctaSmall, 'mt-3')}
              >
                Learn More
              </a>
              <div className={clsx(styles.boxBackgroundBundle)} />
              <div className={clsx(styles.boxBackgroundShape)} />
            </div>
          </a>
        </div>

        <div className={clsx(styles.box, 'col-12 col-md-6 ps-0 ps-md-3')}>
          <a href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className={clsx(styles.boxInner)}>
              <h3> VIP Support </h3>
              <h4 className={clsx('my-2')}>CUSTOM PRICING</h4>
              <ul>
                <li className={clsx('d-flex align-items-center')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />{' '}
                  Dedicated Slack channel
                </li>
                <li className={clsx('d-flex align-items-center')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />{' '}
                  Custom Support SLAs
                </li>
                <li className={clsx('d-flex align-items-center')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />{' '}
                  Onboarding Support
                </li>
                <li className={clsx('d-flex align-items-center')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />{' '}
                  Implementation Assistance
                </li>
              </ul>
              <a href="/contact" className={clsx(styles.ctaSmall, 'mt-3')}>
                Learn More
              </a>
              <div className={clsx(styles.boxBackgroundSupport)} />
              <div className={clsx(styles.boxBackgroundShape)} />
            </div>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};
