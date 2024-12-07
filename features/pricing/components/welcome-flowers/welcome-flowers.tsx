import React from 'react';

import styles from './welcome-flowers.module.less';

export const WelcomeFlowers = () => {
  return (
    <div className={styles.containerWelcomeFlowers}>
      <img className={styles.imageLeftFlower} src="/images/pricing/welcome-flower-1.png" alt="left flower" />
      <img className={styles.imageRightFlower} src="/images/pricing/welcome-flower-2.png" alt="right flower" />
    </div>
  );
};
