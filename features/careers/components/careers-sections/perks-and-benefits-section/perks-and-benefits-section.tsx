import React, { useMemo } from 'react';
import { Flex, clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';
import { perksAndBenefits } from './perks-and-benefits-data';

import styles from './perks-and-benefits-section.module.less';

export const PerksAndBenefitsSection: React.FC = () => {
  return (
    <SectionWrapper>
      <div className={styles.PerksAndBenefitsSection}>
        <div className={styles.content}>
          <h3>Perks & Benefits</h3>
          <p className="textLG">
            We do everything we can to provide Magicians with the tools, coverage, and policies necessary for
            professional success and personal well-being.
          </p>
        </div>

        <div className={styles.cards}>
          {perksAndBenefits.map(props => {
            return <PerkCard {...props} key={props.key} />;
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

function PerkCard({ description, icon }) {
  const descriptionParts = useMemo(() => description.split('\n'), [description]);

  return (
    <Flex.Row className={styles.PerkCard}>
      <Image
        src={icon}
        alt="Perks"
        width={48}
        height={48}
        style={{
          objectFit: 'fill',
          objectPosition: 'center center',
        }}
      />
      <p className={clsx('ps-3')}>
        {/* Replace line breaks with <br /> */}
        {descriptionParts.map((part, i) => (
          <React.Fragment key={part}>
            {part}
            {i < descriptionParts.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </Flex.Row>
  );
}
