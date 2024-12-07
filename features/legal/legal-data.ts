import { LegalListingQuery, Maybe, Stage } from 'graphql/generated';
import { UnwrapArray } from 'types/util';
import { generateRichTextTableOfContents } from 'lib/graphcms/rich-text-indexer';
import type { TableOfContentsNode } from 'components/widgets/table-of-contents';
import { graphcmsWritable } from 'lib/graphcms/clients/write';
import { legalBasicPage } from './graphql/queries';

interface SidenavNodeBase {
  id: string;
  label?: Maybe<string>;
  isActive?: boolean;
}

export interface SidenavCategoryNode extends SidenavNodeBase {
  type: 'LegalCategory';
  children: SidenavTree;
}

export interface SidenavPageNode extends SidenavNodeBase {
  type: 'LegalBasicPage';
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
 * Creates a data structure supporting the legal page sidenav.
 */
export function createSidenavData(query: LegalListingQuery, href: string): SidenavData {
  const { legalCategories, legalBasicPages } = query;

  const allElements = [...legalCategories, ...legalBasicPages];

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
        case 'LegalCategory': {
          // Recursively create a sidenav tree for the children of this category.
          const children =
            (currElement as any)?.children
              ?.map(child => child.id)
              .reduce(createReducer(currElement?.slug ? [...slug, currElement?.slug] : [...slug, ...[]]), []) ?? [];

          const sidenavNode: SidenavCategoryNode = {
            ...baseSidenavNode,
            type: 'LegalCategory',
            isActive: hasActiveSidenavChild(children),
            children,
          };

          return [...acc, sidenavNode];
        }

        case 'LegalBasicPage': {
          const nextHref = [...slug, currElement.slug].join('/');

          const sidenavNode: SidenavPageNode = {
            ...baseSidenavNode,
            type: 'LegalBasicPage',
            isActive: href === nextHref,
            href: nextHref,
            title: currElement.title,
          };

          return [...acc, sidenavNode];
        }

        default:
          return acc;
      }
    };

  const rootIDs = legalCategories.find(category => !!category.isRoot)?.children?.map(({ id }) => id) ?? [];

  const tree: SidenavTree = rootIDs.reduce(createReducer([`/legal`]), []);

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
    if (child.type === 'LegalCategory') {
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
    if (child.type === 'LegalCategory') {
      return [...acc, ...getFlattenedSidenavPages(child.children)];
    }

    return [...acc, child];
  }, [] as SidenavPageNode[]);
}

// -------------------------------------------------------------------------- //

/**
 * Gets all slugs for legal pages to be used by NextJS's static data fetchers
 * like `getStaticPaths` and `getStaticProps`.
 */
export function getAllSlugs(query: LegalListingQuery) {
  const { legalCategories, legalBasicPages } = query;

  const createSlugEntry = (initialSlug: string[], element: typeof legalBasicPages[number]) => {
    const slug = [...initialSlug];

    let parent = legalCategories.find(category => category.id === element?.parent?.id);

    if (!parent?.isRoot) {
      if (parent?.slug) slug.unshift(parent?.slug);
      // eslint-disable-next-line no-loop-func
      parent = legalCategories.find(category => category?.id === element?.parent?.id);
    }

    return { pageID: element.id, slug, pageType: element.__typename };
  };

  return [...legalBasicPages.map(element => createSlugEntry([element.slug], element))];
}

// -------------------------------------------------------------------------- //

export type LegalPageData = UnwrapArray<ReturnType<typeof getAllSlugs>> & {
  listing: LegalListingQuery;
};

export interface LegalPageRenderData {
  title?: Maybe<string>;
  excerpt?: Maybe<string>;
  content?: any;
  date: string;
  tableOfContents?: TableOfContentsNode[];
  href: string;
}

export async function getLegalPageRenderData(
  data: LegalPageData,
  stage: Stage,
  sidenavData: SidenavData,
): Promise<LegalPageRenderData> {
  const legal: any = await graphcmsWritable.request(legalBasicPage, { id: data!.pageID, stage });
  const cmsNode = legal.legalBasicPage;

  return {
    title: cmsNode?.title ?? null,
    excerpt: cmsNode?.excerpt ?? null,
    content: cmsNode?.content?.markdown ?? null,
    date: cmsNode?.effectiveDate,
    tableOfContents: generateRichTextTableOfContents(cmsNode?.content?.json as any),
    href: sidenavData.flatPages.find(page => page.id === data.pageID)?.href ?? '/',
  };
}

/**
 * Simple helper function to generate a Legal HREF from a slug (string[]).
 */
export function getHref(slug: string[] = []) {
  return ['/legal', ...slug].join('/');
}
