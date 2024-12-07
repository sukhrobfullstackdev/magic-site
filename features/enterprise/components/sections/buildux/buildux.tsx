import React from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import imgLogin from 'public/images/enterprise/Login.webp';
import imgWallet from 'public/images/enterprise/wallet.webp';
import imgNft from 'public/images/enterprise/NFT.webp';

import styles from './buildux.module.less';

export const BuildUxSection: React.FC = () => {
  return (
    <SectionWrapper className={clsx(styles.HeroSection, 'mb-5')}>
      <h3 className={clsx(styles.headline, 'mb-3')}>Build your ideal UX</h3>
      <p className={clsx(styles.subheadline, 'mb-5')}>
        Give your customers instant access to your: NFT drop, collectible, game, community, marketplace, token-gated
        product, and more
      </p>
      <div className={clsx(styles.buildUxCols, 'd-flex flex-column flex-md-row flex-nowrap pt-5 align-items-start')}>
        <div className={clsx(styles.buildUxCol, 'col mb-5 mb-md-0')}>
          <Image
            src={imgLogin}
            alt="Magic"
            className={clsx(styles.uxImg)}
            width={327}
            height={455}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />

          <p className={clsx('mt-3')}>
            <strong>Easy onboarding</strong> with no seed phrases, downloads, or steps that add friction
          </p>
        </div>
        <div className={clsx('d-none d-md-block col-1 align-self-center')}>
          <svg
            className={clsx(styles.uxIcon)}
            width="100%"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="20" fill="#EDEBFF" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.3492 14.7593C20.9299 14.3999 20.8813 13.7686 21.2407 13.3492C21.6001 12.9299 22.2314 12.8813 22.6508 13.2408L29.6508 19.2408C29.8724 19.4308 30 19.7081 30 20C30 20.292 29.8724 20.5693 29.6508 20.7593L22.6508 26.7593C22.2314 27.1187 21.6001 27.0702 21.2407 26.6509C20.8813 26.2315 20.9299 25.6002 21.3492 25.2408L26.2968 21H10.9999C10.4477 21 9.99994 20.5523 9.99994 20C9.99994 19.4477 10.4477 19 10.9999 19L26.2967 19L21.3492 14.7593Z"
              fill="#6851FF"
            />
          </svg>
        </div>
        <div className={clsx(styles.buildUxCol, 'col mb-5 mb-md-0')}>
          <Image
            src={imgWallet}
            alt="Magic"
            className={clsx(styles.uxImg)}
            width={327}
            height={455}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
          <p className={clsx('mt-3')}>
            <strong>Seamless UX</strong> that feels familiar and intuitive to your customers
          </p>
        </div>
        <div className={clsx('d-none d-md-block col-1 align-self-center')}>
          <svg
            className={clsx(styles.uxIcon)}
            width="100%"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="20" fill="#EDEBFF" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.3492 14.7593C20.9299 14.3999 20.8813 13.7686 21.2407 13.3492C21.6001 12.9299 22.2314 12.8813 22.6508 13.2408L29.6508 19.2408C29.8724 19.4308 30 19.7081 30 20C30 20.292 29.8724 20.5693 29.6508 20.7593L22.6508 26.7593C22.2314 27.1187 21.6001 27.0702 21.2407 26.6509C20.8813 26.2315 20.9299 25.6002 21.3492 25.2408L26.2968 21H10.9999C10.4477 21 9.99994 20.5523 9.99994 20C9.99994 19.4477 10.4477 19 10.9999 19L26.2967 19L21.3492 14.7593Z"
              fill="#6851FF"
            />
          </svg>
        </div>
        <div className={clsx(styles.buildUxCol, 'col mb-5 mb-md-0')}>
          <Image
            src={imgNft}
            alt="Magic"
            className={clsx(styles.uxImg)}
            width={327}
            height={455}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />

          <p className={clsx('mt-3')}>
            <strong>Higher conversion</strong> for customers with zero crypto knowledge
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};
