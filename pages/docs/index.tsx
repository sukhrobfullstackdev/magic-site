/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Documentation() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      router.replace('/docs/home/welcome');
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Developer Docs | Magic</title>
        <meta
          name="description"
          content="Get started with Magic and add passwordless login - email magic links, social login, WebAuthn, and more - to your apps in minutes."
        />
      </Head>
    </>
  );
}
