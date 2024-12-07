import React from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { ContactView } from 'features/contact/components/contact-view';

export default defaultPageLayout.wrapPage(() => {
  return <ContactView />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
