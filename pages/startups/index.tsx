import React, { useEffect } from 'react';
import { defaultPageLayout } from 'components/layout/default-page-layout';

export const IS_CLIENT = typeof window !== 'undefined';

export default defaultPageLayout.wrapPage(() => {
  useEffect(() => {
    if (IS_CLIENT) {
      window.location.replace('/');
    }
  }, [IS_CLIENT]);
  return null;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
