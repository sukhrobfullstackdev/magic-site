import { GRAPHCMS_ENDPOINT, GRAPHCMS_QUERY_TOKEN } from 'constants/config';
import { createClient } from 'graphql/create-client';

export const graphcmsReadable = createClient(GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${GRAPHCMS_QUERY_TOKEN}`,
  },
});
