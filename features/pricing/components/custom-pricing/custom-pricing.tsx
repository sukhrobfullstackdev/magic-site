import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { AnalyticsService } from 'lib/analytics-service';
import styles from './custom-pricing.module.less';

export const CustomPricing = () => {
  return (
    <div className={styles.contentCustomPricing}>
      <div className={styles.contentLeft}>
        <div className={clsx('typography-h3 color-ink10')}>Enterprise</div>
        <div className={styles.copyCustomPricing}>Custom Pricing</div>
      </div>
      <div className={styles.contentRight}>
        <div className={clsx('typography-m color-white')}>
          For large organizations with specific needs. Define your Monthly Active Wallets and design a plan that meets
          your unique needs and can scale alongside your operations.
        </div>

        <Link href="/contact" legacyBehavior>
          <button
            className={clsx(styles.buttonTalkToSales, 'button w-full')}
            onClick={() => AnalyticsService.TrackAction('Talk to sales clicked')}
          >
            Talk to sales
          </button>
        </Link>
      </div>
    </div>
  );
};
