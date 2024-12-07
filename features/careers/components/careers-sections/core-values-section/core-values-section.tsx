import React from 'react';
import { clsx, Flex } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import { coreValues } from './core-values-data';

import styles from './core-values-section.module.less';

export const CoreValuesSection: React.FC = () => {
  return (
    <div className={styles.CoreValuesSection}>
      <SectionWrapper>
        <Flex.Column horizontal="center">
          <div className={styles.CoreValuesSectionIntro}>
            <h3 className={clsx(styles.headline, 'textCentered')}>Core Values</h3>
            <p className={clsx(styles.subheadline, 'textXL textCentered')}>
              Innovation and collaboration start with strong shared values.
            </p>
          </div>

          <div className={styles.CoreValuesSectionCards}>
            {coreValues.map(coreCard => (
              <Flex.Item className={styles.CoreValuesSectionCard} key={coreCard.title}>
                <h4>{coreCard.title}</h4>
                <p>{coreCard.description}</p>
              </Flex.Item>
            ))}
          </div>
        </Flex.Column>
      </SectionWrapper>
    </div>
  );
};
