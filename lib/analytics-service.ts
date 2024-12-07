import { merge } from 'lodash';
import { APP_ENV, HIGHTOUCH_API_KEY } from 'constants/config';

import { HtEventsBrowser } from '@ht-sdks/events-sdk-js-browser';

const htevents = HtEventsBrowser.load({ writeKey: HIGHTOUCH_API_KEY }, { apiHost: 'us-east-1.hightouch-events.com' });

class AnalyticsServiceImpl {
  TrackAction = (action, additionalProperties = {}) => {
    let properties = {
      source: 'magic-www',
      env: APP_ENV,
      referringURL: window.location.href,
      referringDomain: window.location.hostname,
    };
    properties = merge(properties, additionalProperties);

    htevents.track(action, properties);
  };

  TrackPage = pageName => {
    const properties = {
      type: 'page',
      name: pageName,
      source: 'magic-www',
      env: APP_ENV,
    };

    htevents.page(pageName, properties);
  };

  TrackDemo = () => {
    if (window) window.twttr.conversion.trackPid('o6aov', { tw_sale_amount: 0, tw_order_quantity: 0 });
  };
}

export const AnalyticsService = new AnalyticsServiceImpl();
