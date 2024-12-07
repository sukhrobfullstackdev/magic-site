import React from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import { Accordion } from 'components/widgets/accordion/accordion';
import Image from 'next/image';
import imgHappyHiro from 'public/images/pricing/happy-hiro-min.png';

import styles from './faq.module.less';

const accordionItems = [
  {
    headline: 'What plan is right for me?',
    content: (
      <div>
        <p>
          Our pricing plans cater to a wide range of users, from individual developers to large enterprises, offering
          scalability and tailored solutions. The ideal plan depends on your specific needs, such as the number of
          monthly active wallets and the premium add-ons required for your business. We recommend assessing your user
          base, desired features, and premium add-on necessities to select the most suitable plan for your unique
          requirements.
        </p>
      </div>
    ),
    itemKey: 1,
  },
  {
    headline: 'What is a monthly active wallet (MAW)?',
    content: (
      <div>
        <p>A wallet that is accessed by a user through the Magic SDK during a given calendar month.</p>
      </div>
    ),
    itemKey: 2,
  },
  {
    headline: 'What if I exceed my 1,000 free monthly active wallets?',
    content: (
      <div>
        <p>
          If you exceed 1,000 MAWs with no credit card on file, any subsequent logins during that month will be blocked.
        </p>
        <p>
          Once a credit card has been added, you will continue to receive 1,000 free MAWs each month. Additional MAWs
          will be automatically billed at a rate of 5¢ per MAW up to 5,000 MAWs. MAWs over 5,000 will be billed at an
          overage rate of 10¢ per MAW. If you have a larger user base, contact us for volume-based discounts.
        </p>
      </div>
    ),
    itemKey: 3,
  },
  {
    headline: 'Can I change my plan later on?',
    content: (
      <div>
        <p>
          Yes. To change your plan, <a href="/contact">contact our sales team.</a>
        </p>
      </div>
    ),
    itemKey: 4,
  },
  {
    headline: 'Is there a free trial available?',
    content: (
      <div>
        <p>
          The first 1,000 MAW are free so you can explore the solution. There is also a free trial for the Pro Add-On
          package.
        </p>
      </div>
    ),
    itemKey: 5,
  },
  {
    headline: 'Do I need the Enterprise plan to access Premium Features?',
    content: (
      <div>
        <p>
          We have two types of Premium Features: 1) Premium Features that you can access via paid Add-On subscriptions
          and 2) Enterprise-only Premium Features that are not available to those on the Developer plan.
        </p>
      </div>
    ),
    itemKey: 6,
  },
  {
    headline: 'How are SMS surcharges calculated?',
    content: (
      <div>
        <p>
          Your first 100 SMS logins are free every month. After your first 100 SMS logins, a market rate surcharge will
          be applied to each SMS sent.
        </p>
        <p>
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
    itemKey: 6,
  },
  {
    headline: 'Can other team members access payment info?',
    content: (
      <div>
        <p>No. Only team owners are able to view or edit billing information.</p>
      </div>
    ),
    itemKey: 6,
  },
];

export const FaqSection: React.FC = () => {
  return (
    <SectionWrapper id="faq" className={clsx(styles.HeroSection)}>
      <div className={clsx(styles.pricingRow, 'd-flex')}>
        <div className={clsx('flex-fill pe-5')}>
          <h3 className={clsx(styles.headline, 'mb-3')}>FAQs</h3>
          <p className={clsx(styles.subheadline)}>
            Can’t find the answer you need?&nbsp;
            <a
              href="https://help.magic.link/knowledge"
              target="_blank"
              className={clsx(styles.faqLink)}
              rel="noreferrer"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
      <div className={clsx(styles.accordionContainer, 'accordionContainer mt-5 textLeft')}>
        <Accordion key="faq" items={accordionItems} />
      </div>
    </SectionWrapper>
  );
};
