import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { CareersView } from 'features/careers/components/careers-view';

export default defaultPageLayout.wrapPage(() => {
  return <CareersView />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
