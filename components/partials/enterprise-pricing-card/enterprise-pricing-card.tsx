import React from 'react';
import { CallToAction, clsx, Flex } from '@magiclabs/ui';
import Link from 'next/link';
import { Card } from 'components/partials/cards/card';

import HiroAstronautMobile from './hiro-astronaut-mobile.png';
import HiroAstronaut from './hiro-astronaut.png';

import styles from './enterprise-pricing-card.module.less';

const ENTERPRISE_TYPEFORM_URL =
  'https://magic-fortmatic.typeform.com/talktoanexpert?utm_source=xxxxx#first_name=xxxxx&email=xxxxx';

export const EnterprisePricingCard: React.FC = () => {
  return (
    <div className={styles.EnterprisePricingCard}>
      <Flex.Column className={styles.cardColumn}>
        <Card className={clsx(styles.card, styles.docs)}>
          <div className={styles.imageWrapper}>
            <img src={HiroAstronautMobile} alt="" />
          </div>

          <div className={styles.content}>
            <div className={styles.cardPills}>
              <span>tailored plans</span>
            </div>
            <h3>Enterprise Pricing</h3>

            <p className="textLG">
              Customized plans for more price predictability, volume/tiered pricing, or user-based pricing.
            </p>

            <div className={styles.actionsWrapper}>
              <Link passHref href={ENTERPRISE_TYPEFORM_URL} legacyBehavior>
                <CallToAction.a target="_blank" rel="noopener noreferrer" outline color="secondary">
                  Contact Sales
                </CallToAction.a>
              </Link>
            </div>

            <img className={styles.image} src={HiroAstronaut} alt="" />
          </div>
        </Card>
      </Flex.Column>
    </div>
  );
};
