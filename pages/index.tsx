import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { HomeContainer } from 'features/home-q424/components/container';

export default defaultPageLayout.wrapPage(() => {
  return <HomeContainer />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
