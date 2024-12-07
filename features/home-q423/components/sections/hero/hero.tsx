import React, { useCallback, useState, useEffect } from 'react';
import { clsx, Spacer } from '@magiclabs/ui';
import Image from 'next/image';

import { SectionWrapper } from 'components/layout/section-wrapper';
import { AnalyticsService } from 'lib/analytics-service';

import ScrollObserver from '../../../helpers/ScrollObserver';

import imgKeys from './images/keys.png';
import HeroViz from './images/HeroViz.png';
import imgCloudmask from './images/cloudmask.png';

import styles from './hero.module.less';
import { TrustedBy } from './trustedby';

export const IS_CLIENT = typeof window !== 'undefined';

export const Hero = () => {
  const [img1_loaded, set_img1_loaded] = useState(false);
  const [img2_loaded, set_img2_loaded] = useState(false);

  // trigger build

  useEffect(() => {
    ScrollObserver('.animTarget1', '.heroAnimWrapper', 'fadeInAndScale', 0, true);
    ScrollObserver('.animTarget2', '.heroAnimWrapper', 'fadeInAndScale', 150, true);
    ScrollObserver('.animTarget3', '.heroAnimWrapper', 'fadeInAndScale', 300, true);
  }, [styles]);

  return (
    <SectionWrapper
      className={clsx(
        styles.sectionWrapper,
        styles.nft_minting_disabled,
        'd-flex flex-column align-items-center justify-content-center',
      )}
    >
      <div className={clsx(styles.content)}>
        <div className="d-flex flex-column-reverse flex-md-row">
          <div className="col-12 col-md-6 d-flex flex-column justify-content-center text-center">
            <h1 className={clsx(styles.headline)}>
              The first to simplify
              <br /> wallets onchain
            </h1>

            <div>
              <p className={clsx('textXL mt-3 mb-4', styles.description)}>
                We've onboarded 35 million people to the world's leading apps. We're trusted by over 190,000 developers.
                We’re Magic.
              </p>
            </div>

            <div className={clsx('d-flex py-1 justify-content-center', styles.cta)}>
              <a
                onClick={useCallback(() => AnalyticsService.TrackAction('Hero Section Start Now Button Clicked'), [])}
                href="https://dashboard.magic.link/signup"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx('btnGlass btnLightText')}
              >
                Start now
              </a>
              <Spacer size={16} />
              <a
                onClick={useCallback(() => AnalyticsService.TrackAction('Hero Section Book a Demo button Clicked'), [])}
                href="https://magic.link/contact"
                target="_blank"
                rel="noopener noreferrer"
                className={clsx('btnGlass btnLightText btnPurple')}
              >
                Contact Sales
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6 px-md-0 pb-1 pb-md-0">
            <Image
              onLoadingComplete={() => {
                set_img1_loaded(true);
              }}
              src={HeroViz}
              width={634}
              height={487}
              className={clsx('imageLoad', img1_loaded ? 'imageLoaded ' : '')}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={clsx(styles.glassPanel)}>
        <TrustedBy />

        <div
          className={clsx(
            'heroAnimWrapper d-flex justify-content-start justify-content-sm-around flex-column flex-lg-row mt-4',
          )}
        >
          <div
            className={clsx(
              styles.largeNumberCol,
              'animTarget1 mb-3 mb-sm-0 d-flex flex-row justify-content-between col-12 col-lg',
            )}
          >
            <div className={clsx(styles.largeNumber, 'me-auto')}>190k</div>
            <h4 className={clsx(styles.largeNumberTitle, 'mb-1 mb-sm-4')}>Developers</h4>
          </div>
          <div className="" style={{ width: 20 }} />
          <div
            className={clsx(
              styles.largeNumberCol,
              'animTarget2 mb-3 mb-sm-0 d-flex flex-row justify-content-between col-12 col-lg',
            )}
          >
            <div className={clsx(styles.largeNumber, 'me-auto')}>99.9%</div>
            <h4 className={clsx(styles.largeNumberTitle, 'mb-1 mb-sm-4')}>Uptime</h4>
          </div>
          <div className="" style={{ width: 20 }} />
          <div
            className={clsx(
              styles.largeNumberCol,
              'animTarget3 mb-3 mb-sm-0 d-flex flex-row justify-content-between col-12 col-lg',
            )}
          >
            <div className={clsx(styles.largeNumber, 'me-auto')}>30+</div>
            <h4 className={clsx(styles.largeNumberTitle, 'mb-1 mb-sm-4')}>Blockchains</h4>
          </div>
        </div>
      </div>
      <Spacer size={100} orientation="vertical" />
      <div className={clsx(styles.backgroundImage, 'bgScrollTarget')}>
        <Image
          onLoadingComplete={() => {
            set_img2_loaded(true);
          }}
          alt=""
          src={imgCloudmask}
          width={1024}
          height={1024}
          className={clsx('imageLoad', img2_loaded ? 'imageLoaded' : '')}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={clsx(styles.background)} />
      <div className={clsx(styles.bottomCap)} />
    </SectionWrapper>
  );
};
