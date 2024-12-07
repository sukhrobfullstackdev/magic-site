import { createQuery, gql } from 'graphql/create-query';
import { SiteConfigsQuery } from 'graphql/generated';

/**
 * Query for site-wide metadata.
 */
export const siteConfig = createQuery<SiteConfigsQuery>(gql`
  query siteConfigs {
    siteConfigs(first: 1) {
      leftMainNavLinks {
        label
        url
        analyticsLabel
        trackDemoConversion
      }

      rightMainNavLinks {
        label
        url
        analyticsLabel
        trackDemoConversion
      }

      mainNavCTA {
        label
        url
        analyticsLabel
        trackDemoConversion
      }

      docsNavLinks {
        id
        url
        label
        icon {
          handle
          width
          height
        }
      }

      docsAncestors {
        name
        id
        slug
        location
      }

      bannerText
      bannerURL
      mainNavigationsLeft {
        ... on WwwMainNavigationCategory {
          id
          label
          navigationLinks {
            label
            description
            analyticsLabel
            url
            isLarge
            trackDemoConversion
            icon {
              handle
              width
              height
            }
          }
        }
        ... on MainNavLink {
          url
          analyticsLabel
          label
          trackDemoConversion
        }
      }
    }
  }
`);
