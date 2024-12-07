import React from 'react';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import confirmFeatureImg from 'public/images/nft-checkout/features/onboarding.png';
import buyFeatureImg from 'public/images/nft-checkout/features/minting.png';
import paymentFeatureImg from 'public/images/nft-checkout/features/checkout.png';
import nftFeatureImg from 'public/images/nft-checkout/features/gallery.png';
import gradientBlur from 'public/images/nft-checkout/gradient-blur.png';
import Image from 'next/image';

import styles from './features-section.module.less';

export const FeaturesSection = () => {
  return (
    <SectionWrapper className={styles.FeaturesSection}>
      {features.map((feature, idx) => (
        <div
          key={feature.text}
          className={clsx(styles.FeatureCard, idx % 2 !== 0 && styles['--reversed'], idx === 3 && styles['--multiple'])}
        >
          <div>
            <h4 className={clsx('mb-3')}>{feature.preHeadline}</h4>
            <h3 className={clsx('headingLight mb-3')} dangerouslySetInnerHTML={{ __html: feature.headline }} />
            <p>{feature.text}</p>
          </div>
          <div className={styles.FeatureImg}>
            <Image
              quality={100}
              src={feature.img}
              width={feature.width}
              height={feature.height}
              alt="Feature"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
      ))}
      <div className={styles.GradientBlur}>
        <Image
          quality={100}
          src={gradientBlur}
          width={2300}
          height={2600}
          alt="Blur"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className={styles['GradientBlur--reversed']}>
        <Image
          quality={100}
          src={gradientBlur}
          width={2300}
          height={2600}
          alt="Blur"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
    </SectionWrapper>
  );
};

const features = [
  {
    preHeadline: 'NFT Minting',
    headline: 'Create & deliver.<br/>At scale.',
    text: 'Deploy or bring your own custom smart contracts to build your ideal NFT experience. Deliver NFTs seamlessly to your users’ Magic Wallets.',
    img: buyFeatureImg,
    width: 488,
    height: 536,
  },
  {
    preHeadline: 'NFT Checkout',
    headline: 'Multiple ways to pay.',
    text: 'Enable NFT purchases with Credit, Debit, or PayPal. No crypto or fiat on-ramps required.',
    img: paymentFeatureImg,
    width: 360,
    height: 435,
  },
  {
    preHeadline: 'NFT Onboarding',
    headline: 'Web2-like transactions.',
    text: 'Reduce ID verification and wallet onboarding steps. Enable gasless transactions, making purchases easy for first-time buyers.',
    img: confirmFeatureImg,
    width: 360,
    height: 441,
  },
  {
    preHeadline: 'NFT Gallery',
    headline: 'Collect & <br/>display.',
    text: 'Allow users to view, manage, and transfer their NFTs directly in their wallets.',
    img: nftFeatureImg,
    width: 488,
    height: 552,
  },
];
