import React, { useState, useEffect } from 'react';
import { clsx, Spacer } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import styles from './sectiontitle.module.less';

export const CaseStudiesSectionTitle = () => {
  return (
    <SectionWrapper className={clsx(styles.sectionWrapper, 'caseStudyAnimWrapper')}>
      <div className={clsx(styles.content)}>
        <div className={clsx('textCentered pt-5 pt-sm-0 mx-auto')} style={{ maxWidth: '850px' }}>
          <h4>Case Study</h4>
          <h2>Discover how companies are using Magic’s wallet-as-a-service</h2>
        </div>
      </div>
    </SectionWrapper>
  );
};
