import React from 'react';
import { CallToAction, clsx, Flex, Spacer } from '@magiclabs/ui';
import { Carousel } from 'components/partials/carousel';
import { Card } from 'components/partials/cards/card';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';

import styles from './testimonials.module.less';

const featuredCustomerStories = [
  {
    label: 'Unlock Growth',
    quote: (
      <>
        With Magic onboarding, we reached <b>record new user growth</b> and expect hundreds and thousands more users to
        engage.
      </>
    ),
    href: 'https://medium.com/magiclabs/decrypt-trusts-magic-to-onboard-record-new-user-growth-with-the-launch-of-reader-tokens-and-rewards-14d791e582d5',
    author: {
      name: 'Luke Hamilton',
      title: 'Sr. Software Engineer, Decrypt',
      imgSrc: '/images/landing-page-march-2022/testimonials-section/headshots/luke-hamilton.png',
    },
  },

  {
    label: 'Streamline Signups',
    quote: (
      <>
        Using Magic <b>eliminates 4 or 5 steps</b> from our onboarding funnel. It makes life easier for both NFT
        creators and collectors.
      </>
    ),
    href: 'https://medium.com/magiclabs/async-art-is-bringing-nfts-to-life-with-a-little-help-from-magic-ef558e7c1184',
    author: {
      name: 'Lisa Liang',
      title: 'Co-founder & CMO, Async Art',
      imgSrc: '/images/landing-page-march-2022/testimonials-section/headshots/lisa-liang.png',
    },
  },

  {
    label: 'Approachable UX',
    quote: (
      <>
        Magic is the <b>simplest way to onboard</b> people who are new to crypto.
      </>
    ),
    href: 'https://medium.com/magiclabs/how-magic-helps-showtime-build-community-around-crypto-art-dccd01a38927',
    author: {
      name: 'Alex Masmej',
      title: 'Co-founder & CEO, Showtime',
      imgSrc: '/images/landing-page-march-2022/testimonials-section/headshots/alex-masmej.png',
    },
  },
  /* eslint-enable prettier/prettier */
];

export const Testimonials: React.FC = () => {
  return (
    <SectionWrapper fullBleedOnMobile fullBleedOnDesktop className={styles.sectionWrapper}>
      <h3 className={clsx(styles.headline, 'textCentered')}>Onboarded 20M+ users with our customers</h3>
      <Carousel className={styles.titleColumndCustomerStories}>
        {featuredCustomerStories.map(story => {
          return (
            <Carousel.Item className={styles.titleColumndCustomerStory} key={story.href}>
              <a
                href={story.href}
                target="_blank"
                rel="noreferrer"
                className={styles.titleColumndCustomerStoryCardWrapper}
              >
                <Card className={styles.titleColumndCustomerStoryCard}>
                  <div>
                    <h6>{story.label}</h6>
                    <Spacer size={16} orientation="vertical" />
                    <p className="textLG">"{story.quote}"</p>
                  </div>
                  <div className={styles.author}>
                    <Image
                      className={clsx(styles.headshot, 'pe-3')}
                      src={story.author.imgSrc}
                      alt={`${story.author.name}'s Head shot`}
                      width={64}
                      height={64}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        objectPosition: 'center center',
                      }}
                    />
                    <div>
                      <p className="textLG">
                        <b>{story.author.name}</b>
                      </p>
                      <p className={styles.jobTitle}>{story.author.title}</p>
                    </div>
                  </div>
                </Card>
              </a>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </SectionWrapper>
  );
};
