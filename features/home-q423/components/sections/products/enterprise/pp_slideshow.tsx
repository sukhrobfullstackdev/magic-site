import React, { useState, useEffect } from 'react';
import { clsx } from '@magiclabs/ui';
import Image from 'next/image';
import styles from './pp_slideshow.module.less';

const slideShowItems = [
  {
    image: '/images/landingpage/pp_slideshow/pp_slideshow_00.png',
    caption: 'Slide 0',
    href: 'https://magic.link',
  },
  {
    image: '/images/landingpage/pp_slideshow/pp_slideshow_01.png',
    caption: 'Slide 1',
    href: 'https://magic.link',
  },
  {
    image: '/images/landingpage/pp_slideshow/pp_slideshow_02.png',
    caption: 'Slide 2',
    href: 'https://magic.link',
  },
  {
    image: '/images/landingpage/pp_slideshow/pp_slideshow_03.png',
    caption: 'Slide 3',
    href: 'https://magic.link',
  },
  {
    image: '/images/landingpage/pp_slideshow/pp_slideshow_04.png',
    caption: 'Slide 4',
    href: 'https://magic.link',
  },
];

export const PPSlideshow = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [clickedSlide, setClickedSlide] = useState(false);

  const autoPlayTrigger = () => {
    setActiveSlide(activeSlide === slideShowItems.length - 1 ? 0 : activeSlide + 1);
  };

  useEffect(() => {
    if (clickedSlide) return;
    const autoPlayInterval = setInterval(autoPlayTrigger, 2000);
    return () => clearInterval(autoPlayInterval);
  }, [clickedSlide, activeSlide]);

  return (
    <div className={clsx(styles.slideshowContainer)}>
      {slideShowItems.map((o, i) => {
        return (
          <button
            key={o.caption}
            aria-label="Slideshow"
            className={clsx(styles.slideshowImageContainer)}
            onClick={() => {
              setActiveSlide(i === slideShowItems.length - 1 ? 0 : i + 1);
              setClickedSlide(true);
            }}
          >
            <div className={clsx(styles.slideshowImage, i === activeSlide ? styles.active : '')}>
              <Image
                src={o.image}
                alt={o.caption}
                width={371}
                height={513}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
            </div>
          </button>
        );
      })}
      <img
        src="/images/landingpage/pp_slideshow/pp_slideshow_placeholder.png"
        alt="Slideshow"
        className={clsx(styles.slideshowImagePlaceholder)}
      />
      <div className={clsx(styles.dotsContainer)}>
        <div className={clsx(styles.dotsInner)}>
          {slideShowItems.map((o, i) => {
            return (
              <button
                key={o.caption}
                aria-label="Slideshow"
                onClick={() => {
                  setActiveSlide(i);
                  setClickedSlide(true);
                }}
                className={clsx(styles.dot, i === activeSlide ? styles.active : '')}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
