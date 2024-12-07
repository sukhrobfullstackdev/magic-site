import { DocsListingQuery, Maybe, Seo, Stage } from 'graphql/generated';
import { docsBuildADemoPage, docsPage, docsQuickstartPage } from 'features/docs/graphql/queries';
import { UnwrapArray } from 'types/util';
import { generateRichTextTableOfContents, RichTextAST } from 'lib/graphcms/rich-text-indexer';
import { DeepPartial } from 'ts-essentials';
import type { TableOfContentsNode } from 'components/widgets/table-of-contents';
import { graphcmsWritable } from 'lib/graphcms/clients/write';

interface SidenavNodeBase {
  id: string;
  label?: Maybe<string>;
  isActive?: boolean;
}

export interface SidenavCategoryNode extends SidenavNodeBase {
  isExpandable: boolean;
  type: 'DocsCategory';
  children: SidenavTree;
}

export interface SidenavPageNode extends SidenavNodeBase {
  type: 'DocsPage' | 'DocsBuildADemoPage' | 'DocsQuickstartPage';
  href: string;
  title?: Maybe<string>;
  // Whether to hide the page from the sidenav tree
  // (the node is still included in the adjacent links navigator, though).
  isHidden?: boolean;
}

export type SidenavNode = SidenavCategoryNode | SidenavPageNode;
export type SidenavTree = Array<SidenavNode>;

export interface SidenavData {
  tree: SidenavTree;
  flatPages: SidenavPageNode[];
}

/**
 * Creates a data structure supporting the docs page sidenav.
 */
export function createSidenavData(query: DocsListingQuery, href: string): SidenavData {
  const { docsCategories, docsPages, docsBuildADemoPages, docsQuickstartPages } = query;

  const allElements = [...docsCategories, ...docsPages, ...docsBuildADemoPages, ...docsQuickstartPages];

  const createReducer =
    (slug: string[] = []) =>
    (acc: any, curr: string) => {
      const currElement = allElements.find(category => {
        return category.id === curr;
      });

      const baseSidenavNode: SidenavNodeBase = {
        id: currElement?.id || '',
        label: currElement?.sidenavLabel,
        // `isActive` is set based on the type of the current node.
      };

      switch (currElement?.__typename) {
        case 'DocsCategory': {
          // Recursively create a sidenav tree for the children of this category.
          const children =
            (currElement as any)?.children
              ?.map(child => child.id)
              .reduce(createReducer([...slug, currElement.slug]), []) ?? [];

          const sidenavNode: SidenavCategoryNode = {
            ...baseSidenavNode,
            type: 'DocsCategory',
            isExpandable: !!currElement.isExpandable,
            isActive: hasActiveSidenavChild(children),
            children,
          };

          return [...acc, sidenavNode];
        }

        case 'DocsPage': {
          const nextHref = [...slug, currElement.slug].join('/');

          const sidenavNode: SidenavPageNode = {
            ...baseSidenavNode,
            type: 'DocsPage',
            isActive: href === nextHref,
            href: nextHref,
            title: currElement.title,
          };

          return [...acc, sidenavNode];
        }

        case 'DocsBuildADemoPage': {
          // This is a special case where we generate two sidenav nodes, one for
          // browser-based demos & another for local demos.

          const browserHref = [...slug, 'build-a-demo', 'browser'].join('/');
          const localHref = [...slug, 'build-a-demo', 'locally'].join('/');
          const isActive = href === browserHref || href === localHref;

          const baseBuildADemoPageNode = {
            ...baseSidenavNode,
            type: 'DocsBuildADemoPage',
            isActive,
          } as const;

          const browserNode: SidenavPageNode = {
            ...baseBuildADemoPageNode,
            href: browserHref,
            title: `${currElement.title} (Build in the Browser)`,
          };

          const localNode: SidenavPageNode = {
            ...baseBuildADemoPageNode,
            href: localHref,
            title: `${currElement.title} (Build Locally)`,
            isHidden: true,
          };

          return [...acc, browserNode, localNode];
        }

        case 'DocsQuickstartPage': {
          // This is a special case where we generate two sidenav nodes, one for
          // CLI-based quickstarts & another for integration-based quickstarts.

          const cliHref = [...slug, 'quickstart', 'cli'].join('/');
          const integrationHref = [...slug, 'quickstart', 'integration'].join('/');
          const isActive = href === cliHref || href === integrationHref;

          const baseQuickstartPageNode = {
            ...baseSidenavNode,
            type: 'DocsQuickstartPage',
            isActive,
          } as const;

          const cliNode: SidenavPageNode = {
            ...baseQuickstartPageNode,
            href: cliHref,
            title: `${currElement.title} (Build using our CLI tool)`,
          };

          const integrationNode: SidenavPageNode = {
            ...baseQuickstartPageNode,
            href: integrationHref,
            title: `${currElement.title} (Integrate into your app)`,
            isHidden: true,
          };

          return [...acc, cliNode, integrationNode];
        }

        default:
          return acc;
      }
    };

  const rootSlug = docsCategories.find(category => !!category.isRoot)?.ancestor?.slug || '';
  const rootIDs = docsCategories.find(category => !!category.isRoot)?.children?.map(({ id }) => id) ?? [];

  const tree: SidenavTree = rootIDs.reduce(createReducer([`/docs`, rootSlug]), []);

  return {
    tree,
    flatPages: getFlattenedSidenavPages(tree),
  };
}

