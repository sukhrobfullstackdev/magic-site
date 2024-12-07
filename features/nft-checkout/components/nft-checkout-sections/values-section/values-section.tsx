import React from 'react';

import boostValueGraphic from 'public/images/nft-checkout/values/boost.png';
import onboardingValueGraphic from 'public/images/nft-checkout/values/onboard.png';
import skipProcessesValueGraphic from 'public/images/nft-checkout/values/processes.png';
import seamlessDeliveryValueGraphic from 'public/images/nft-checkout/values/delivery.png';
import { SectionWrapper } from 'components/layout/section-wrapper';
import { Flex, clsx } from '@magiclabs/ui';
import Image from 'next/image';

import styles from './values-section.module.less';

export const ValuesSection = () => {
  return (
    <SectionWrapper className={styles.ValuesSection}>
      <Flex.Row className={styles.Values}>
        {values.map((value, idx) => (
          <div className={clsx(styles.ValueCard, 'd-flex flex-column justify-content-between')} key={value.text}>
            <Image
              priority
              width={value.width}
              height={value.height}
              src={value.img}
              alt="value"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <p className={styles.ValueText} style={{ minHeight: 80 }}>
              {value.text}
            </p>
          </div>
        ))}
      </Flex.Row>
    </SectionWrapper>
  );
};

const values = [
  {
    img: boostValueGraphic,
    text: 'Boost Conversion With  Email Wallet Creation',
    width: 280,
    height: 190,
  },
  {
    img: onboardingValueGraphic,
    text: 'Onboard Customers With Zero Web3 Knowledge',
    width: 280,
    height: 223,
  },
  {
    img: skipProcessesValueGraphic,
    text: 'Skip Lengthy KYC Processes',
    width: 280,
    height: 190,
  },
  {
    img: seamlessDeliveryValueGraphic,
    text: 'Deliver NFTs Seamlessly to Users’ Wallets',
    width: 280,
    height: 199,
  },
];
