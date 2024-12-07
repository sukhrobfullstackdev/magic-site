import React, { PropsWithChildren } from 'react';
import { Accordion } from 'components/widgets/accordion/accordion';
import Link from 'next/link';
import clsx from 'clsx';

import { AnalyticsService } from 'lib/analytics-service';
import styles from './faqs.module.less';

const Dot = () => <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'black' }} />;

const ListItem = ({ children }: PropsWithChildren<{}>) => (
  <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
    <Dot /> {children}
  </li>
);

const accordionItems = [
  {
    headline: 'What plan is right for me?',
    content: (
      <div className={clsx('px-3')}>
        <p className={clsx('typography-m')}>
          To help you decide on a plan, see a summary below:
          <br />
          <ul style={{ padding: '0 8px' }}>
            <ListItem>Developer: All the essential features to onboard your users</ListItem>
            <ListItem>Startup: Advanced auth and security features for small teams</ListItem>
            <ListItem>Growth: More customization options and premium support for businesses</ListItem>
            <ListItem>Enterprise: Adddress specific needs to scale your operations</ListItem>
          </ul>
          {`If you have more questions, please `}
          <a href="https://magic.link/contact" target="_blank" className={clsx('typography-m')} rel="noreferrer">
            contact our sales team.
          </a>
        </p>
      </div>
    ),
    itemKey: 1,
  },
  {
    headline: 'What is a monthly active wallet (MAW)?',
    content: (
      <div className={clsx('px-3')}>
        <p className={clsx('typography-m')}>
          A wallet that is accessed by a user through the Magic SDK during a given calendar month.
        </p>
      </div>
    ),
    itemKey: 2,
  },
  {
    headline: 'What if I exceed my 1,000 free monthly active wallets?',
    content: (
      <div className={clsx('px-3')}>
        <p className={clsx('typography-m')}>
          If you exceed 1,000 MAWs with no credit card on file, any subsequent logins during that month will be blocked.
        </p>
        <p className={clsx('typography-m')}>
          Once a credit card has been added, you will continue to receive 1,000 free MAWs each month. Additional MAWs
          will be automatically billed at a rate of 5¢ per MAW. If you have a larger user base, contact us for
          volume-based discounts.
        </p>
      </div>
    ),
    itemKey: 3,
  },
  {
    headline: 'Can I change my plan later on?',
    content: (
      <div className={clsx('px-3')}>
        <p className={clsx('typography-m')}>
          {`Yes. Team owners can change your plan through our developer dashboard. If you need assistance or would like to
          switch to an Enterprise plan, you can `}
          <a href="http://magic.link/contact" target="_blank" className={clsx('typography-m')} rel="noreferrer">
            contact our sales team.
          </a>
        </p>
      </div>
    ),
    itemKey: 4,
  },
  {
    headline: 'Is there a free trial available?',
    content: (
      <div className={clsx('px-3')}>
        <p className={clsx('typography-m')}>
          Yes. Our Developer plan is free up to 1,000 MAWs. We also offer 30 day free trials of our Startup and Growth
          plans so you can try out the features included in the plan.
        </p>
      </div>
    ),
    itemKey: 5,
  },
  {
    headline: 'How are SMS surcharges calculated?',
    content: (
      <div className={clsx('px-3')}>
        <p className={clsx('typography-m')}>
          Your first 100 SMS logins are free every month. After your first 100 SMS logins, a market rate surcharge will
          be applied to each SMS sent.
        </p>
        <p className={clsx('typography-m')}>
          Surcharges vary based on end-users’ country and cell carrier. You will be billed at the end of each month. If
          you are on the Developer Free plan, users will be blocked from SMS login as soon as your limit of 100 free
          monthly text messages is reached. Please view our SMS pricing chart below.
        </p>
        <iframe
          id="smsPricingTable"
          title="SMS Pricing Table"
          width="100%"
          height="500"
          style={{ border: 'solid #6851FF 2px', borderRadius: '15px' }}
          src="https://app.sigmacomputing.com/embed/1-jU3LOMjUMIPK9chmRkBX4"
        />
      </div>
    ),
    itemKey: 7,
  },
  {
    headline: 'Can other team members access payment info?',
    content: (
      <div className={clsx('px-3')}>
        <p className={clsx('typography-m')}>No. Only team owners are able to view or edit billing information.</p>
      </div>
    ),
    itemKey: 8,
  },
];

export const FAQs = () => {
  return (
    <div className={styles.containerFAQs}>
      <div className={styles.copyFAQs}>FAQs</div>
      <div className={styles.contentWrapper}>
        <div className={styles.contentLeft}>
          <Accordion key="faqs" items={accordionItems} />
        </div>
        <div className={styles.contentRight}>
          <Link href="/docs">
            <div
              aria-hidden
              role="button"
              className={styles.contentBox}
              onClick={() => AnalyticsService.TrackAction('Visit docs clicked')}
            >
              <div className={styles.contentBoxInfo}>
                <div className={styles.copyBoxTitle}>Have other questions?</div>
                <div className={styles.copyBoxDescription}>
                  Visit our Docs to learn how to integrate the Magic SDK with just a few lines of code.
                </div>
              </div>

              <img className={styles.imageBundle} src="/images/pricing/tool-box.png" alt="bundle" />
              <img className={styles.imageSwoosh} src="/images/pricing/feature-swoosh.png" alt="swoosh" />
            </div>
          </Link>
          <Link href="/contact">
            <div
              aria-hidden
              role="button"
              className={styles.contentBox}
              onClick={() => AnalyticsService.TrackAction('Contact us clicked')}
            >
              <div className={styles.contentBoxInfo}>
                <div className={styles.copyBoxTitle}>We’re here to help</div>
                <div className={styles.copyBoxDescription}>
                  Need resources or help finding the right solution for you? Contact us for technical support.
                </div>
              </div>

              <img className={styles.itemShield} src="/images/pricing/shield-with-wings.png" alt="shield" />
              <img className={styles.imageSwoosh} src="/images/pricing/feature-swoosh.png" alt="swoosh" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
