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
          <h2 className={clsx(styles.headline, 'textCentered')}>Ready to start?</h2>
          <p className={clsx('textCentered mt-3')}>Get in touch or create an account.</p>
        </div>

        <div className={clsx('textCentered')}>
          <a
            href="https://dashboard.magic.link/signup"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx('btnGlass btnLightText')}
          >
            Start now
          </a>

          <a
            href="https://magic.link/contact"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx('ms-3 btnGlass btnPurple btnLightText')}
          >
            Contact Sales
          </a>
        </div>
      </div>
      <div className={clsx(styles.starfield)} />
      <div className={clsx(styles.background)} />
      <div className={clsx(styles.topCap)} />
    </SectionWrapper>
  );
};
