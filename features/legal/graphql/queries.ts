import { createQuery, gql } from 'graphql/create-query';
import {
  LegalBasicPageQuery,
  LegalBasicPageQueryVariables,
  LegalListingQuery,
  LegalListingQueryVariables,
} from 'graphql/generated';

export const legalListing = createQuery<LegalListingQuery, LegalListingQueryVariables>(gql`
  query legalListing($stage: Stage = PUBLISHED) {
    legalCategories(first: 1000, stage: $stage) {
      __typename
      id
      slug
      isRoot
      sidenavLabel
      parent {
        id
      }
      children {
        ... on Node {
          id
        }
      }
    }

    legalBasicPages(first: 1000, stage: $stage) {
      __typename
      id
      slug
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
export const legalBasicPage = createQuery<LegalBasicPageQuery, LegalBasicPageQueryVariables>(gql`
  query legalBasicPage($id: ID!, $stage: Stage = PUBLISHED) {
    legalBasicPage(where: { id: $id }, stage: $stage) {
      __typename
      id
      title
      excerpt
      effectiveDate

      content {
        json
        markdown
      }
    }
  }
`);
