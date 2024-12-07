import React from 'react';
import type { GetStaticPaths } from 'next';
import type { TableOfContentsNode } from 'components/widgets/table-of-contents';
import { PostContent } from 'features/blog/components/post-content';
import { SEO } from 'components/partials/seo';
import { graphcmsReadable } from 'lib/graphcms/clients/read';
import { postContent, allPostSlugs } from 'features/blog/graphql/posts';
import { PostContentQuery, Stage } from 'graphql/generated';
import { generateRichTextTableOfContents } from 'lib/graphcms/rich-text-indexer';
import { graphcmsWritable } from 'lib/graphcms/clients/write';
import { defaultPageLayout } from 'components/layout/default-page-layout';

export interface PostPageProps {
  preview?: boolean;
  post: PostContentQuery['post'];
  categoryLabel: string;
  tableOfContents: TableOfContentsNode[];
}

export default defaultPageLayout.wrapPage(({ preview, post, categoryLabel, tableOfContents }: PostPageProps) => {
  return (
    <>
      <SEO
        title={post?.seo?.title ?? post?.title}
        description={post?.seo?.description ?? post?.excerpt}
        keywords={post?.seo?.keywords}
        image={post?.seo?.image?.url ?? post?.coverImage?.url}
        slug={`/posts/${post?.slug}`}
      />
      <PostContent preview={preview} post={post!} categoryLabel={categoryLabel} tableOfContents={tableOfContents} />
    </>
  );
});

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const result: any = await graphcmsReadable.request(allPostSlugs);

  const { posts } = result || {};
  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps = defaultPageLayout.wrapGetStaticProps<PostPageProps, { slug: string }>(
  async ({ params, preview = false }) => {
    const result: any = await graphcmsWritable.request(postContent, {
      slug: params!.slug,
      stage: preview ? Stage.Draft : Stage.Published,
    });
    const { post } = result || {};

    if (!post) {
      return { notFound: true, revalidate: 600 };
    }

    return {
      props: {
        preview,
        post,
        categoryLabel: post?.type?.displayName ?? '',
        tableOfContents: generateRichTextTableOfContents(post?.content?.json),
      },

      // preview: revalidate after 1 second
      // published: revalidate every 10 minutes
      revalidate: preview ? 1 : 600,
    };
  },
);
