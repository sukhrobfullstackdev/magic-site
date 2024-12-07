import React, { useState, useEffect, useCallback } from 'react';
import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { motion } from 'framer-motion';
import { SectionWrapper } from 'components/layout/section-wrapper';
import { AnalyticsService } from 'lib/analytics-service';
// import { careersPageLayout } from 'features/careers/careers-page-layout';

import styles from './hero-section.module.less';

const birdEnterHook = createFramerTransition<number>().withVariants({
  initial: x => ({ x, opacity: 0 }),
  animate: { x: 0, opacity: 1, transition: { ease: 'anticipate', duration: 1.2 } },
  exit: x => ({ x: -x, opacity: 0 }),
});

export const HeroSection: React.FC = () => {
  const fade = transitions.useFade();
  const birdEnter = birdEnterHook.use({ initial: 'initial', animate: 'animate', exit: 'exit' });

  const [openRoles, setOpenRoles] = useState(0);

  const getWorkableRoles = async () => {
    const rolesResponse = await fetch('https://boards-api.greenhouse.io/v1/boards/magic/jobs')
      .then(res => res.json())
      .then(data => {
        setOpenRoles(data.jobs.length);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getWorkableRoles();
  }, []);

  return (
    <SectionWrapper className={styles.HeroSection}>
      <div className={styles.bg} aria-hidden="true">
        <motion.img
          className={styles.moonandsun}
          src="/images/careers/hero-section/moon-n-sun.svg"
          {...fade()}
          alt="Moon"
        />

        <motion.img
          className={styles.leftbird}
          src="/images/careers/hero-section/left-bird.svg"
          {...birdEnter(-100)}
          alt="Bird"
        />

        <motion.img
          className={styles.rightbird}
          src="/images/careers/hero-section/right-bird.svg"
          {...birdEnter(100)}
          alt="Bird"
        />
      </div>

      <Flex.Column horizontal="center" className={styles.fg}>
        <Flex.Column horizontal="center">
          {openRoles > 0 && <h5 className={styles.openRoles}>{openRoles} Open Roles</h5>}
          <h1 className={styles.headline}>
            Let’s make some <br /> Magic together
          </h1>
          <p className={clsx(styles.subheadline, 'textXL')}>
            We’re a globally distributed team passionate about building a more authentic internet for all.
          </p>
        </Flex.Column>

        <Flex.Row horizontal="center" vertical="stretch">
          <CallToAction.a
            onPress={useCallback(() => AnalyticsService.TrackAction('Careers: Explore roles Button Clicked'), [])}
            href="#roles"
          >
            Explore Roles
          </CallToAction.a>
          <Spacer size={16} />
        </Flex.Row>
        <div className={styles.hiroTeamWrapper}>
          <motion.img src="/images/careers/hero-section/hiro-team.svg" {...fade()} alt="Magic" />
        </div>
      </Flex.Column>
    </SectionWrapper>
  );
};
