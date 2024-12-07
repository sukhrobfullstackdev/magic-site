import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { TrustStackView } from 'features/trust-stack/components';

export default defaultPageLayout.wrapPage(() => {
  return <TrustStackView />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
