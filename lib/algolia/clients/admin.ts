import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_SECRET_API_KEY } from 'constants/config';
import { appendEnvToIndex } from '../append-env-to-index';

export function createAdminClient() {
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SECRET_API_KEY!);
  return client;
}

export function getConnection(index: string) {
  const client = createAdminClient();
  return client.initIndex(appendEnvToIndex(index));
}
