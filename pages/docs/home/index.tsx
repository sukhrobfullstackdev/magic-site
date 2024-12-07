/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { defaultPageLayout } from 'components/layout/default-page-layout';
import { SEO } from 'components/partials/seo';

export default defaultPageLayout.wrapPage(() => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      router.replace('/docs/home/welcome');
    })();
  }, []);

  return (
    <SEO
      title="Magic Home Developer Docs | Magic"
      description="Get started with Magic and add passwordless login - email magic links, social login, WebAuthn, and more - to your apps in minutes"
    />
  );
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
