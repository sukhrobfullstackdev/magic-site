/* eslint-disable prefer-destructuring */

// Application variables
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'prod';

// hightouch analytics
export const HIGHTOUCH_API_KEY = process.env.NEXT_PUBLIC_HIGHTOUCH_API_KEY ?? '';

// Algolia (search provider)
export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
export const ALGOLIA_SECRET_API_KEY = process.env.ALGOLIA_SECRET_API_KEY!;
export const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;

// Old Algolia config for existing documentation implementation
// (this will be obsoleted in the future)...
export const OLD_ALGOLIA_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!,
  indexName: 'crawler_Magic Docs',
  appId: ALGOLIA_APP_ID,
};

// GraphCMS
export const GRAPHCMS_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;
export const GRAPHCMS_QUERY_TOKEN = process.env.NEXT_PUBLIC_GRAPHCMS_QUERY_TOKEN!;
export const GRAPHCMS_MUTATION_TOKEN = process.env.GRAPHCMS_MUTATION_TOKEN;
export const GRAPHCMS_PREVIEW_SECRET = process.env.GRAPHCMS_PREVIEW_SECRET;
export const GRAPHCMS_WEBHOOK_SECRET = process.env.GRAPHCMS_WEBHOOK_SECRET;

// Workable
export const WORKABLE_API_KEY = process.env.WORKABLE_API_KEY;

// LaunchDarkly
export const LAUNCHDARKLY_SDK_CLIENT_SIDE_ID = process.env.NEXT_PUBLIC_LAUNCHDARKLY_SDK_CLIENT_SIDE_ID!;
