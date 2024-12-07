/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
/* eslint-disable global-require */

const path = require('path');
const nextSafe = require('next-safe');
const withPlugins = require('next-compose-plugins');
const { gql } = require('graphql-request');
const withImageLoader = require('next-image-loader');

// --- Transpile modules
const withTM = require('next-transpile-modules')(['@lordicon/react', '@lordicon/helpers']);

// --- Define NextJS plugins

const IMAGES = [require('next-images')];

const BETTER_CSS = [
  require('@magiclabs/next-css').withCSS,

  {
    preProcessors: [
      {
        extensions: ['less'],
        use: [
          {
            loader: require.resolve('less-loader'),
            options: {
              sourceMap: true,
              lessOptions: {
                paths: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname)],
              },
            },
          },
        ],
      },
    ],
  },
];

// --- Define base NextJS configuration

const BASE_CONFIG = {
  async headers() {
    const { webflowPages } = await graphcmsQuery(gql`
      query webflowPages($stage: Stage = PUBLISHED) {
        webflowPages(stage: $stage) {
          pageURL
        }
      }
    `);

    const webflowURLs = webflowPages.map(({ pageURL }) => pageURL).join('$|');
    const isDev = process.env.NODE_ENV !== 'production';

    const _csp_config = {
      csp: {
        'default-src': "'self'",
        'child-src': "'none'",
        'img-src': "* 'self' data: https:",
        'style-src': "'self' 'unsafe-inline' https:",
        'connect-src': "'self' webpack://* *",
        'prefetch-src': "'self' *",
        'media-src': "'self' https: *",
        'script-src': `'self' 'unsafe-eval' 'unsafe-inline' *`,
        'font-src': "'self' data: fonts.gstatic.com *",
        'form-action': "'self' https: *",
        'frame-src': " 'self' data: https:",
        'frame-ancestors': "'none'",
      },

      all: {
        reportOnly: false,
        isDev,
        frameOptions: 'DENY',
      },

      webflowCSP: {
        /** 'unsafe-inline' is ignored if either a hash or nonce value is present in the source list.
         * For us to be able to render our script as an inline SRC doc we have to give it a nonce-attrib */
        'script-src':
          "'self' 'unsafe-inline' 'unsafe-eval' https: *.hs-scripts.com *.hsforms.net *.hsforms.com *.clearbit.com www.google-analytics.com",
        'base-uri': "'self' about: *",
      },
    };

    return [
      {
        // applies this header to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        source: `/:path((?!_next|${webflowURLs}$).*)`,
        headers: nextSafe({
          contentSecurityPolicy: {
            ..._csp_config.csp,
          },
          ..._csp_config.all,
        }),
      },
      {
        source: `/`,
        headers: nextSafe({
          contentSecurityPolicy: {
            ..._csp_config.csp,
            ..._csp_config.webflowCSP,
          },
          ..._csp_config.all,
        }),
      },
      {
        source: `/:path(${webflowURLs})`,
        headers: nextSafe({
          contentSecurityPolicy: {
            ..._csp_config.csp,
            ..._csp_config.webflowCSP,
          },
          ..._csp_config.all,
        }),
      },
    ];
  },

  webpack: config => {
    // Handle Markdown files (.md)
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },

  rewrites: async () => {
    const { rewrites } = await graphcmsQuery(gql`
      query {
        rewrites {
          source
          destination
        }
      }
    `);

    return [...rewrites] || [];
  },

  redirects: async () => {
    const { redirects } = await graphcmsQuery(gql`
      query {
        redirects(first: 200) {
          source
          destination
          permanent
        }
      }
    `);

    return redirects || [];
  },

  images: {
    disableStaticImages: true,
  },
};

// --- Utility functions

/**
 * Query GraphCMS for site-wide configurations at build time.
 */
async function graphcmsQuery(query, variables) {
  return fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_QUERY_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(res => res.json())
    .then(res => res.data);
}

// --- Compose plugins with base NextJS configuration

module.exports = withPlugins([withTM, withImageLoader, BETTER_CSS, IMAGES], BASE_CONFIG);
