import React from 'react';
import { graphcmsReadable } from 'lib/graphcms/clients/read';
import { siteConfig } from 'graphql/queries/site-config';
import { Maybe, SiteConfigsQuery } from 'graphql/generated';
import { MainNav } from 'components/partials/main-nav';
import { Footer } from 'components/partials/footer';
import { darkThemeRoutes } from 'constants/dark-theme-routes';
import { Banner } from 'components/partials/banner';
import { SidenavProvider } from 'features/docs/components/sidenav';
import { createLayout } from 'next-super-layout';

export interface DefaultPageViewData {
  mainNav: {
    leftLinks: SiteConfigsQuery['siteConfigs'][number]['mainNavigationsLeft'];
    rightLinks: SiteConfigsQuery['siteConfigs'][number]['rightMainNavLinks'];
    callToAction: SiteConfigsQuery['siteConfigs'][number]['mainNavCTA'];
  };

  docsNav: {
    links: SiteConfigsQuery['siteConfigs'][number]['docsNavLinks'];
    docsAncestors: SiteConfigsQuery['siteConfigs'][number]['docsAncestors'];
  };

  banner: {
    text: Maybe<string>;
    url: Maybe<string>;
  };
}

export const defaultPageLayout = createLayout<DefaultPageViewData>({
  name: 'defaultPage',

  getLayout: page => {
    const docsSidenavData = page.props.sidenavData;
    const darkThemePage = page.props?.pageData?.pageTheme === 'Dark' && `/${page.props.pageData.pageURL}`;
    const darkThemePages = darkThemePage ? [...darkThemeRoutes, darkThemePage] : darkThemeRoutes;

    return (
      <>
        <Banner
          allowedURLs={[
            { url: '/', theme: 'dark' },
            { url: '/startups', theme: 'dark' },
          ]}
        />
        <SidenavProvider data={docsSidenavData}>
          <MainNav darkThemePages={darkThemePages} />
          <div style={{ position: 'relative' }}>{page}</div>
          <Footer darkThemePages={[...darkThemePages, '/pricing']} />
        </SidenavProvider>
      </>
    );
  },

  getData: async () => {
    const data: any = await graphcmsReadable.request(siteConfig);

    const {
      siteConfigs: [config],
    } = data;

    return {
      mainNav: {
        leftLinks: config.mainNavigationsLeft,
        rightLinks: config.rightMainNavLinks,
        callToAction: config.mainNavCTA,
      },

      docsNav: {
        links: config.docsNavLinks,
        docsAncestors: config.docsAncestors,
      },

      banner: {
        text: config.bannerText ?? null,
        url: config.bannerURL ?? null,
      },
    };
  },
});
