import React, { useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { Icon, MonochromeIcons, clsx } from '@magiclabs/ui';
import type { SidenavPageNode, SidenavCategoryNode, SidenavData, SidenavTree } from 'features/docs/docs-data';
import Link from 'next/link';
import { useForceUpdate } from 'usable-react';
import { Router } from 'next/router';

import { GraphCMSImage } from 'components/widgets/graphcms-image';
import { defaultPageLayout, DefaultPageViewData } from 'components/layout/default-page-layout';

import { SearchBar } from '../algolia-search-bar';
import IconExternalLink from './icon-external-link.svg';

import styles from './sidenav.module.less';

interface SidenavContext {
  isAccordionExpanded: (id: string) => boolean;
  toggleAccordion: (id: string) => void;
  data: SidenavData;
  hasSidenav: boolean;
}

const SidenavContext = createContext<SidenavContext>({
  isAccordionExpanded: () => false,
  toggleAccordion: () => {},
  data: { tree: [], flatPages: [] },
  hasSidenav: false,
});

interface SidenavProviderProps {
  data?: SidenavData;
  children: React.ReactNode;
}

/**
 * Wraps a page with contextual sidenav state that persists across navigations.
 */
export const SidenavProvider: React.FC<SidenavProviderProps> = props => {
  const { data, children } = props;

  if (!data) {
    return <div>{children}</div>;
  }

  const forceUpdate = useForceUpdate();
  const expandedCategoryIDs = useRef<Set<string>>(new Set());

  const isAccordionExpanded = useCallback((id: string) => {
    return expandedCategoryIDs.current.has(id);
  }, []);

  const toggleAccordion = useCallback((id: string) => {
    if (expandedCategoryIDs.current.has(id)) {
      expandedCategoryIDs.current.delete(id);
    } else {
      expandedCategoryIDs.current.add(id);
    }
    forceUpdate();
  }, []);

  const ctx: SidenavContext = {
    isAccordionExpanded,
    toggleAccordion,
    data,
    hasSidenav: true,
  };

  return <SidenavContext.Provider value={ctx}>{children}</SidenavContext.Provider>;
};

export function useSidenavContext() {
  return useContext(SidenavContext);
}

interface SidenavProps {
  onRouterChange?: () => void;
}

/**
 * A sidenav component that renders a docs searchbar, important navigation
 * links, and an accordion of docs categories & pages.
 */
export const Sidenav: React.FC<SidenavProps> = props => {
  const { onRouterChange } = props;
  const { data } = useSidenavContext();
  const children = categorizeAccordionChildren(data.tree);

  // Check if router has change and fire the `onRouterChange` function.
  useEffect(() => {
    const listener = () => onRouterChange?.();
    Router.events.on('routeChangeComplete', listener);
    return () => Router.events.off('routeChangeComplete', listener);
  }, [onRouterChange]);

  return (
    <aside className={styles.Sidenav}>
      {/* Accordion links */}
      <div className={styles.accordion}>
        <div className={styles.accordionInner}>{children}</div>
      </div>
    </aside>
  );
};

/**
 * Renders an inline (non-expandable) category of pages.
 */
const InlineCategory: React.FC<{ node: SidenavCategoryNode; indentLevel: number }> = props => {
  const { node, indentLevel } = props;

  const children = categorizeAccordionChildren(node.children, indentLevel);

  return (
    <div className={clsx('accordionChild___', styles.InlineCategory)}>
      <h5>{node.label}</h5>
      {children}
    </div>
  );
};

/**
 * Renders an expandable category of pages.
 */
const AccordionCategory: React.FC<{ node: SidenavCategoryNode; indentLevel: number }> = props => {
  const { node, indentLevel } = props;

  const children = categorizeAccordionChildren(node.children, indentLevel);

  const { isAccordionExpanded, toggleAccordion } = useSidenavContext();

  useEffect(() => {
    // Expand the category initially if the currently rendered page is within it
    if (node.isActive && !isAccordionExpanded(node.id)) {
      toggleAccordion(node.id);
    }
  }, [node.isActive]);

  const handleClick = useCallback(() => {
    toggleAccordion(node.id);
  }, [node.id]);

  const isActive = isAccordionExpanded(node.id);

  return (
    <div className={styles.AccordionCategory}>
      <button onClick={handleClick} className={clsx(isActive && styles.active)}>
        <span>{node.label}</span>
        <Icon type={MonochromeIcons.CaretRight} style={{ transform: isActive ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
      </button>
      {isActive ? (
        <div className="accordionChild___" style={{ marginLeft: 15 * indentLevel }}>
          {children}
        </div>
      ) : null}
    </div>
  );
};

/**
 * Renders an internal documentation page link (within the accordion menu).
 */
const DocsLink: React.FC<{ node: SidenavPageNode }> = props => {
  const { node } = props;
  const isExternalLink = node.href.includes('https-magic');

  return !isExternalLink ? (
    <Link href={node.href} passHref className={clsx(node.isActive && styles.active)}>
      {node.label}
    </Link>
  ) : (
    <a className={styles.externalLink} href={node.title || node.href} rel="noreferrer" target="_blank">
      {node.label}
      {!!isExternalLink && <img src={IconExternalLink} alt="External Link" />}
    </a>
  );
};

/**
 * Prepares a list of accordion menu child elements.
 */
function categorizeAccordionChildren(data: SidenavTree, indentLevel = 0): React.ReactNode {
  return data.reduce((result, node) => {
    if (node.type === 'DocsCategory') {
      return [
        ...result,
        node.isExpandable ? (
          <AccordionCategory key={node.id} node={node} indentLevel={indentLevel + 1} />
        ) : (
          <InlineCategory key={node.id} node={node} indentLevel={indentLevel} />
        ),
      ];
    }

    if (node.isHidden) {
      return result;
    }

    return [...result, <DocsLink key={node.id} node={node} />];
  }, [] as JSX.Element[]);
}
