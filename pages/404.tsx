import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { NotFound } from '../components/partials/not-found';

export default defaultPageLayout.wrapPage(() => {
  return <NotFound />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