/**
 * Recursively checks if any of children of a `SidenavTree` are "active" based
 * on the `isActive` property of a `SidenavNode`.
 */
function hasActiveSidenavChild(node: SidenavTree): boolean {
  return node.some(child => {
    if (child.type === 'DocsCategory') {
      return hasActiveSidenavChild(child.children);
    }

    return child.isActive;
  });
}

/**
 * Returns a flattened array of all `SidenavPageNode`s in the given `SidenavTree`.
 */
function getFlattenedSidenavPages(node: SidenavTree): SidenavPageNode[] {
  return node.reduce((acc, child) => {
    if (child.type === 'DocsCategory') {
      return [...acc, ...getFlattenedSidenavPages(child.children)];
    }

    return [...acc, child];
  }, [] as SidenavPageNode[]);
}

// -------------------------------------------------------------------------- //

/**
 * Gets all slugs for docs pages to be used by NextJS's static data fetchers
 * like `getStaticPaths` and `getStaticProps`.
 */
export function getAllSlugs(query: DocsListingQuery) {
  const { docsCategories, docsPages, docsBuildADemoPages, docsQuickstartPages } = query;

  const createSlugEntry = (
    initialSlug: string[],
    element: typeof docsPages[number] | typeof docsBuildADemoPages[number] | typeof docsQuickstartPages[number],
  ) => {
    const slug = [...initialSlug];

    let parent = docsCategories.find(category => category.id === element.parent?.id);
    const ancestor = parent?.ancestor;

    while (parent && !parent.isRoot) {
      slug.unshift(parent.slug);
      // eslint-disable-next-line no-loop-func
      parent = docsCategories.find(category => category?.id === parent?.parent?.id);
    }

    /**
     * At this stage we have gotten the built URL, and we just need to attach an ancestor profile
     */
    if (ancestor) slug.unshift(ancestor?.slug);

    return { pageID: element.id, slug, pageType: element.__typename };
  };

  return [
    ...docsPages.map(element => createSlugEntry([element.slug], element)),
    ...docsBuildADemoPages.map(element => createSlugEntry(['build-a-demo', 'browser'], element)),
    ...docsBuildADemoPages.map(element => createSlugEntry(['build-a-demo', 'locally'], element)),
    ...docsQuickstartPages.map(element => createSlugEntry(['quickstart', 'cli'], element)),
    ...docsQuickstartPages.map(element => createSlugEntry(['quickstart', 'integration'], element)),
  ];
}

// -------------------------------------------------------------------------- //

export type DocsPageData = UnwrapArray<ReturnType<typeof getAllSlugs>> & {
  listing: DocsListingQuery;
};

export interface DocsPageRenderData {
  title?: Maybe<string>;
  excerpt?: Maybe<string>;
  content?: Maybe<RichTextAST>;
  sharedContent?: Maybe<RichTextAST>;
  sharedContentReferences?: any;
  references?: any;
  layout: 'DEFAULT' | 'BUILD_A_DEMO' | 'QUICKSTART';
  seo?: DeepPartial<Maybe<Seo>>;
  tableOfContents?: TableOfContentsNode[];
  href: string;
}

