import React, { useState, useRef, useCallback } from 'react';
import { useIsomorphicLayoutEffect, transitions, clsx, mergeProps } from '@magiclabs/ui';
import { useDomEvent } from 'usable-react';
import { AnimatePresence, motion } from 'framer-motion';
import { IS_CLIENT } from 'constants/environment-detection';

import styles from './carousel.module.less';

interface CarouselProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  theme?: 'light' | 'dark';
  noHint?: boolean;
}

const CarouselImpl: React.FC<CarouselProps> = ({ children, noHint, theme = 'light', ...otherProps }) => {
  const [scrollHint, setScrollHint] = useState('');
  const scrollviewRef = useRef<HTMLDivElement | null>(null);

  const updateScrollHintState = useCallback(() => {
    if (scrollviewRef.current) {
      const targetDomRect = scrollviewRef.current.getBoundingClientRect();

      const shouldShowRightScrollHint =
        scrollviewRef.current.scrollWidth > targetDomRect.width &&
        scrollviewRef.current.scrollLeft + targetDomRect.width !== scrollviewRef.current.scrollWidth;

      // We snap to position elements on the left side, so we only need to show
      // the left-side scroll hint when we've reached the full width of the
      // horizontal scroll view.
      const shouldShowLeftScrollHint = !shouldShowRightScrollHint && scrollviewRef.current.scrollLeft > 0;

      if (shouldShowRightScrollHint) {
        setScrollHint('right');
      } else if (shouldShowLeftScrollHint) {
        setScrollHint('left');
      } else {
        setScrollHint('');
      }
    }
  }, [scrollviewRef]);

  useIsomorphicLayoutEffect(() => {
    updateScrollHintState();
  }, []);

  const onWindowEvent = useDomEvent(IS_CLIENT ? window : null);
  onWindowEvent('resize', updateScrollHintState, [updateScrollHintState]);

  const fade = transitions.useFade();

  // Verify that all children given to <Carousel> are of type <Carousel.Item>
  React.Children.map(children, child => {
    if (!React.isValidElement(child) || child.type === CarouselItem) {
      return child;
    }

    throw new Error('Only elements of type <Carousel.Item> may be rendered as direct children of a <Carousel>');
  });

  return (
    <div className={styles.Carousel}>
      <div
        {...mergeProps(
          {
            className: styles.itemsWrapper,
            onScroll: updateScrollHintState,
          },
          otherProps,
        )}
        ref={scrollviewRef}
      >
        {children}
      </div>
      {!noHint && (
        <AnimatePresence initial={false}>
          {scrollHint.includes('right') && (
            <motion.div
              key="right"
              className={clsx(styles.scrollHint, styles.right, styles[theme])}
              aria-hidden="true"
              {...fade()}
            />
          )}

          {scrollHint.includes('left') && (
            <motion.div
              key="left"
              className={clsx(styles.scrollHint, styles.left, styles[theme])}
              aria-hidden="true"
              {...fade()}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

function CarouselItem({ children, ...otherProps }) {
  return <div {...mergeProps({ className: styles.CarouselItem }, otherProps)}>{children}</div>;
}

export const Carousel = Object.assign(CarouselImpl, { Item: CarouselItem });
