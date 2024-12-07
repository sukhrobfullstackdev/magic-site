import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { DocSearchButton, useDocSearchKeyboardEvents, DocSearchModal } from '@docsearch/react';
import { Media } from '@magiclabs/ui';
import { OLD_ALGOLIA_CONFIG } from 'constants/config';

import '@docsearch/css/dist/style.css';

import styles from './algolia-search-bar.module.less';

const Hit: React.FC<any> = ({ hit = {}, children }) => {
  return <Link href={hit.url}>{children}</Link>;
};

const DocSearch: React.FC<any> = ({ appId, ...props }) => {
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(null);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const onInput = useCallback(event => {
    setIsOpen(true);
    setInitialQuery(event.key);
  }, []);

  const transformItems = useRef(items => {
    return items.map(item => {
      // We transform the absolute URL into a relative URL.
      // Alternatively, we can use `new URL(item.url)` but it's not
      // supported in IE.
      const a = document.createElement('a');
      a.href = item.url;

      const modifiedItem = {
        ...item,
        url: `${a.pathname}${a.hash}`,
      };

      // transform the snippet content to prevent unexpected newlines breaking the styling
      if (modifiedItem.type === 'content') {
        if (modifiedItem._snippetResult?.content?.value) {
          modifiedItem._snippetResult.content.value = modifiedItem._snippetResult.content.value.replaceAll('\r\n', ' ');
        }
      }

      return modifiedItem;
    });
  }).current;

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <div className={styles.DocSearchWrapper}>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link rel="preconnect" href={`https://${appId}-dsn.algolia.net`} crossOrigin="anonymous" />
      </Head>

      <DocSearchButton
        onClick={onOpen}
        // ref={searchButtonRef}
        translations={{
          buttonText: 'Search',
          buttonAriaLabel: 'Search in documentation',
        }}
      />

      {/* <Media lessThan="lg">
        <button onClick={onOpen} className={styles.mobileIcon}>
          <img src="/images/icons/search-icon.png" alt=" " aria-hidden="true" />
        </button>
      </Media> */}

      {isOpen && (
        <DocSearchModal
          onClose={() => setIsOpen(false)}
          initialScrollY={window.scrollY}
          initialQuery={initialQuery}
          transformItems={transformItems}
          hitComponent={Hit}
          appId={appId}
          {...props}
        />
      )}
    </div>
  );
};

export const SearchBar: React.FC = () => {
  return <DocSearch {...OLD_ALGOLIA_CONFIG} />;
};
