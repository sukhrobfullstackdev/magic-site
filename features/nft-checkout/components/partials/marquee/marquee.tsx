import React, { useEffect, useState } from 'react';

import Marquee from 'react-fast-marquee';

import clsx from 'clsx';

import nft01 from 'public/images/nft-checkout/marquee/nft-carousel_1.jpg';
import nft02 from 'public/images/nft-checkout/marquee/nft-carousel_2.jpg';
import nft03 from 'public/images/nft-checkout/marquee/nft-carousel_3.jpg';
import nft04 from 'public/images/nft-checkout/marquee/nft-carousel_4.jpg';
import nft06 from 'public/images/nft-checkout/marquee/nft-carousel_6.jpg';
import nft07 from 'public/images/nft-checkout/marquee/nft-carousel_7.jpg';
import nft05 from 'public/images/nft-checkout/marquee/nft-carousel_5.jpg';
import nft08 from 'public/images/nft-checkout/marquee/nft-carousel_8.jpg';
import Image from 'next/image';

import styles from './marquee.module.less';

export const HeroMarquee = ({ className }: { className?: string }) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, [className]);

  return isRendered ? (
    <Marquee className={clsx(styles.Marquee, className)} gradient={false} speed={40}>
      {Array.from({ length: 6 }).map(_ =>
        slides?.map(({ title, img }) => (
          <Image
            quality={90}
            loading="eager"
            key={title}
            src={img}
            width={176}
            height={273}
            alt="value"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        )),
      )}
    </Marquee>
  ) : null;
};

const slides = [
  {
    title: 'NFT01',
    img: nft01,
  },
  {
    title: 'NFT02',
    img: nft02,
  },
  {
    title: 'NFT03',
    img: nft03,
  },
  {
    title: 'NFT04',
    img: nft04,
  },
  {
    title: 'NFT05',
    img: nft05,
  },
  {
    title: 'NFT06',
    img: nft06,
  },
  {
    title: 'NFT07',
    img: nft07,
  },
  {
    title: 'NFT08',
    img: nft08,
  },
];
