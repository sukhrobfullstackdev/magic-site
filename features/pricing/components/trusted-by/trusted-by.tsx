import React from 'react';
import Marquee from 'react-fast-marquee';
import styles from './trusted-by.module.less';
import { Logos } from './logos';

export const TrustedBy = () => {
  return (
    <div className={styles.containerTrustedBy}>
      <div className={styles.copyTruestedBy}>Trusted by trailblazers</div>

      <Marquee gradientColor={[241, 241, 241]} className={styles.contentLogos}>
        <Logos />
      </Marquee>

      <div className={styles.containerWelcomeFlowers}>
        <img className={styles.imageLeftFlower} src="/images/pricing/welcome-flower-1.png" alt="left flower" />
        <img className={styles.imageRightFlower} src="/images/pricing/welcome-flower-2.png" alt="right flower" />
      </div>

      <div className={styles.contentBuffer} />
    </div>
  );
};
