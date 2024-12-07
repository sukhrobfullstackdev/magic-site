import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import Redirect from '../components/widgets/redirect';

export default defaultPageLayout.wrapPage(() => {
  return <Redirect path="/" />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
