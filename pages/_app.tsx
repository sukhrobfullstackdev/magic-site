import '../styles/index.less';
import React, { ReactNode } from 'react';
import { SSRProvider as CustomSSRProvider, ThemeProvider, ToastProvider } from '@magiclabs/ui';
import { useInitialRender } from 'usable-react';
import type { AppProps } from 'next/app';
import { LayoutProvider } from 'next-super-layout';
import Script from 'next/script';
import { LaunchDarklyProvider } from 'components/partials/launch-darkly-provider/launch-darkly-provider';
import Intercom from '@intercom/messenger-js-sdk';
import Support from 'components/support';
import { IS_CLIENT } from '../constants/environment-detection';

import '../styles/bootstrap-grid.min.css';

const SSRProvider = CustomSSRProvider as React.FC<{ children: ReactNode }>;

export default function App(props: AppProps) {
  const isInitialRender = useInitialRender();

  if (IS_CLIENT && isInitialRender) {
    /* eslint-disable */
    /* Supports Typeform embedded "Get a Demo" form */
    (function () {
      var qs,
        js,
        q,
        s,
        d = document,
        gi = d.getElementById,
        ce = d.createElement,
        gt = d.getElementsByTagName,
        id = 'typef_orm_share',
        b = 'https://embed.typeform.com/';
      if (!gi.call(d, id)) {
        js = ce.call(d, 'script');
        js.id = id;
        js.src = b + 'embed.js';
        js.nonce = '8IBTHwOdqNKAWeKl7plt8g==';
        q = gt.call(d, 'script')[0];
        q.parentNode.insertBefore(js, q);
      }
    })();
    /* eslint-enable */
  }

  return (
    <LaunchDarklyProvider>
      <SSRProvider>
        <IntercomMessenger />
        <GoogleTagBase />
        <Support />
        <ThemeProvider>
          <ToastProvider position="top">
            <LayoutProvider {...props} />
          </ToastProvider>
        </ThemeProvider>
      </SSRProvider>
    </LaunchDarklyProvider>
  );
}

function GoogleTagBase() {
  return (
    <Script id="gtag-base" strategy="afterInteractive" nonce="8IBTHwOdqNKAWeKl7plt8g==">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-M5KT69S');
      `}
      ;
    </Script>
  );
}

function IntercomMessenger() {
  Intercom({
    app_id: 'boaw5c39',
  });
  return <></>;
}
