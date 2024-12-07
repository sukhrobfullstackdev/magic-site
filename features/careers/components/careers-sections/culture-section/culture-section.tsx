import React from 'react';
import { Flex } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import imgHiroCameraman from 'public/images/careers/culture-section/hiro-camera-man.svg';
import imgPolaroids from 'public/images/careers/culture-section/polaroid-pics.png';
import imgTeam1 from 'public/images/careers/culture-section/team-image_1.png';
import imgTeam2 from 'public/images/careers/culture-section/team-image_2.png';
import imgTeam3 from 'public/images/careers/culture-section/team-image_3.png';

import styles from './culture-section.module.less';

export const CultureSection: React.FC = () => {
  return (
    <SectionWrapper>
      <Flex.Row className={styles.CultureSection} horizontal="space-between" vertical="center">
        <div className={styles.CultureSectionIntroductory}>
          <h3>Culture</h3>
          <p className="textLG">Online or in person, we’re invested in making Magic a fun place to work.</p>
          <Image
            src={imgHiroCameraman}
            alt="Culture"
            width={327}
            height={180}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </div>

        <div className={styles.CultureSectionImage}>
          <Image
            src={imgPolaroids}
            alt="Magic Polaroid Pictures"
            width={670}
            height={554}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </div>
      </Flex.Row>
      <figure className={styles.CultureSectionTeamImage}>
        <Flex.Row vertical="center" wrap>
          <Image
            src={imgTeam1}
            alt="Magic Teams"
            width={376}
            height={376}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
          <Image
            src={imgTeam2}
            alt="Magic Teams"
            width={376}
            height={376}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
          <Image
            src={imgTeam3}
            alt="Magic Teams"
            width={376}
            height={376}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </Flex.Row>
        <figcaption>Snapshots from online events and in-person meetups</figcaption>
      </figure>
    </SectionWrapper>
  );
};
