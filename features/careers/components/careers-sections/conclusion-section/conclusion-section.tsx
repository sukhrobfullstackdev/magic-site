import React from 'react';
import { CallToAction, Spacer, clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import imgHiroEmail from 'public/images/careers/conclusion-section/hiro-email.png';

import styles from './conclusion-section.module.less';

export const ConclusionSection: React.FC = () => {
  return (
    <SectionWrapper>
      <div className={styles.ConclusionSection}>
        <div className={styles.content}>
          <h3>Create your own role</h3>
          <p className="textLG">
            Excited about Magic but don’t see an open role that fits? We’d love to hear from you. Send a short intro and
            general application to <b>careers@magic.link</b>.
          </p>

          <Spacer size={32} orientation="vertical" />

          <CallToAction.a href="mailto:careers@magic.link" outline>
            Get in touch
          </CallToAction.a>
        </div>

        <Image
          src={imgHiroEmail}
          alt="Email"
          width={363}
          height={185}
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center center',
          }}
        />
      </div>
    </SectionWrapper>
  );
};
