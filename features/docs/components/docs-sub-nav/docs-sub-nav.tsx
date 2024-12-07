import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { clsx, Media } from '@magiclabs/ui';

import { defaultPageLayout } from 'components/layout/default-page-layout';

import { SearchBar } from '../algolia-search-bar';

import styles from './docs-sub-nav.module.less';

interface NavItems {
  title: string | React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  options?: {
    noPadding?: boolean;
  };
}

const RIGHT_SIDE_NAV_ITEMS: NavItems[] = [
  {
    title: <img src="/images/icons/icon-discord-circle.svg" alt="Discord" />,
    href: 'https://discord.com/invite/magiclabs',
    target: '_blank',
    rel: 'noopener noreferrer',
    options: {
      noPadding: true,
    },
  },
  {
    title: <img src="/images/icons/icon-github-circle.svg" alt="Github" />,
    href: 'https://github.com/magiclabs',
    target: '_blank',
    rel: 'noopener noreferrer',
    options: {
      noPadding: true,
    },
  },
  {
    title: <SearchBar />,
    href: '#!',
    options: {
      noPadding: true,
    },
  },
];

const DocsSubNavbar = () => {
  const router = useRouter();
  const {
    docsNav: { docsAncestors },
  } = defaultPageLayout.useData();

  const left_nav_link = docsAncestors.map(ancestor => {
    return {
      id: ancestor.id,
      title: ancestor.name,
      href: ancestor.location!,
    };
  });

  const getRootPath = () => {
    const getresolvingPath = router.pathname.includes('...') ? router.asPath : router.pathname;
    const pathParts = getresolvingPath.split('/');
    return pathParts.slice(0, 3).join('/');
  };

  const renderNavItems = (items: NavItems[]) => {
    return items.map(item => {
      const { title, href, target, rel, options } = item;
      const { noPadding } = options || {};
      const active = href.includes(getRootPath());

      return (
        <div
          key={href}
          className={clsx(
            styles.subNavItem,
            noPadding && styles.noPadding,
            active && `${styles.subNavItemActive} activeNavItem`,
          )}
        >
          {target && rel ? (
            <a href={href} target={target} rel={rel}>
              {title}
            </a>
          ) : (
            <Link href={href} passHref>
              {title}
            </Link>
          )}
        </div>
      );
    });
  };
  return (
    <div className={styles.subNavWrapper}>
      <div className={styles.subNav}>
        <div className={styles.innerNavWrapper}>
          <Media lessThan="lg" className={styles.searchBar}>
            <SearchBar />
          </Media>
          {renderNavItems(left_nav_link)}
        </div>
        <Media greaterThanOrEqual="lg" className={styles.innerNavWrapper}>
          <div className={styles.innerNavWrapper}>{renderNavItems(RIGHT_SIDE_NAV_ITEMS)}</div>
        </Media>
      </div>
    </div>
  );
};

export default DocsSubNavbar;
