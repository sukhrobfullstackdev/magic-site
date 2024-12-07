import React from 'react';
import { clsx, Flex } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import imgHiroDiversity from 'public/images/careers/diversity-section/hiro-diversity.png';

import styles from './diversity-section.module.less';

export const DiversitySection: React.FC = () => {
  return (
    <div className={styles.DiversitySection}>
      <SectionWrapper>
        <Flex.Column horizontal="center">
          <div className={styles.DiversitySectionIntro}>
            <h3 className={clsx(styles.headline, 'textCentered')}>Diversity matters</h3>
            <p className={clsx(styles.subheadline, 'textXL textCentered')}>
              We believe that creating a team rich with diverse experiences and perspectives is not just the right thing
              to do — it’s vital for success.
            </p>
          </div>

          <div className={styles.DiversitySectionImage}>
            <Flex.Row wrap justifyContent="center">
              <Image
                src={imgHiroDiversity}
                alt="Hiro Diversity"
                width={1176}
                height={225}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
            </Flex.Row>
          </div>
        </Flex.Column>
      </SectionWrapper>
    </div>
  );
};
