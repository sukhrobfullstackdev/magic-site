import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { EnterpriseView } from 'features/enterprise/components/enterprise-view';

export default defaultPageLayout.wrapPage(() => {
  return <EnterpriseView />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
