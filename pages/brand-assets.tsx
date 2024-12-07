import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { BrandAssetsView } from 'features/brand-assets/components/brand-assets-view';

export default defaultPageLayout.wrapPage(() => {
  return <BrandAssetsView />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