export async function getDocsPageRenderData(
  data: DocsPageData,
  stage: Stage,
  sidenavData: SidenavData,
): Promise<DocsPageRenderData> {
  switch (data!.pageType) {
    case 'DocsBuildADemoPage': {
      const docs: any = await graphcmsWritable.request(docsBuildADemoPage, { id: data!.pageID, stage });
      const cmsNode = docs.docsBuildADemoPage;

      const content =
        data.slug[data.slug.length - 1] === 'browser'
          ? cmsNode?.browserContent?.json ?? null
          : cmsNode?.localContent?.json ?? null;

      const references =
        data.slug[data.slug.length - 1] === 'browser'
          ? cmsNode?.browserContent?.references ?? null
          : cmsNode?.localContent?.references ?? null;

      const pageIndex = sidenavData.flatPages.findIndex(page => page.id === data.pageID);
      const href =
        data.slug[data.slug.length - 1] === 'browser'
          ? sidenavData.flatPages[pageIndex]?.href
          : sidenavData.flatPages[pageIndex + 1]?.href;

      return {
        title: cmsNode?.title ?? null,
        excerpt: cmsNode?.excerpt ?? null,
        content,
        references,
        seo: cmsNode?.seo ?? null,
        layout: 'BUILD_A_DEMO',
        tableOfContents: generateRichTextTableOfContents(content),
        href: href || '',
      };
    }

    case 'DocsQuickstartPage': {
      const docs: any = await graphcmsWritable.request(docsQuickstartPage, { id: data!.pageID, stage });
      const cmsNode = docs.docsQuickstartPage;

      const content =
        data.slug[data.slug.length - 1] === 'cli'
          ? cmsNode?.cliContent?.json ?? null
          : cmsNode?.integrationContent?.json ?? null;

      const references =
        data.slug[data.slug.length - 1] === 'cli'
          ? cmsNode?.cliContent?.references ?? null
          : cmsNode?.integrationContent?.references ?? null;

      const pageIndex = sidenavData.flatPages.findIndex(page => page.id === data.pageID);
      const href =
        data.slug[data.slug.length - 1] === 'cli'
          ? sidenavData.flatPages[pageIndex]?.href
          : sidenavData.flatPages[pageIndex + 1]?.href;

      return {
        title: cmsNode?.title ?? null,
        excerpt: cmsNode?.excerpt ?? null,
        sharedContent: cmsNode?.sharedContent?.json ?? null,
        sharedContentReferences: cmsNode?.sharedContent?.references ?? null,
        content,
        references,
        seo: cmsNode?.seo ?? null,
        layout: 'QUICKSTART',
        tableOfContents: generateRichTextTableOfContents(content),
        href: href || '',
      };
    }

    case 'DocsPage':
    default: {
      const docs: any = await graphcmsWritable.request(docsPage, { id: data!.pageID, stage });
      const cmsNode = docs.docsPage;

      return {
        title: cmsNode?.title ?? null,
        excerpt: cmsNode?.excerpt ?? null,
        content: cmsNode?.content?.json ?? null,
        references: cmsNode?.content?.references ?? null,
        seo: cmsNode?.seo,
        layout: 'DEFAULT',
        tableOfContents: generateRichTextTableOfContents(cmsNode?.content?.json),
        href: sidenavData.flatPages.find(page => page.id === data.pageID)?.href ?? '/',
      };
    }
  }
}

/**
 * Simple helper function to generate a docs HREF from a slug (string[]).
 */
export function getDocsHref(slug: string[] = []) {
  return ['/docs', ...slug].join('/');
}

// -------------------------------------------------------------------------- //

export interface AdjacentLink {
  title: Maybe<string>;
  href: Maybe<string>;
}

export interface AdjacentLinks {
  next: AdjacentLink | null;
  previous: AdjacentLink | null;
}

/**
 * Returns a structure representing the `next` and `previous` links in context
 * of the current page's sidenav position.
 */
export async function getAdjacentLinks(data: DocsPageData, sidenavData: SidenavData): Promise<AdjacentLinks> {
  const postIndex = sidenavData.flatPages.findIndex(header => header.href === getDocsHref(data.slug));

  // For some reason, the post was not found, so we'll skip rendering the adjacent links navigator.
  if (postIndex < 0) {
    return { previous: null, next: null };
  }

  const prevNode = postIndex <= 0 ? null : sidenavData.flatPages[postIndex - 1];
  const nextNode = postIndex >= sidenavData.flatPages.length - 1 ? null : sidenavData.flatPages[postIndex + 1];

  return {
    previous: {
      title: prevNode?.title ?? null,
      href: prevNode?.href ?? null,
    },

    next: {
      title: nextNode?.title ?? null,
      href: nextNode?.href ?? null,
    },
  };
}
