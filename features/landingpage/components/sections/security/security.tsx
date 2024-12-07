import React from 'react';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import imgSecurity1 from 'public/images/landingpage/security/fff_1.svg';
import imgSecurity2 from 'public/images/landingpage/security/ddf_1.svg';
import imgSecurity3 from 'public/images/landingpage/security/eef_1.svg';
import imgMagicLogo from 'public/images/landingpage/security/magiclogo.svg';
import styles from './security.module.less';

export const Security = () => {
  return (
    <SectionWrapper className={styles.sectionWrapper}>
      <div className={clsx(styles.content)}>
        <div className={clsx('my-5 pb-0 pb-md-5 d-flex')}>
          <div className={clsx('col-12 col-md-8')}>
            <h3 className={clsx(styles.headline, 'mb-3')}>Enterprise-grade Security</h3>
            <p className={clsx(styles.subHeadline)}>Powered by Magic’s patented delegated KMS</p>
          </div>
        </div>

        <div className={clsx(styles.secColContainer, 'row')}>
          <div className={clsx('col-12 col-md-4 mb-4 mb-md-0 d-flex')}>
            <a
              href="https://trust.magic.link/"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(styles.secCol, 'align-self-stretch')}
            >
              <Image
                src={imgSecurity1}
                alt="Performance &amp; Scale"
                className={clsx(styles.secColIcon)}
                width={48}
                height={50}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <p className={clsx(styles.secColTitle, 'mb-2')}>Performance &amp; Scale</p>
              <p className={clsx(styles.secColCaption)}>
                Over 2000 wallet generations per second, on average 25x faster than industry standard
              </p>
            </a>
          </div>
          <div className={clsx('col-12 col-md-4 mb-4 mb-md-0 d-flex')}>
            <a
              href="https://trust.magic.link/"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(styles.secCol, 'align-self-stretch')}
            >
              <Image
                src={imgSecurity2}
                alt="Enterprise Compliance"
                className={clsx(styles.secColIcon)}
                width={48}
                height={50}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <p className={clsx(styles.secColTitle, 'mb-2')}>Enterprise Compliance</p>
              <p className={clsx(styles.secColCaption)}>
                Controls and business continuity ensured by SOC2 Type 2, CCPA, GDPR, HIPAA, and ISO
              </p>
            </a>
          </div>
          <div className={clsx('col-12 col-md-4 mb-4 mb-md-0 d-flex')}>
            <a
              href="https://trust.magic.link/"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(styles.secCol, 'align-self-stretch')}
            >
              <Image
                src={imgSecurity3}
                alt="Non-Custodial Wallets"
                className={clsx(styles.secColIcon)}
                width={48}
                height={50}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <p className={clsx(styles.secColTitle, 'mb-2')}>Non-Custodial Wallets</p>
              <p className={clsx(styles.secColCaption)}>
                Fully exportable keys, and users have sole control over their assets
              </p>
            </a>
          </div>
        </div>

        <div className={clsx(styles.secBackground)}>
          <div className={clsx(styles.secBackgroundInner)}>
            <div className={clsx(styles.secColLogoContainer)}>
              <Image
                src={imgMagicLogo}
                alt="Magic"
                className={clsx(styles.secColLogo, styles.secColLogoAnimated)}
                width={150}
                height={171}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.secBackground1)} />
            <div className={clsx(styles.secBackground2)} />
            <div className={clsx(styles.secBackground3)} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
