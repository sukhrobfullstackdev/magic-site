import React from 'react';
import { PreventTypographicOrphans, clsx } from '@magiclabs/ui';

import Head from 'next/head';
import { SEO } from 'components/partials/seo';
import { HeroSection } from '../nft-checkout-sections/hero-section/hero-section';
import { ValuesSection } from '../nft-checkout-sections/values-section/values-section';
import { FeaturesSection } from '../nft-checkout-sections/features-section/features-section';
import { LaunchSection } from '../nft-checkout-sections/launch-section/launch-section';

export const NFTCheckoutView = () => {
  return (
    <>
      <SEO
        title="NFT Launches Simplified | Magic"
        description="With NFT Checkout and Minting, you can now create an end-to-end experience from wallet creation to NFT purchase and delivery"
        image="/images/nft-og.png"
      />
      <Head>
        <style>{`html, body {
          background-color: #000 !important;
        }`}</style>
      </Head>
      <div
        style={{
          overflow: 'hidden',
        }}
        className={clsx('nftCheckoutContainer')}
      >
        <PreventTypographicOrphans>
          <HeroSection />
          <ValuesSection />
          <FeaturesSection />
          <LaunchSection />
        </PreventTypographicOrphans>
      </div>
    </>
  );
};
