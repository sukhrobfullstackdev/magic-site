import React from 'react';
import { GetStaticPathsContext } from 'next';

import { SEO } from 'components/partials/seo';
import { graphcmsReadable } from 'lib/graphcms/clients/read';
import { docsListing } from 'features/docs/graphql/queries';
import { createStaticDataFactories } from 'lib/nextjs-static-data-factories';
import {
  AdjacentLinks,
  createSidenavData,
  DocsPageData,
  DocsPageRenderData,
  getAdjacentLinks,
  getAllSlugs,
  getDocsHref,
  getDocsPageRenderData,
  SidenavData,
} from 'features/docs/docs-data';
import { DocsListingQuery, Stage } from 'graphql/generated';
import { DocsView } from 'features/docs/components/docs-view';
import { SidenavProvider } from 'features/docs/components/sidenav';
import { defaultPageLayout } from 'components/layout/default-page-layout';
import { graphcmsWritable } from 'lib/graphcms/clients/write';

interface DocsPageProps {
  preview?: boolean;
  pageData: DocsPageRenderData;
  sidenavData: SidenavData;
  href: string;
  adjacentLinks: AdjacentLinks;
}

interface IDocsContext extends GetStaticPathsContext {
  params: {
    slug?: Array<string>;
  };
}

export default defaultPageLayout.wrapPage((props: DocsPageProps) => {
  const { preview, pageData, sidenavData, href, adjacentLinks } = props;

  return (
    <SidenavProvider data={sidenavData}>
      <SEO
        title={pageData?.seo?.title ?? pageData?.title}
        description={pageData?.seo?.description ?? pageData?.excerpt}
        keywords={pageData?.seo?.keywords}
        image={pageData?.seo?.image?.url}
        slug={href}
      />
      <DocsView preview={preview} data={pageData} adjacentLinks={adjacentLinks} />
    </SidenavProvider>
  );
});

export const { createGetStaticPaths, createGetStaticProps } = createStaticDataFactories<DocsPageData, DocsPageProps>({
  pathKey: 'slug',
  fallback: 'blocking',

  getData: async () => {
    const listing: any = await graphcmsReadable.request(docsListing);

    return getAllSlugs(listing).map(item => ({ ...item, listing }));
  },

  getStaticPropsWithData: async ({ data: prodData, previewData, preview = false, params }) => {
    const ancestrySlug = params?.slug?.[0];
    const MATCH_PATTERNS = ['api-reference', 'introduction', 'login-methods'];
    const AUTH_MATCH = MATCH_PATTERNS.indexOf(ancestrySlug!) > -1;

    /** Check if we have data for that path atleast to avoid create unstable false redirects */
    if (AUTH_MATCH) {
      return {
        redirect: {
          destination: `/docs/auth/${(params?.slug as string[])?.join?.('/')}`,
          permanent: true,
        },
      };
    }

    if (!prodData && !previewData) {
      return { notFound: true, revalidate: 600 };
    }

    const shouldGetPreviewData = preview && ((previewData as any)?.pageID === prodData?.pageID || !prodData);

    const data = (
      shouldGetPreviewData
        ? {
            ...(previewData as any),
            listing: await graphcmsWritable.request(docsListing, {
              stage: Stage.Draft,
            }),
          }
        : prodData
    ) as DocsPageData;

    const href = getDocsHref(data.slug);

    const ancestorListing = data.listing.docsCategories.filter(({ ancestor }) => ancestor?.slug === ancestrySlug);

    const sidenavData = createSidenavData({ ...data.listing, docsCategories: ancestorListing }, href);

    return {
      props: {
        preview,
        pageData: await getDocsPageRenderData(data, preview ? Stage.Draft : Stage.Published, sidenavData),
        sidenavData,
        href,
        adjacentLinks: await getAdjacentLinks(data, sidenavData),
      },

      // preview: revalidate after 1 second
      // published: revalidate every 10 minutes
      revalidate: preview ? 1 : 600,
    };
  },
});

export const getStaticPaths = createGetStaticPaths();
export const getStaticProps = defaultPageLayout.wrapGetStaticProps(createGetStaticProps());
