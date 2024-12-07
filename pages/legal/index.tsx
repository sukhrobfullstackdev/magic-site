import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { defaultPageLayout } from 'components/layout/default-page-layout';

export default defaultPageLayout.wrapPage(() => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      router.replace('/legal/terms-of-service');
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Terms of Service | Magic</title>
        <meta name="description" content="By using this site, you agree to these terms and conditions of use." />
      </Head>
    </>
  );
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps();
