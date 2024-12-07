import React, { useEffect, useCallback, useRef } from 'react';
import { Flex, clsx } from '@magiclabs/ui';
import { useIsMounted } from 'usable-react';
import { debounce } from 'lodash';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import { angelInvestors, ventureCapitals } from './investors-data';

import styles from './investors.module.less';

export const Investors: React.FC = () => {
  const half_length = Math.floor(angelInvestors?.length / 2);

  const angelsFirstHalf = angelInvestors?.slice(0, half_length);
  const angelsSecondHalf = angelInvestors?.slice(half_length, angelInvestors.length);
  const carouselRef = useRef<HTMLDivElement[]>([]);
  const isMounted = useIsMounted();

  const handleScroll = useCallback(
    debounce(e => {
      const carousel = e.target;
      if (carousel.scrollLeft === carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }
    }, 1000),
    [],
  );

  const addToRefs = el => {
    if (el && !carouselRef.current.includes(el)) {
      carouselRef.current.push(el);
    }
  };

  useEffect(() => {
    carouselRef.current.forEach(el => {
      if (isMounted()) {
        el.addEventListener('scroll', handleScroll);
      }
    });
    return () => {
      carouselRef.current.forEach(el => {
        if (isMounted()) {
          el.removeEventListener('click', handleScroll);
        }
      });
    };
  }, []);

  return (
    <>
      <SectionWrapper className={styles.sectionWrapper}>
        <h4 className={styles.sectionTitle}>Magic is proudly backed by the best</h4>
        <Flex.Row wrap justifyContent="center" alignItems="center">
          {ventureCapitals.map(logo => (
            <div className={clsx(styles.ventureIcons)}>
              <Image
                key={logo.alt}
                src={logo.icon}
                alt={logo.alt}
                width={100}
                height={56}
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
      <div className={styles.AngelInvestorsSection}>
        <div className={styles.AngelInvestorsBleed} ref={addToRefs}>
          <div className={styles.carousel}>
            {angelsFirstHalf.map(angel => (
              <StakeHolderPills data={angel} key={angel.name} />
            ))}
          </div>
        </div>

        <div className={styles.AngelInvestorsBleed} ref={addToRefs}>
          <div className={styles.carousel}>
            {angelsSecondHalf.map(angel => (
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
    <a href={data.handle} rel="noopener noreferrer" target="_blank" className={styles.stakeholderPillWrapper}>
      <div className={styles.stakeholderPill}>
        <div className={styles.stakeholderPillImage}>
          <Image
            src={data.avatar}
            alt={data.name}
            width={48}
            height={48}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </div>
        <div className={styles.stakeholderInfo}>
          <h4>{data.name}</h4>
          <p>{data.role}</p>
        </div>
        {data.handle.includes('linkedin') ? (
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.7031 0.360352C2.11677 0.360352 0 2.47707 0 5.06345V19.658C0 22.2444 2.11672 24.3604 4.7031 24.3604H19.2977C21.884 24.3604 24 22.2444 24 19.658V5.06345C24 2.47712 21.884 0.360352 19.2977 0.360352H4.7031ZM5.886 4.32083C7.1261 4.32083 7.88994 5.13493 7.91352 6.20506C7.91352 7.25155 7.12605 8.08854 5.86202 8.08854H5.83875C4.62226 8.08854 3.83599 7.2516 3.83599 6.20506C3.83599 5.13496 4.64605 4.32083 5.88598 4.32083H5.886ZM16.5726 9.32246C18.9575 9.32246 20.7454 10.8813 20.7454 14.2311V20.4846H17.1209V14.6503C17.1209 13.1843 16.5964 12.184 15.2847 12.184C14.2834 12.184 13.6865 12.8582 13.4245 13.5095C13.3287 13.7425 13.3052 14.0679 13.3052 14.3938V20.4846H9.68074C9.68074 20.4846 9.72831 10.6015 9.68074 9.57822H13.3059V11.1227C13.7876 10.3795 14.6491 9.32244 16.5726 9.32244V9.32246ZM4.04978 9.57901H7.67423V20.4846H4.04978V9.57901Z"
              fill="#E2E0E6"
            />
          </svg>
        ) : (
          <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M23.643 2.29743C22.808 2.66743 21.911 2.91743 20.968 3.03043C21.941 2.44822 22.669 1.53189 23.016 0.452429C22.1019 0.995418 21.1014 1.37762 20.058 1.58243C19.3564 0.833294 18.4271 0.336755 17.4143 0.169903C16.4016 0.00305039 15.3621 0.17522 14.4572 0.659681C13.5524 1.14414 12.8328 1.91379 12.4102 2.84913C11.9875 3.78447 11.8855 4.83318 12.12 5.83243C10.2677 5.73942 8.45564 5.25798 6.80144 4.41933C5.14723 3.58069 3.68785 2.40359 2.51801 0.964429C2.11801 1.65443 1.88801 2.45443 1.88801 3.30643C1.88757 4.07342 2.07644 4.82867 2.43789 5.50516C2.79934 6.18165 3.32217 6.75847 3.96001 7.18443C3.22029 7.16089 2.49688 6.96101 1.85001 6.60143V6.66143C1.84994 7.73717 2.22204 8.77981 2.90319 9.61242C3.58434 10.445 4.53258 11.0164 5.58701 11.2294C4.9008 11.4151 4.18135 11.4425 3.48301 11.3094C3.78051 12.235 4.36001 13.0445 5.14038 13.6244C5.92075 14.2043 6.86293 14.5256 7.83501 14.5434C6.18484 15.8388 4.1469 16.5415 2.04901 16.5384C1.67739 16.5385 1.30609 16.5168 0.937012 16.4734C3.06649 17.8426 5.54535 18.5693 8.07701 18.5664C16.647 18.5664 21.332 11.4684 21.332 5.31243C21.332 5.11243 21.327 4.91043 21.318 4.71043C22.2293 4.0514 23.0159 3.23532 23.641 2.30043L23.643 2.29743Z"
              fill="#E2E0E6"
            />
          </svg>
        )}
      </div>
    </a>
  );
};
