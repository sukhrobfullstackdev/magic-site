import React from 'react';
import { SEO } from 'components/partials/seo';
import { graphcmsReadable } from 'lib/graphcms/clients/read';
import { legalListing } from 'features/legal/graphql/queries';
import { createStaticDataFactories } from 'lib/nextjs-static-data-factories';

import { defaultPageLayout } from 'components/layout/default-page-layout';
import { Stage } from 'graphql/generated';
import { graphcmsWritable } from 'lib/graphcms/clients/write';

import {
  getHref,
  createSidenavData,
  LegalPageData,
  LegalPageRenderData,
  getAllSlugs,
  getLegalPageRenderData,
  SidenavData,
} from 'features/legal/legal-data';

import LegalView from 'features/legal/components/legal-view/legal-view';

interface LegalPageProps {
  preview?: boolean;
  pageData: LegalPageRenderData;
  sidenavDatas: SidenavData;
  href: string;
}

export default defaultPageLayout.wrapPage((props: LegalPageProps) => {
  const { preview, pageData, sidenavDatas, href } = props;

  return (
    <>
      <SEO title={`${pageData?.title ?? 'Legal'} | Magic`} description={pageData?.excerpt} slug={href} />
      <LegalView data={pageData} legalsideNavData={sidenavDatas} />
    </>
  );
});

export const { createGetStaticPaths, createGetStaticProps } = createStaticDataFactories<LegalPageData, LegalPageProps>({
  pathKey: 'slug',
  fallback: 'blocking',

  getData: async () => {
    const listing: any = await graphcmsReadable.request(legalListing);
    return getAllSlugs(listing).map(item => ({ ...item, listing }));
  },

  getStaticPropsWithData: async ({ data: prodData, previewData, preview = false }) => {
    if (!prodData && !previewData) {
      return { notFound: true, revalidate: 600 };
    }

    const shouldGetPreviewData = preview && ((previewData as any)?.pageID === prodData?.pageID || !prodData);

    const data = (
      shouldGetPreviewData
        ? {
            ...(previewData as any),
            listing: await graphcmsWritable.request(legalListing, { stage: Stage.Draft }),
          }
        : prodData
    ) as LegalPageData;

    const href = getHref(data.slug);
    const sidenavDatas = createSidenavData(data.listing, href);

    return {
      props: {
        preview,
        pageData: await getLegalPageRenderData(data, preview ? Stage.Draft : Stage.Published, sidenavDatas),
        sidenavDatas,
        href,
      },

      // preview: revalidate after 1 second
      // published: revalidate every 10 minutes
      revalidate: preview ? 1 : 600,
    };
  },
});

export const getStaticPaths = createGetStaticPaths();
export const getStaticProps = defaultPageLayout.wrapGetStaticProps(createGetStaticProps());
