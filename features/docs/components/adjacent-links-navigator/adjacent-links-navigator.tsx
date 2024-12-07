import React from 'react';
import { Flex, clsx, Icon, MonochromeIcons, Spacer } from '@magiclabs/ui';
import type { AdjacentLinks } from 'features/docs/docs-data';
import Link from 'next/link';

import styles from './adjacent-links-navigator.module.less';

export const AdjacentLinksNavigator: React.FC<AdjacentLinks> = props => {
  const { previous, next } = props;

  return (
    <Flex className={styles.AdjacentLinksNavigator}>
      {!!previous && !!previous.href && !!previous.title && (
        <Link href={previous.href} className={clsx([styles.navigator, styles.prev])}>
          <div>
            <Flex alignItems="center">
              <Icon type={MonochromeIcons.ArrowLeft} />
              <Spacer size={10} orientation="horizontal" />
              <div>
                <p>Previous</p>

                <h4>{previous.title}</h4>
              </div>
            </Flex>
          </div>
        </Link>
      )}
      {!!next && !!next.href && !!next.title && (
        <Link href={next.href} className={clsx([styles.navigator, styles.next])}>
          <div>
            <Flex alignItems="center" justifyContent="flex-end">
              <div>
                <p>Next</p>

                <h4>{next.title}</h4>
              </div>
              <Spacer size={10} orientation="horizontal" />
              <Icon type={MonochromeIcons.ArrowRight} />
            </Flex>
          </div>
        </Link>
      )}
    </Flex>
  );
};
