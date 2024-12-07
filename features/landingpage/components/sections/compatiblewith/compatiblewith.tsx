import React from 'react';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import styles from './compatiblewith.module.less';
import { BlockchainsMarquee } from './blockchains-marquee';

export const CompatibleWith = () => {
  return (
    <SectionWrapper className={styles.sectionWrapper}>
      <div className={clsx(styles.content)}>
        <div className={clsx('textCentered')}>
          <BlockchainsMarquee />
        </div>
        <div className={clsx(styles.subheadline, 'textCentered')}>
          <p>Compatible with 20+ blockchains</p>
        </div>
      </div>
    </SectionWrapper>
  );
};
