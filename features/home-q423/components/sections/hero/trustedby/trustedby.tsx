import React from 'react';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import styles from './trustedby.module.less';
import { Marquee } from './marquee';

export const TrustedBy = () => {
  return (
    <SectionWrapper className={clsx('textCentered')}>
      <div className={clsx(styles.content)}>
        <h4 style={{ color: '#F8F8FA' }}>Trusted By Trailblazers</h4>
        <div>
          <Marquee />
        </div>
      </div>
    </SectionWrapper>
  );
};
