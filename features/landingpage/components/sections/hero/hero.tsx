import React, { useCallback, useEffect, useState } from 'react';
import { CallToAction, clsx, Spacer } from '@magiclabs/ui';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import { SectionWrapper } from 'components/layout/section-wrapper';
import { AnalyticsService } from 'lib/analytics-service';

import imgMountains1 from 'public/images/landingpage/hero/mountains1.png';
import imgMoons from 'public/images/landingpage/hero/moons.png';
import imgStarfield from 'public/images/landingpage/hero/starfield.png';
import styles from './hero.module.less';
import { HeroDemo } from './hero_demo';

export const IS_CLIENT = typeof window !== 'undefined';

export const Hero = () => {
  const [img1_loaded, set_img1_loaded] = useState(false);
  const [img2_loaded, set_img2_loaded] = useState(false);
  const [img3_loaded, set_img3_loaded] = useState(false);
  const [img4_loaded, set_img4_loaded] = useState(false);

  const throttle = (fn, wait) => {
    let time = Date.now();
    return function () {
      if (time + wait - Date.now() < 0) {
        fn();
        time = Date.now();
      }
    };
  };
  const parallax = () => {
    const scrolled = window.pageYOffset;
    const pTarget1: any = document.querySelector('.moonsScrollTarget');
    const pTarget1coords: string = Math.round(scrolled * 0.75) + 'px';
    const pTarget1coords2: number = 1 - (scrolled * 0.1) / 100;
    if (pTarget1 !== undefined && pTarget1) {
      pTarget1.style.transform = 'translateY(' + pTarget1coords + ')';
      pTarget1.style.filter = 'brightness(' + pTarget1coords2 + ')';
    }
    const pTarget2: any = document.querySelector('.mountains2ScrollTarget');
    const pTarget2coords: string = '-' + Math.round(scrolled * 0.25) + 'px';
    const pTarget2coords2: number = 1 - (scrolled * 0.2) / 100;
    if (pTarget2 !== undefined && pTarget2) {
      pTarget2.style.bottom = pTarget2coords;
      pTarget2.style.filter = 'brightness(' + pTarget2coords2 + ')';
    }
    const pTarget3: any = document.querySelector('.heroContentScrollTarget');
    const pTarget3coords1: number = 1 - (scrolled * 0.2) / 100;
    const pTarget3coords2: string = -Math.round(scrolled * 0.2) + 'px';
    if (pTarget3 !== undefined && pTarget3) {
      pTarget3.style.opacity = pTarget3coords1;
      pTarget3.style.transform = 'translateY(' + pTarget3coords2 + ')';
    }
    const pTarget4: any = document.querySelector('.mountains1ScrollTarget');
    const pTarget4coords: string = '-' + Math.round(scrolled * 0.1) + 'px';
    const pTarget4coords2: number = 1 - (scrolled * 0.1) / 100;
    if (pTarget4 !== undefined && pTarget4) {
      pTarget4.style.bottom = pTarget4coords;
      pTarget4.style.filter = 'brightness(' + pTarget4coords2 + ')';
    }
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      if (subscribed && IS_CLIENT) {
        window.addEventListener('scroll', throttle(parallax, 3));
      }
    }
    return () => {
      subscribed = false;
    };
  }, [IS_CLIENT]);

  return (
    <SectionWrapper
      className={clsx(
        styles.sectionWrapper,
        process.env.NEXT_PUBLIC_NFT_MINTING_ENABLED === 'true' ? '' : styles.nft_minting_disabled,
        'textCentered heroAnimWrapper heroWrapperScrollTarget d-flex flex-column align-items-center justify-content-center',
      )}
    >
      <div className={clsx(styles.content, 'heroContentScrollTarget')}>
        <div className="">
          <h2 className={clsx(styles.preheadline)}>Hyperscale. Non-custodial.</h2>

          <h2 className={clsx(styles.headline)}>Wallets built to convert.</h2>

          <div className={clsx(styles.subheadline)}>
            <p className={clsx('textXL mb-3')}>A powerful SDK to simplify web3 wallet creation and onboarding</p>
          </div>

          <div className={clsx('d-flex justify-content-center py-1')}>
            {
              // Trigger Build
            }
            <CallToAction.a
              onPress={useCallback(() => AnalyticsService.TrackAction('Hero Section Signup Button Clicked'), [])}
              color="primary"
              href="https://dashboard.magic.link/signup"
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(styles.gradientButton, styles.ctaButton)}
            >
              Start now
            </CallToAction.a>

            <Spacer size={16} />

            <Link passHref href="/contact" legacyBehavior>
              <CallToAction.a
                onPress={useCallback(
                  () => AnalyticsService.TrackAction('Hero Section Talk to an Expert button Clicked'),
                  [],
                )}
                className={clsx(styles.outlineButton, styles.ctaButton)}
              >
                Contact Sales
              </CallToAction.a>
            </Link>
          </div>
          <Spacer size={150} orientation="vertical" />
        </div>
      </div>
      {process.env.NEXT_PUBLIC_NFT_MINTING_ENABLED === 'true' && (
        <div>
          <HeroDemo />
          <div className={clsx(styles.disclaimer, 'p-3')}>
            By clicking Mint, you agree to receive marketing-related electronic communications from Magic Labs, Inc.
          </div>
        </div>
      )}
      <div className={clsx(styles.backgroundsContainer, 'backgroundsContainerScrollTarget')}>
        <Image
          onLoadingComplete={() => {
            set_img1_loaded(true);
          }}
          className={clsx(
            styles.heroImageLoad,
            styles.mountains1,
            img1_loaded ? styles.heroImageLoaded : '',
            'mountains1ScrollTarget heroImageLoad',
          )}
          src={imgMountains1}
          alt="Magic"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
            objectPosition: 'center bottom',
          }}
        />
        <Image
          onLoadingComplete={() => {
            set_img2_loaded(true);
          }}
          className={clsx(
            styles.heroImageLoad,
            styles.mountains2,
            img2_loaded ? styles.heroImageLoaded : '',
            'mountains2ScrollTarget heroImageLoad',
          )}
          src={imgMountains1}
          alt="Magic"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
            objectPosition: 'center bottom',
          }}
        />
        <Image
          onLoadingComplete={() => {
            set_img3_loaded(true);
          }}
          className={clsx(
            styles.heroImageLoad,
            styles.moons,
            img3_loaded ? styles.heroImageLoaded : '',
            'moonsScrollTarget heroImageLoad',
          )}
          src={imgMoons}
          alt="Magic"
          fill
          sizes="100vw"
          style={{
            objectFit: 'contain',
            objectPosition: 'center 20%',
          }}
        />
        <Image
          onLoadingComplete={() => {
            set_img4_loaded(true);
          }}
          className={clsx(
            styles.heroImageLoad,
            styles.starfield,
            img4_loaded ? styles.heroImageLoaded : '',
            'starfieldScrollTarget heroImageLoad',
          )}
          src={imgStarfield}
          alt="Magic"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </div>
      <div className={clsx(styles.background)} />
      <div className={clsx(styles.bottomCap)} />
    </SectionWrapper>
  );
};
