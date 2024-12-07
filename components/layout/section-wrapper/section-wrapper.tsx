import React from 'react';
import { clsx, Flex } from '@magiclabs/ui';
import type { IntrinsicElementProps } from '@magiclabs/ui/dist/types/types/utility';

import styles from './section-wrapper.module.less';

interface SectionWrapperProps extends IntrinsicElementProps<'div'> {
  fullBleedOnMobile?: boolean;
  fullBleedOnDesktop?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = props => {
  const { children, fullBleedOnMobile, fullBleedOnDesktop, ...otherProps } = props;

  return (
    <Flex justifyContent="center" className={styles.SectionWrapper}>
      <div className={styles.outerWrapper}>
        <div
          className={clsx(
            styles.innerWrapper,
            fullBleedOnMobile && styles.fullBleedOnMobile,
            fullBleedOnDesktop && styles.fullBleedOnDesktop,
          )}
        >
          <div {...otherProps}>{children}</div>
        </div>
      </div>
    </Flex>
  );
};
