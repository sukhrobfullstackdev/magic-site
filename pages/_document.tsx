/* eslint-disable react/no-danger */

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ThemeHead } from '@magiclabs/ui';
import { GoogleFonts } from '../components/widgets/google-fonts';

/**
 * Inject @magiclabs/ui CSS variables into NextJS to avoid CSS being applied
 * after page load (leading to a FOUC).
 */
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <OneTrustCookieCompliance />
          <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" />
          <meta name="google-site-verification" content="V6rZCqjVMjYtiJE-2HhLa2fPfxelZLAHmPrge27nfQg" />
          <ThemeHead />
        </Head>
        <body>
          <GoogleTagManagerScript />
          <HackyFixFOUC />
          <div
            style={{
              width: '100vw',
              padding: '7px',
              background: '#000000',
              color: '#ddd',
              textAlign: 'center',
              fontSize: '12px',
            }}
          >
            We've updated our{' '}
            <a
              style={{
                color: '#fff',
                fontSize: '12px',
                textDecoration: 'none',
              }}
              href="https://magic.link/legal/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            {'. '}
            By continuing to use our services, you agree to the updated Terms.
          </div>
          <Main />
          <NextScript />
          <HubspotTracking />
          <HubbleSurveyIntegration />
        </body>
      </Html>
    );
  }
}

function HubbleSurveyIntegration() {
  return <script async src="https://sdk.hubble.team/sdk/acd522ab-5ee7-4236-b03e-eb77f2071d62.js" />;
}

function HubspotTracking() {
  return <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/20846682.js" />;
}

function OneTrustCookieCompliance() {
  return (
    <>
      <script
        src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
        type="text/javascript"
        charSet="UTF-8"
        data-domain-script="0555677f-4278-4c2f-a5f0-373c5e48bfb1"
      />
      <script type="text/javascript">function OptanonWrapper() {}</script>
    </>
  );
}

/**
 * CH34351: We are experiencing a FOUC ("flash of unstyled content") with
 * NextJS. The exact cause is unknown, but it appears to be a bug in NextJS
 * itself.
 *
 * @see https://github.com/vercel/next.js/issues/18769
 * @see https://github.com/vercel/next.js/issues/15642#issuecomment-710747889 (the hacky fix)
 */

function HackyFixFOUC() {
  return <script>0</script>;
}

function GoogleTagManagerScript() {
  return (
    <noscript>
      <iframe
        title="googletagmanager"
        src="https://www.googletagmanager.com/ns.html?id=GTM-M5KT69S"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
