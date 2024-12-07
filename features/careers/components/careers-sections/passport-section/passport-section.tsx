import React from 'react';
import { Flex } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import imgPassport from 'public/images/careers/passport-section/passport-banner.png';

import styles from './passport-section.module.less';

export const PassportSection: React.FC = () => {
  return (
    <SectionWrapper>
      <Flex.Row className={styles.PassportSection} horizontal="space-between" vertical="center">
        <div className={styles.PassportSectionIntroductory}>
          <h3>
            A wallet for
            <br />
            every internet user
          </h3>
          <p className="textXL">
            Every internet user requires an easy way to interact with applications built on the blockchain through a
            Web3 wallet.
          </p>
          <p className="textXL">
            Magic's mission is to ignite economic opportunities by realizing the full promise of Web3, enabling
            authentic digital ownership for everyone.
          </p>
        </div>

        <div className={styles.PassportSectionImage}>
          <Image
            src={imgPassport}
            alt="Magic Auth Methods"
            width={488}
            height={371}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </div>
      </Flex.Row>
    </SectionWrapper>
  );
};
