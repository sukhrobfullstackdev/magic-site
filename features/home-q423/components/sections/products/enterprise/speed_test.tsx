import React, { useState, useEffect, useRef } from 'react';
import { clsx, CallToAction } from '@magiclabs/ui';
import Image from 'next/image';
import styles from './speed_test.module.less';

import imgSpeedTest from './images/speedtest.png';
import imgSpeedTestBg1 from './images/speedtestBackground1.png';
import imgSpeedTestBg2 from './images/speedtestBackground2.png';
import iconTryItNow from '../icons/tryitnow.svg';

export const SpeedTest = () => {
  return (
    <div className={clsx(styles.wrapper, 'd-flex align-items-center justify-content-center')}>
      <div className={clsx(styles.innerWrapper, '')}>
        <div className={clsx(styles.testContainer, 'p-4 d-flex flex-column')}>
          <Image
            src={imgSpeedTest}
            alt="Magic"
            width={320}
            height={408}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className={clsx(styles.iconTryItNow, 'spinLoop')}>
          <Image alt="" src={iconTryItNow} width={160} height={160} />
        </div>
        <div className={clsx(styles.imgSpeedTestBg1, '')}>
          <Image alt="" src={imgSpeedTestBg1} width={510} height={294} />
        </div>
        <div className={clsx(styles.imgSpeedTestBg2, '')}>
          <Image alt="" src={imgSpeedTestBg2} width={445} height={445} />
        </div>
      </div>
    </div>
  );
};
