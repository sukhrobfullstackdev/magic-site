import {
  DocsBuildADemoPageQuery,
  DocsBuildADemoPageQueryVariables,
  DocsListingQuery,
  DocsListingQueryVariables,
  DocsPageQuery,
  DocsPageQueryVariables,
  DocsQuickstartPageQuery,
  DocsQuickstartPageQueryVariables,
} from 'graphql/generated';
import { createQuery, gql } from 'graphql/create-query';

const DocsGuidesSetReference = gql`
  fragment DocsGuidesSetReference on DocsGuidesSet {
    id
    title
    details
    posts(first: 10) {
      id
      slug
      date
      title
      author
      excerpt
      featured
      scaffold

      type {
        typeID
        displayName
      }

      tags {
        tagID
        displayName
      }

      coverImage {
        url
        handle
        width
        height
      }
    }
  }
`;

const DocsSmartShortcutSetReference = gql`
  fragment DocsSmartShortcutSetReference on DocsSmartShortcutSet {
    id
    title
    setDescription: description
    shouldRenderRecursiveCategories
    shouldRenderTitleAndDescription

    basicPages {
      id
      sidenavLabel
      icon {
        handle
        width
        height
      }
    }

    docsNavigationLinks {
      id
      label
      url
      large
      icon {
        handle
        width
        height
      }
    }

    buildADemoPages {
      id
      sidenavLabel
      icon {
        handle
        width
        height
      }
    }

    quickstartPages {
      id
      sidenavLabel
      icon {
        handle
        width
        height
      }
    }

    category {
      children {
        ... on DocsCategory {
          sidenavLabel # we use the sidenavLabel of the category for nested categories
          children(first: 1) {
            ... on DocsBuildADemoPage {
              id
              icon {
                handle
                width
                height
              }
            }

            ... on DocsQuickstartPage {
              id
              icon {
                handle
                width
                height
              }
            }

            ... on DocsPage {
              id
              icon {
                handle
                width
                height
              }
            }
          }
        }

        ... on DocsBuildADemoPage {
          id
          sidenavLabel
          icon {
            handle
            width
            height
          }
        }

        ... on DocsQuickstartPage {
          id
          sidenavLabel
          icon {
            handle
            width
            height
          }
        }

        ... on DocsPage {
          id
          sidenavLabel
          icon {
            handle
            width
            height
          }
        }
      }
    }
  }
`;

const DocsCallOutReference = gql`
  fragment DocsCallOutReference on DocsCallOut {
    id
    headline
    description
    buttonText
    url
  }
`;

const DocsCountryCodesReference = gql`
  fragment DocsCountryCodesReference on DocsCountryCodes {
    id
    unsupportedCountryCodes
  }
`;

const DocsHeroCardReference = gql`
  fragment DocsHeroCardReference on DocsHeroCard {
    id
    headline
    description
    buttonText
    url

    colorA {
      hex
      rgba {
        r
        g
        b
      }
    }

    colorB {
      hex
    }

    imageDesktop {
      handle
      width
      height
    }

    imageMobile {
      handle
      width
      height
    }

    imageMobileYOffset
  }
`;

const DocsVideoReference = gql`
  fragment DocsVideoReference on DocsVideo {
    id
    videoTitle: title
    url
  }
`;

const DocsPassportWaitlistCalloutReference = gql`
  fragment DocsPassportWaitlistCalloutReference on DocsPassportWaitlistCallout {
    id
    url
  }
`;

export const docsListing = createQuery<DocsListingQuery, DocsListingQueryVariables>(gql`
  query docsListing($stage: Stage = PUBLISHED) {
    docsCategories(first: 1000, stage: $stage) {
      __typename
      id
      slug
      isExpandable
      isRoot
      sidenavLabel
      parent {
        id
      }
      ancestor {
        slug
      }
      children {
        ... on Node {
          id
        }
      }
    }

    docsPages(first: 1000, stage: $stage) {
      __typename
      id
      slug
      title
      sidenavLabel
      parent {
        id
      }
    }

    docsBuildADemoPages(first: 1000, stage: $stage) {
      __typename
      id
      title
      sidenavLabel
      parent {
        id
      }
    }

    docsQuickstartPages(first: 1000, stage: $stage) {
      __typename
      id
      title
      sidenavLabel
      parent {
        id
      }
    }
  }
`);

/**
 * Query for the data of a specific docs page.
 */
export const docsPage = createQuery<DocsPageQuery, DocsPageQueryVariables>(gql`
  ${DocsSmartShortcutSetReference}
  ${DocsCallOutReference}
  ${DocsCountryCodesReference}
  ${DocsHeroCardReference}
  ${DocsGuidesSetReference}
  ${DocsVideoReference}
  ${DocsPassportWaitlistCalloutReference}

  query docsPage($id: ID!, $stage: Stage = PUBLISHED) {
    docsPage(where: { id: $id }, stage: $stage) {
      __typename
      id
      title
      excerpt

      seo {
        title
        description
        keywords
        image {
          url
          handle
        }
      }

      content {
        json
        references {
          ...DocsSmartShortcutSetReference
          ...DocsCallOutReference
          ...DocsCountryCodesReference
          ...DocsHeroCardReference
          ...DocsGuidesSetReference
          ...DocsVideoReference
          ...DocsPassportWaitlistCalloutReference
        }
      }
    }
  }
`);

/**
 * Query for the data of a specific build-a-demo docs page.
 */
export const docsBuildADemoPage = createQuery<DocsBuildADemoPageQuery, DocsBuildADemoPageQueryVariables>(gql`
  ${DocsSmartShortcutSetReference}
  ${DocsCallOutReference}
  ${DocsHeroCardReference}

  query docsBuildADemoPage($id: ID!, $stage: Stage = PUBLISHED) {
    docsBuildADemoPage(where: { id: $id }, stage: $stage) {
      __typename
      id
      title
      excerpt

      seo {
        title
        description
        keywords
        image {
          url
          handle
        }
      }

      localContent {
        json
        references {
          ...DocsSmartShortcutSetReference
          ...DocsCallOutReference
          ...DocsHeroCardReference
        }
      }

      browserContent {
        json
        references {
          ...DocsSmartShortcutSetReference
          ...DocsCallOutReference
          ...DocsHeroCardReference
        }
      }
    }
  }
`);

/**
 * Query for the data of a specific quickstart docs page.
 */
export const docsQuickstartPage = createQuery<DocsQuickstartPageQuery, DocsQuickstartPageQueryVariables>(gql`
  ${DocsSmartShortcutSetReference}
  ${DocsCallOutReference}
  ${DocsHeroCardReference}
  ${DocsVideoReference}

  query docsQuickstartPage($id: ID!, $stage: Stage = PUBLISHED) {
    docsQuickstartPage(where: { id: $id }, stage: $stage) {
      __typename
      id
      title
      excerpt

      seo {
        title
        description
        keywords
        image {
          url
          handle
        }
      }

      sharedContent {
        json
        references {
          ...DocsSmartShortcutSetReference
          ...DocsCallOutReference
          ...DocsHeroCardReference
          ...DocsVideoReference
        }
      }

      cliContent {
        json
        references {
          ...DocsSmartShortcutSetReference
          ...DocsCallOutReference
          ...DocsHeroCardReference
          ...DocsVideoReference
        }
      }

      integrationContent {
        json
        references {
          ...DocsSmartShortcutSetReference
          ...DocsCallOutReference
          ...DocsHeroCardReference
          ...DocsVideoReference
        }
      }
    }
  }
`);
