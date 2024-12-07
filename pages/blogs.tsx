import React from 'react';
import { graphcmsReadable } from 'lib/graphcms/clients/read';
import { PostsListing } from 'features/blog/components/posts-listing';
import { postsListing } from 'features/blog/graphql/posts';
import { SEO } from 'components/partials/seo';
import { PostsListingQuery } from 'graphql/generated';
import { defaultPageLayout } from 'components/layout/default-page-layout';

interface BlogsIndexProps {
  blogs: PostsListingQuery['posts'];
  featuredBlogs?: PostsListingQuery['featuredPosts'];
  category: PostsListingQuery['postType'];
  tags: PostsListingQuery['tags'];
  totalPosts: number;
}

export default defaultPageLayout.wrapPage(({ blogs, featuredBlogs, category, tags, totalPosts }: BlogsIndexProps) => {
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
        postType="blogs"
        categoryLabel={category?.pluralDisplayName}
        posts={blogs}
        featuredPosts={featuredBlogs}
        tags={tags}
        totalPosts={totalPosts}
      />
    </>
  );
});

export const getStaticProps = defaultPageLayout.wrapGetStaticProps<BlogsIndexProps>(async () => {
  const result: any = await graphcmsReadable.request(postsListing, {
    pageSize: 12,
    postType: 'blogs',
  });

  return {
    props: {
      blogs: result?.posts,
      featuredBlogs: result.featuredPosts,
      category: result.postType,
      tags: result.tags,
      totalPosts: result.postsConnection.aggregate.count,
    },

    revalidate: 600, // 10 minutes
  };
});
