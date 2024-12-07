import React, { useEffect } from 'react';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import styles from './trustedby.module.less';
import { Marquee } from './marquee';

export const TrustedBy = () => {
  return (
    <SectionWrapper
      className={clsx(
        styles.sectionWrapper,
        process.env.NEXT_PUBLIC_NFT_MINTING_ENABLED === 'true' ? '' : styles.nft_minting_disabled,
      )}
    >
      <div className={clsx(styles.content)}>
        <h3 className={clsx(styles.headline, 'textCentered textUppercase')}>Trusted By Trailblazers</h3>
        <div className={clsx('textCentered')}>
          <Marquee />
        </div>
      </div>
    </SectionWrapper>
  );
};
