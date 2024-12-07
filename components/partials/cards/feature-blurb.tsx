import { clsx, mergeProps } from '@magiclabs/ui';
import React from 'react';

import styles from './feature-blurb.module.less';

interface FeatureBlurbProps {
  img: React.ReactElement;
  label?: string;
  reverseFlowOnMobile?: boolean;
  hasDarkBackground?: boolean;
  color?: 'secondary' | 'tertiary';
  columnOnMobile?: boolean;
  children: React.ReactNode;
}

export const FeatureBlurb: React.FC<FeatureBlurbProps> = ({
  img,
  label,
  reverseFlowOnMobile,
  children,
  hasDarkBackground,
  columnOnMobile = false,
  color = 'secondary',
}) => {
  return (
    <div
      className={clsx(
        styles.FeatureBlurb,
        reverseFlowOnMobile && styles.reverseFlowOnMobile,
        styles[color],
        columnOnMobile && styles.flexColumn,
      )}
    >
      {React.cloneElement(img, mergeProps(img.props, { className: styles.image }))}
      <div className={styles.content}>
        {label && <h4 className={styles.label}>{label}</h4>}
        <p className={clsx('textLG', styles.description, hasDarkBackground && styles.hasDarkBackground)}>{children}</p>
      </div>
    </div>
  );
};
