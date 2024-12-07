import { APP_ENV } from 'constants/config';

export function appendEnvToIndex(index: string) {
  const enabledEnvs = ['prod', 'preview', 'local'];
  if (!enabledEnvs.includes(APP_ENV)) {
    const envsLabel = `[${enabledEnvs.join(', ')}]`;
    throw new Error(
      `Algolia indexing is only enabled for ${envsLabel} environments, but 'APP_ENV' is set to: ${APP_ENV}`,
    );
  } else {
    return `${index}:${APP_ENV}`;
  }
}
