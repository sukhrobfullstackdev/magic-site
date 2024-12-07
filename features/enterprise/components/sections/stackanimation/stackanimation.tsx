import React from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Lottie from 'lottie-react';
import enterpriseAnimation from './json/Enterprise.json';

import styles from './stackanimation.module.less';

interface Interactivity {
  mode: 'scroll' | 'cursor';
  actions: { visibility: [number, number]; type: 'seek' | 'stop' | 'loop'; frames: [number, number] }[];
}

export const StackAnimationSection: React.FC = () => {
  const interactivity: Interactivity = {
    mode: 'scroll',
    actions: [
      {
        visibility: [0.35, 0.45],
        type: 'seek',
        frames: [1, 100],
      },
      {
        visibility: [0.5, 0.55],
        type: 'seek',
        frames: [100, 120],
      },
      {
        visibility: [0.6, 1],
        type: 'seek',
        frames: [200, 220],
      },
    ],
  };

  return (
    <SectionWrapper className={clsx(styles.HeroSection, 'my-5')}>
      <Lottie animationData={enterpriseAnimation} interactivity={interactivity} />
    </SectionWrapper>
  );
};
