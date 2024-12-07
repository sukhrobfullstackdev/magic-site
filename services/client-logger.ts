import { DATADOG_CLIENT_KEY, DEPLOY_ENV, GIT_COMMIT_SHA, NODE_ENV } from 'constants/env';
import { HandlerType, Logger, StatusType, datadogLogs } from '@datadog/browser-logs';
import { Context } from '@datadog/browser-core';

const logType = ['log', 'debug', 'info', 'warn', 'error'] as const;
type LogType = typeof logType[number];

datadogLogs.init({
  clientToken: DATADOG_CLIENT_KEY,
  site: 'datadoghq.com',
  service: 'magic-site',
  version: GIT_COMMIT_SHA,
  forwardErrorsToLogs: true,
  useCrossSiteSessionCookie: true,
  env: DEPLOY_ENV,
  sessionSampleRate: 10,
});

/* Use a Proxy to maintain the ability to use the
shorthand methods (like .log, .debug, .info, .warn, .error),
while allowing for getBaseAnalyticsProperties to be computed */
let proxiedLogger: Logger;

export function getClientLogger(): Logger {
  if (typeof window === 'undefined') {
    const defaultLog = (
      message: string,
      messageContext?: object | undefined,
      status?: StatusType | undefined,
      error?: Error | undefined,
    ) => {};

    const logger = {
      log: defaultLog,
      debug: defaultLog,
      info: defaultLog,
      warn: defaultLog,
      error: defaultLog,
      critical: defaultLog,
      alert: defaultLog,
    };

    return logger as Logger;
  }

  if (!proxiedLogger) {
    const baseLogger = datadogLogs.logger;
    baseLogger.setHandler(DEPLOY_ENV !== 'local' && NODE_ENV !== 'development' ? 'http' : 'console');

    proxiedLogger = new Proxy(baseLogger, {
      get(target, prop) {
        if (logType.includes(prop as LogType)) {
          return (message: string, messageContext?: Record<string, unknown>, status?: StatusType, error?: Error) => {
            if (prop === 'log') {
              target.log(message, messageContext, status, error);
            } else {
              // @ts-expect-error Requires ugly "type as" to pass typing
              target[prop as keyof Logger](message, messageContext);
            }
          };
        }

        return target[prop as keyof Logger];
      },
    });
  }

  return proxiedLogger;
}
