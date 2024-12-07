import React from 'react';
import type { DocsPageRenderData } from 'features/docs/docs-data';
import { Flex, clsx } from '@magiclabs/ui';
import Link from 'next/link';
import { DocsContent } from '../../docs-content';

import styles from './build-a-demo-layout.module.less';

interface BuildADemoLayoutProps {
  data: DocsPageRenderData;
}

export const BuildADemoLayout: React.FC<BuildADemoLayoutProps> = props => {
  const { data } = props;
  return <DocsContent data={data} beforeContentSlot={<BuildADemoNavigator href={data.href} />} />;
};

interface BuildADemoNavigatorProps {
  href: string;
}

const BuildADemoNavigator: React.FC<BuildADemoNavigatorProps> = props => {
  const { href } = props;

  const basePath = href.replace(/(\/browser|\/locally)$/, '');
  const activeRoute = href.split('/').slice().pop()!; // one of: "browser", "locally"

  return (
    <div className={styles.BuildADemoNavigator}>
      <h3>How would you like to build?</h3>
      <Flex.Row horizontal="space-between" wrap>
        <Link href={`${basePath}/browser`} className={clsx(styles.card, activeRoute === 'browser' && styles.active)}>
          <>
            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.72321 11.9457V12.3816L2.10198 12.5973L5.1463 14.3315V17.5844V18.0171L5.52094 18.2337L9.29963 20.4181L10.425 21.0686V19.7687V11.4806V11.0476L10.05 10.8311L2.84819 6.67339L1.72321 6.02391V7.32291V11.9457ZM19.2177 5.93485V16.0653L10.4486 21.1338L1.67578 16.0652V5.93466L5.59959 3.66598L6.80535 2.96883L6.79741 2.96486L10.4488 0.865086L14.2577 3.05376L14.2449 3.06228L15.2902 3.66613L19.2177 5.93485ZM10.4724 19.7687V21.0681L11.5975 20.4182L15.3997 18.2221L15.7745 18.0056V17.5726V14.3317L18.7951 12.6132L19.1742 12.3975V11.9613V7.32682V6.02721L18.0489 6.67745L10.8472 10.8391L10.4724 11.0556V11.4885V19.7687ZM7.14918 3.25735L6.77462 3.04212L6.4005 3.25813L2.84064 5.31355L1.71609 5.96285L2.84046 6.61246L10.0774 10.7936L10.4524 11.0103L10.8275 10.7938L18.0645 6.61652L19.1894 5.96723L18.0647 5.31754L14.4931 3.2543L14.1192 3.0383L13.7447 3.25323L10.4411 5.14899L7.14918 3.25735Z"
                stroke="#B6B4BA"
                strokeWidth="1.5"
              />
            </svg>
            <h4>Build in the browser</h4>
            <p>Follow a step-by-step guide using a CodeSandbox template</p>
          </>
        </Link>

        <Link href={`${basePath}/locally`} className={clsx(styles.card, activeRoute === 'locally' && styles.active)}>
          <>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.16732 8.33325L6.66732 10.8333L4.16732 13.3333M0.833984 0.833252H19.1673V19.1666H0.833984V0.833252ZM0.833984 4.16658H19.1673H0.833984ZM4.16732 0.833252V4.16658V0.833252ZM9.16732 13.3333H15.834H9.16732Z"
                stroke="#B6B4BA"
                strokeWidth="1.5"
              />
            </svg>
            <h4>Build locally</h4>
            <p>Boostrap a project using our interactive command line tool</p>
          </>
        </Link>
      </Flex.Row>
    </div>
  );
};
