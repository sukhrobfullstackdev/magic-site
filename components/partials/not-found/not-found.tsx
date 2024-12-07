import React from 'react';
import Link from 'next/link';

import styles from './not-found.module.less';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.notFound}>
        <div className={styles.foreground}>
          <h1>404</h1>
          <h2>Sorry, the page you're looking for is in another fort</h2>
          <Link href="/">Go Home</Link>
        </div>
        <div className={styles.middleground}>
          <img className={styles.castle} src="/images/404/castle.svg" alt="" />
          <img className={styles.bushLeft} src="/images/404/bush.svg" alt="" />
          <img className={styles.bushRight} src="/images/404/bush.svg" alt="" />
          <img className={styles.flag} src="/images/404/flag.svg" alt="" />
          <div className={styles.ground} style={{ backgroundImage: `url("/images/404/ground.svg")` }} />
        </div>
        <div className={styles.background}>
          <img className={styles.cloudLeft} src="/images/404/cloud.svg" alt="" />
          <img className={styles.cloudRight} src="/images/404/cloud.svg" alt="" />
          <img className={styles.moon} src="/images/404/moon.svg" alt="" />
          <img className={styles.stars} src="/images/404/stars.svg" alt="" />
        </div>
      </div>
    </div>
  );
};
