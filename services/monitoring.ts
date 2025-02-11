/* istanbul ignore file */

import { DATADOG_RUM_APP_KEY, DATADOG_RUM_CLIENT_KEY, DEPLOY_ENV, GIT_COMMIT_SHA, IS_PROD_ENV } from 'constants/env';
import { datadogRum } from '@datadog/browser-rum';

if (DATADOG_RUM_APP_KEY && DATADOG_RUM_CLIENT_KEY) {
  datadogRum.init({
    applicationId: DATADOG_RUM_APP_KEY,
    clientToken: DATADOG_RUM_CLIENT_KEY,
    site: 'datadoghq.com',
    service: 'magic-site',
    env: DEPLOY_ENV,
    version: GIT_COMMIT_SHA,
    sessionSampleRate: IS_PROD_ENV ? 0.1 : 10,
    // replay sample rate is the percent of tracked sessions
    // so 10% of the above 10% is 1% of all sessions.
    sessionReplaySampleRate: 0.1,
    trackUserInteractions: true,
    useCrossSiteSessionCookie: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask',
    allowedTracingUrls: [
      { match: 'https://dashboard.magic.link', propagatorTypes: ['datadog', 'tracecontext'] },
      { match: 'https://dashboard.dev.magic.link', propagatorTypes: ['datadog', 'tracecontext'] },
      { match: 'https://dashboard.stagef.magic.link', propagatorTypes: ['datadog', 'tracecontext'] },
    ],
  });

  datadogRum.startSessionReplayRecording();
}

export function getMonitoring() {
  return datadogRum;
}
