import {
  PostsListingQuery,
  PostsListingQueryVariables,
  PostsListingContinuedQuery,
  PostsListingContinuedQueryVariables,
  PostContentQuery,
  PostContentQueryVariables,
  PostSlugsQuery,
  PostMetadataQuery,
  PostMetadataQueryVariables,
} from 'graphql/generated';
import { createQuery, gql } from 'graphql/create-query';

// -------------------------------------------------------------------------- //

export const PostMetadata = gql`
  fragment PostMetadata on Post {
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
`;

/**
 * Queries for a listing of posts for the given `$postType` and returns a page of
 * results along with metadata about the posts' category and tags for related
 * tech stacks.
 */
export const postsListing = createQuery<PostsListingQuery, PostsListingQueryVariables>(gql`
  ${PostMetadata}

  query postsListing($pageSize: Int, $postType: String) {
    posts(first: $pageSize, where: { type: { typeID: $postType }, featured: false }, orderBy: date_DESC) {
      ...PostMetadata
    }

    featuredPosts: posts(where: { type: { typeID: $postType }, featured: true }, orderBy: date_DESC) {
      ...PostMetadata
    }

    postType(where: { typeID: $postType }) {
      typeID
      pluralDisplayName

      seo {
        title
        description
        keywords
        image {
          url
          handle
        }
      }
    }

    tags {
      tagID
      displayName
      displayImage {
        url
        handle
        width
        height
      }
    }

    postsConnection(where: { type: { typeID: $postType } }) {
      aggregate {
        count
      }
    }
  }
`);

// -------------------------------------------------------------------------- //

/**
 * Queries for more post listings (i.e.: "load more..").
 */
export const postsListingContinued = createQuery<PostsListingContinuedQuery, PostsListingContinuedQueryVariables>(gql`
  ${PostMetadata}

  query postsListingContinued($pageSize: Int, $cursor: String, $postType: String) {
    posts(
      first: $pageSize
      after: $cursor
      where: { type: { typeID: $postType }, featured: false }
      orderBy: date_DESC
    ) {
      ...PostMetadata
    }
  }
`);

// -------------------------------------------------------------------------- //

/**
 * Queries for listing metadata for a single `Post` object.
 */
export const postMetadata = createQuery<PostMetadataQuery, PostMetadataQueryVariables>(gql`
  ${PostMetadata}

  query postMetadata($slug: String, $stage: Stage = PUBLISHED) {
    post(where: { slug: $slug }, stage: $stage) {
      ...PostMetadata
    }
  }
`);

// -------------------------------------------------------------------------- //

/**
 * Gets a list of all unique post slugs so we can pre-render static content
 * pages for each post.
 */
export const allPostSlugs = createQuery<PostSlugsQuery>(gql`
  query postSlugs {
    posts {
      slug
    }
  }
`);

// -------------------------------------------------------------------------- //

/**
 * Returns a model containing a single post's content data for rendering.
 */
export const postContent = createQuery<PostContentQuery, PostContentQueryVariables>(gql`
  ${PostMetadata}

  query postContent($slug: String, $stage: Stage = PUBLISHED) {
    post(where: { slug: $slug }, stage: $stage) {
      ...PostMetadata

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
      }
    }
  }
`);
