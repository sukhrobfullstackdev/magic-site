import React from 'react';

import { defaultPageLayout } from 'components/layout/default-page-layout';
import { NFTCheckoutView } from 'features/nft-checkout/components/nft-checkout-view';

export default defaultPageLayout.wrapPage(() => {
  return <NFTCheckoutView />;
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
