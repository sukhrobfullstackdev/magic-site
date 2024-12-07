import React from 'react';
import { CallToAction, Flex, Linkable, Spacer } from '@magiclabs/ui';
import { ResponsiveSpacer } from 'components/widgets/responsive-spacer';

import Image from 'next/image';
import imgReferral from 'public/images/referral/hiro-referral.svg';
import styles from './intro-section.module.less';

export const IntroSection: React.FC = () => {
  return (
    <div className={styles.introSection}>
      <ResponsiveSpacer mdSize={30} lgSize={70} xlSize={110} />
      <Flex.Row wrap>
        <div className={styles.topLeftPanel}>
          <div className={styles.subtitle}>Magic Referrals</div>

          <Spacer size={16} orientation="vertical" />

          <h1 className={styles.headline}>Get up to 90,000 free logins</h1>

          <Spacer size={24} orientation="vertical" />

          <div className={styles.msg}>
            For every friend who joins Magic, we'll give you both <b>3,000 bonus free logins</b>.
          </div>

          <Spacer size={40} orientation="vertical" />

          <CallToAction.a href="https://dashboard.magic.link/account/referrals" target="_blank" rel="noreferrer">
            Share Magic with friends
          </CallToAction.a>

          <Spacer size={24} orientation="vertical" />

          <div>
            New to Magic?
            <Linkable>
              <a href="https://dashboard.magic.link/signup">Sign up for free</a>
            </Linkable>
          </div>
        </div>
        <Flex.Item className={styles.illustrationWrapper}>
          <Image
            src={imgReferral}
            alt="Referral"
            width={600}
            height={471}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </Flex.Item>
      </Flex.Row>
      <ResponsiveSpacer mdSize={30} lgSize={70} xlSize={120} />
    </div>
  );
};
