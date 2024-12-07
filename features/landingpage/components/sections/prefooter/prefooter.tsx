import React, { useEffect } from 'react';
import { CallToAction, clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Link from 'next/link';
import Image from 'next/image';
import imgMagicLogo from 'public/images/landingpage/prefooter/magiclogo.svg';
import styles from './prefooter.module.less';

export const IS_CLIENT = typeof window !== 'undefined';

export const PreFooter = () => {
  return (
    <SectionWrapper className={clsx(styles.sectionWrapper, 'mt-5')}>
      <div className={clsx(styles.content)}>
        <div className={clsx('textCentered')}>
          <Image
            src={imgMagicLogo}
            className={clsx(styles.prefooterLogo)}
            alt="Magic"
            width={80}
            height={80}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </div>

        <div className={clsx('mt-4 mb-5')}>
          <h2 className={clsx(styles.headline, 'textCentered')}>Let’s make magic.</h2>
          <div className={clsx('textCentered')}>Get started in minutes. No credit card required.</div>
        </div>

        <div className={clsx('textCentered')}>
          <CallToAction.a
            color="primary"
            href="https://dashboard.magic.link/signup"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(styles.gradientButton, styles.ctaButton)}
          >
            Start now
          </CallToAction.a>

          <Link passHref href="/contact" legacyBehavior>
            <CallToAction.a className={clsx(styles.outlineButton, styles.ctaButton, 'ms-3')}>
              Contact Sales
            </CallToAction.a>
          </Link>
        </div>
      </div>
      <div className={clsx(styles.starfield)} />
      <div className={clsx(styles.background)} />
      <div className={clsx(styles.topCap)} />
    </SectionWrapper>
  );
};
