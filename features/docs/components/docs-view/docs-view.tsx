import React, { useEffect } from 'react';
import { Flex, Media } from '@magiclabs/ui';
import { TableOfContents } from 'components/widgets/table-of-contents';
import type { AdjacentLinks, DocsPageRenderData } from 'features/docs/docs-data';
import { PreviewModeDialog } from 'components/widgets/preview-mode-dialog';

import { AnalyticsService } from 'lib/analytics-service';
import { Sidenav } from '../sidenav';
import { MobileTableOfContents } from '../mobile-table-of-content';
import { AdjacentLinksNavigator } from '../adjacent-links-navigator';
import { DocsSubNavbar } from '../docs-sub-nav';

// Content-specific Layouts
import { DefaultLayout } from './layouts/default-layout';
import { BuildADemoLayout } from './layouts/build-a-demo-layout';
import { QuickstartLayout } from './layouts/quickstart-layout';

import styles from './docs-view.module.less';

interface DocsViewProps {
  preview?: boolean;
  data: DocsPageRenderData;
  adjacentLinks: AdjacentLinks;
}

export const DocsView: React.FC<DocsViewProps> = props => {
  const { preview, data, adjacentLinks } = props;

  const layouts = {
    BUILD_A_DEMO: <BuildADemoLayout data={data} />,
    QUICKSTART: <QuickstartLayout data={data} />,
    DEFAULT: <DefaultLayout data={data} />,
  };

  const currentLayout = layouts[data.layout];

  useEffect(() => {
    AnalyticsService.TrackPage(`Documentation - ${data.title}`);
  }, []);

  return (
    <div className={styles.borderTop}>
      {preview && <PreviewModeDialog />}
      <MobileTableOfContents data={data} styles={styles} />
      <Media greaterThanOrEqual="lg" className={styles.docsSubNav}>
        <DocsSubNavbar />
      </Media>
      <div className={styles.docsLayout}>
        <Flex.Row className={styles.row} horizontal="center">
          {/* Using percentage as the flex basis to accomodate for Different view point */}
          <Flex.Item className={styles.menuBarContainer} basis="17.666667%">
            <Sidenav />
          </Flex.Item>

          <Flex.Item className={styles.content}>
            {currentLayout}
            <AdjacentLinksNavigator {...adjacentLinks} />
          </Flex.Item>

          <Flex.Item className={styles.tocContainer} basis="14.666667%">
            <TableOfContents title={data.title!} structure={data.tableOfContents!} />
          </Flex.Item>
        </Flex.Row>
      </div>
    </div>
  );
};
