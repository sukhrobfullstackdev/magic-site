import React from 'react';
import { graphcmsReadable } from 'lib/graphcms/clients/read';
import { PostsListing } from 'features/blog/components/posts-listing';
import { postsListing } from 'features/blog/graphql/posts';
import { SEO } from 'components/partials/seo';
import { PostsListingQuery } from 'graphql/generated';
import { defaultPageLayout } from 'components/layout/default-page-layout';

interface GuidesIndexProps {
  guides: PostsListingQuery['posts'];
  featuredGuides?: PostsListingQuery['featuredPosts'];
  category: PostsListingQuery['postType'];
  tags: PostsListingQuery['tags'];
  totalPosts: number;
}

export default defaultPageLayout.wrapPage(
  ({ guides, featuredGuides, category, tags, totalPosts }: GuidesIndexProps) => {
    return (
      <>
        <SEO
          title={category?.seo?.title}
          description={category?.seo?.description}
          keywords={category?.seo?.keywords}
          image={category?.seo?.image?.url}
          slug={category?.typeID}
        />

        <PostsListing
          postType="guides"
          categoryLabel={category?.pluralDisplayName}
          posts={guides}
          featuredPosts={featuredGuides}
          tags={tags}
          totalPosts={totalPosts}
        />
      </>
    );
  },
);

export const getStaticProps = defaultPageLayout.wrapGetStaticProps<GuidesIndexProps>(async () => {
  const result: any = await graphcmsReadable.request(postsListing, {
    pageSize: 12,
    postType: 'guides',
  });

  return {
    props: {
      guides: result.posts,
      featuredGuides: result.featuredPosts,
      category: result.postType,
      tags: result.tags,
      totalPosts: result.postsConnection.aggregate.count,
    },

    revalidate: 600, // 10 minutes
  };
});
