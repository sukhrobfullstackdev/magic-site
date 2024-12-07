import { GRAPHCMS_ENDPOINT, GRAPHCMS_MUTATION_TOKEN } from 'constants/config';
import { createClient } from 'graphql/create-client';

export const graphcmsWritable = createClient(GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${GRAPHCMS_MUTATION_TOKEN}`,
  },
});
