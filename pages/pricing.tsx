import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { PricingViewV2 } from 'features/pricing/views/pricing-view-v2';

export default defaultPageLayout.wrapPage(() => {
  return <PricingViewV2 />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
