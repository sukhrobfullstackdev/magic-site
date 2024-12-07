import React from 'react';
import { Flex, clsx } from '@magiclabs/ui';
// import { useIsMounted } from 'usable-react';
// import { debounce } from 'lodash';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import { angelInvestors, ventureCapitals } from './investors-data';

import styles from './investors.module.less';

export const Investors: React.FC = () => {
  // const half_length = Math.floor(angelInvestors?.length / 2);
  //
  // const angelsFirstHalf = angelInvestors?.slice(0, half_length);
  // const angelsSecondHalf = angelInvestors?.slice(half_length, angelInvestors.length);
  // const carouselRef = useRef<HTMLDivElement[]>([]);
  // const isMounted = useIsMounted();

  // const handleScroll = useCallback(
  //   debounce(e => {
  //     const carousel = e.target;
  //     if (carousel.scrollLeft === carousel.scrollWidth - carousel.clientWidth) {
  //       carousel.scrollTo({
  //         left: 0,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }, 1000),
  //   [],
  // );

  // const addToRefs = el => {
  //   if (el && !carouselRef.current.includes(el)) {
  //     carouselRef.current.push(el);
  //   }
  // };

  // useEffect(() => {
  //   carouselRef.current.forEach(el => {
  //     if (isMounted()) {
  //       el.addEventListener('scroll', handleScroll);
  //     }
  //   });
  //   return () => {
  //     carouselRef.current.forEach(el => {
  //       if (isMounted()) {
  //         el.removeEventListener('click', handleScroll);
  //       }
  //     });
  //   };
  // }, []);

  return (
    <>
      <SectionWrapper className={styles.sectionWrapper}>
        <div className={clsx('mb-5 mx-auto')}>
          <div className={clsx(styles.lineHeader, 'flex justify-center items-center mt-3')}>
            <div className={clsx(styles.trustedLine, styles.trustedLineLeft)} />
            <div className={clsx('px-2')}>Backed by the best</div>
            <div className={clsx(styles.trustedLine, styles.trustedLineRight)} />
          </div>
        </div>
        <Flex.Row wrap justifyContent="center" alignItems="center">
          {ventureCapitals.map((logo, i) => (
            <div className={clsx(styles.ventureIcons)} key={i}>
              <Image
                src={logo.icon}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="w-100 h-auto"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
            </div>
          ))}
        </Flex.Row>
      </SectionWrapper>
      <div className={clsx(styles.AngelInvestorsSection, 'mt-4 mb-5')}>
        <div className={styles.AngelInvestorsBleed}>
          <div
            className={clsx(
              styles.carousel,
              'd-flex flex-column flex-md-row justify-content-center align-items-center',
            )}
          >
            {angelInvestors.map(angel => (
              <StakeHolderPills data={angel} key={angel.name} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface StakeHolderPillsProps {
  data: any;
}

const StakeHolderPills: React.FC<StakeHolderPillsProps> = ({ data }) => {
  return (
    <div className={clsx('px-0 px-md-4 mb-5 mb-md-0')}>
      <div className="">
        <div
          className=""
          style={{
            color: '#fff',
            opacity: 0.75,
          }}
        >
          <h4 className="font-bold mb-1">{data.name}</h4>
          {/* <p>{data.role}</p> */}
        </div>
      </div>
    </div>
  );
};
