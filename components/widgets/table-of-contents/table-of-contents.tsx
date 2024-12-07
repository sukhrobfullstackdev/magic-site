import React, { useState, useEffect, useCallback, useRef } from 'react';
import { clsx, Linkable, Flex, Media, mergeProps } from '@magiclabs/ui';
import { useRouter } from 'next/router';
import { head } from 'lodash';

import styles from './table-of-contents.module.less';

export interface TableOfContentsNode {
  lvl: number;
  content: string;
  slug: string;
}

interface TableOfContentsProps {
  title: string;
  structure: TableOfContentsNode[];
  hasBorderLeft?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  maxWidth?: React.CSSProperties['maxWidth'];
  maxHeight?: React.CSSProperties['maxHeight'];
}

export const TableOfContents: React.FC<TableOfContentsProps> = props => {
  const { title, structure, hasBorderLeft = true, onClick, maxHeight, maxWidth } = props;

  const [selectedHeadings, setSelectedHeadings] = useState<string[]>([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const linksContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Filter just the first two levels of headings heirarchy
  const tocData = structure.filter(t => t.lvl < 3);

  useEffect(() => {
    recalculateSelectedHeading();
    checkIfScrolled();
    document.addEventListener('scroll', recalculateSelectedHeading);
    window.addEventListener('resize', recalculateSelectedHeading);
    linksContainerRef.current?.addEventListener('scroll', checkIfScrolled);

    return () => {
      document.removeEventListener('scroll', recalculateSelectedHeading);
      window.removeEventListener('resize', recalculateSelectedHeading);
      linksContainerRef.current?.removeEventListener('scroll', checkIfScrolled);
    };
  }, [router.asPath]);

  const checkIfScrolled = useCallback(() => {
    setShowScrollIndicator(linksContainerRef.current?.scrollTop !== 0);
  }, []);

  const recalculateSelectedHeading = useCallback(() => {
    const nextSelectedHeadings: string[] = [];

    // If the first slug is "below the fold," then we can assume no headings are visible.
    if (head(tocData)) {
      const firstHeadingElement = document.getElementById(head(tocData)!.slug);
      if (firstHeadingElement && isBelowViewport(firstHeadingElement)) {
        setSelectedHeadings([]);
        return;
      }
    }

    // For each heading, we check to see if it's visible in the viewport.
    // If so, we will highlight it!
    for (const heading of tocData) {
      const headingElement = document.getElementById(heading.slug);

      if (headingElement && isInViewport(headingElement)) {
        // always make sure the header element is selected in the case
        // where the user starts from the top scroll
        nextSelectedHeadings.pop();
        if (window.scrollY <= 1) {
          nextSelectedHeadings.push(tocData[0].slug);
        } else {
          nextSelectedHeadings.push(heading.slug);
        }
      }
    }

    // If no headings are found in the viewport, we can assume the user is
    // between headings while scrolling linearly through the page.
    if (nextSelectedHeadings.length) {
      setSelectedHeadings(nextSelectedHeadings);
    }
  }, [tocData]);

  return (
    <div className={styles.TOCWrapper}>
      <Flex.Column
        className={clsx(styles.TableOfContents, hasBorderLeft && styles.hasBorderLeft)}
        style={{ maxHeight, maxWidth }}
      >
        <div className={clsx([styles.title, showScrollIndicator && styles.showScrollIndicator])}>{title}</div>
        <Flex.Column className={styles.links} ref={linksContainerRef}>
          {tocData.map(linkData => {
            return (
              <TableOfContentsLink
                key={linkData.slug}
                {...linkData}
                onClick={onClick}
                selectedHeading={selectedHeadings[0]}
                linksContainerRef={linksContainerRef}
              />
            );
          })}
        </Flex.Column>
      </Flex.Column>
    </div>
  );
};

interface TableOfContentsLinkProps extends TableOfContentsNode {
  selectedHeading: string;
  linksContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const TableOfContentsLink: React.FC<TableOfContentsLinkProps> = props => {
  const { slug, content, lvl, selectedHeading, linksContainerRef, onClick } = props;

  const ref = useRef<HTMLAnchorElement | null>(null);
  const shouldScrollIntoView = selectedHeading === slug;

  /**
   * TODO: This is a hacky way to make sure the link is scrolled into view.
   * For some reason, the link scroll is messed up when the user does a section routing.
   */
  // useEffect(() => {
  //   // Make sure the selected link is approximately in the center of the ToC scroll view.
  //   if (linksContainerRef.current) {
  //     if (ref.current) {
  //       linksContainerRef.current.scrollTop =
  //         ref.current?.offsetTop - linksContainerRef.current.offsetHeight / 2 - linksContainerRef.current.offsetTop;
  //     }
  //   }
  // }, [shouldScrollIntoView]);

  return (
    <Linkable className={styles.slugContainer}>
      <a
        key={slug}
        href={`#${slug}`}
        onClick={onClick}
        className={clsx([lvl === 1 ? styles.h1 : styles.h2, shouldScrollIntoView && styles.selected])}
        ref={ref}
      >
        {content}
      </a>
    </Linkable>
  );
};

function isBelowViewport<T extends HTMLElement>(element: T) {
  const rect = element.getBoundingClientRect();
  return rect.top >= (window.innerHeight || document.documentElement.clientHeight);
}

function isInViewport<T extends HTMLElement>(element: T) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
