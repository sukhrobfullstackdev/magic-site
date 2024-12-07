import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { LandingPageContainer } from 'features/landingpage/components/container';

export default defaultPageLayout.wrapPage(() => {
  return <LandingPageContainer />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
