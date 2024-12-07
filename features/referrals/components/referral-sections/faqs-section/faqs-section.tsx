import React from 'react';
import { Spacer, Flex, Media, Linkable } from '@magiclabs/ui';
import { ResponsiveSpacer } from 'components/widgets/responsive-spacer';

import Image from 'next/image';
import imgJuggle from 'public/images/referral/juggle.svg';
import styles from './faqs-section.module.less';

export const FAQsSection: React.FC = () => {
  return (
    <div className={styles.faqsSection}>
      <ResponsiveSpacer mdSize={30} lgSize={70} xlSize={120} />
      <Flex.Row wrap="reverse">
        <Flex.Item className={styles.illustrationWrapper}>
          <Image
            src={imgJuggle}
            alt="Juggle"
            width={584}
            height={512}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </Flex.Item>

        <Media greaterThan="sm">
          <Spacer size={32} orientation="horizontal" />
        </Media>
        <div className={styles.panel}>
          <h1>FAQs</h1>

          <div>Do my free logins expire?</div>
          <div>
            Your bonus logins will never expire and are always valid as part of your Magic account. Plain and simple.
          </div>

          <div>How do I check the status of my referral credits?</div>
          <div>
            You can head to your
            <Linkable>
              <a href="https://dashboard.magic.link/account/referrals">Magic dashboard</a>
            </Linkable>
            to track how many bonus logins you’ve earned so far.
          </div>

          <div>What if I’m a member of the Startup Perks program?</div>
          <div>
            If you’re using Magic as member of our Startup Perks program, you’re not eligible for referral bonuses. Even
            so, we hope you’ll still share Magic far and wide!
          </div>
        </div>
      </Flex.Row>
      <ResponsiveSpacer mdSize={30} lgSize={70} xlSize={120} />
    </div>
  );
};
