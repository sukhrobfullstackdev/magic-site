import clsx from 'clsx';
import React, { SVGProps } from 'react';
import { Spacer } from '@magiclabs/ui';
import { Accordion } from 'components/widgets/accordion/accordion';
import Lordicon from 'components/widgets/lordicon';
import iconAuth from 'public/lordicon/authentication.json';
import iconWallet from 'public/lordicon/wallet.json';
import iconSecurity from 'public/lordicon/security.json';
import iconPlatform from 'public/lordicon/account.json';
import iconWeb3 from 'public/lordicon/globe.json';
import iconSupport from 'public/lordicon/support.json';
import iconWidgets from 'public/lordicon/carousel.json';
import { useMediaQuery } from 'hooks/use-media-query';
import Link from 'next/link';

import { AnalyticsService } from 'lib/analytics-service';
import styles from './compare-all-features.module.less';
import {
  authenticationFeatureRows,
  platformFeatureRows,
  securityFeatureRows,
  supportFeatureRows,
  uiWidgetsFeatureRows,
  walletsFeatureRows,
  web3CompabilitiesFeatureRows,
} from './feature-rows';

const CheckIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Icon">
        <path
          id="Vector 30 (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.1792 6.32904C20.3607 6.51451 20.3701 6.80798 20.2009 7.00472L10.2648 18.5592C10.0653 18.7911 9.70606 18.7911 9.50656 18.5592L4.79909 13.085C4.6299 12.8882 4.63934 12.5948 4.82081 12.4093L5.74002 11.4698C5.945 11.2603 6.2854 11.2712 6.47651 11.4935L9.88567 15.4579L18.5235 5.41322C18.7146 5.19099 19.055 5.18005 19.26 5.38955L20.1792 6.32904Z"
          fill="#4E4D52"
        />
      </g>
    </svg>
  );
};

const IconChevronRight = ({ color = '#6851FF', ...rest }: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g id="Icon">
        <path
          id="angle-right"
          d="M10.5299 9.12577C10.7093 8.91785 10.7093 8.62675 10.5657 8.41882L6.33166 3.59491C6.15225 3.38698 5.8652 3.38698 5.72167 3.59491L5.47049 3.88601C5.29109 4.09394 5.29109 4.38503 5.47049 4.59296L9.13046 8.7515L5.47049 12.9516C5.29109 13.1596 5.29109 13.4507 5.47049 13.6586L5.72167 13.9497C5.8652 14.1576 6.15225 14.1576 6.33166 13.9497L10.5299 9.12577Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

const accordionItems = [
  {
    icon: iconAuth,
    name: 'Authentication',
    slug: 'check',
    features: authenticationFeatureRows,
  },
  {
    icon: iconWallet,
    name: 'Wallets',
    slug: 'wallet',
    features: walletsFeatureRows,
  },
  {
    icon: iconSecurity,
    name: 'Security',
    slug: 'shield',
    features: securityFeatureRows,
  },
  {
    icon: iconPlatform,
    name: 'Platform',
    slug: 'account',
    features: platformFeatureRows,
  },
  {
    icon: iconWeb3,
    name: 'Web3 Compabilities',
    slug: 'world',
    features: web3CompabilitiesFeatureRows,
  },
  {
    icon: iconSupport,
    name: 'Support',
    slug: 'support',
    features: supportFeatureRows,
  },
  {
    icon: iconWidgets,
    name: 'UI Widgets',
    slug: 'widget',
    features: uiWidgetsFeatureRows,
  },
];

export const CompareAllFeatures = () => {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 750px)');

  return (
    <div className={clsx(styles.contentCompareAllFeatures)}>
      {/* Compare all features */}
      <div className={clsx(styles.contentRow, styles.contentSticky)}>
        <div className={clsx(styles.contentGridLeft)}>
          <div className={clsx('d-flex align-items-center flex-column w-full')}>
            <div className={clsx(styles.copyCompareAllFeatures, 'typography-h2')}>Compare all features</div>
          </div>
        </div>
        {isTablet && <Spacer size={0} orientation="vertical" />}
        <div className={clsx(styles.contentGrid)}>
          <div className={clsx(styles.contentSummary)}>
            <div className={clsx(styles.copyPlanName)}>Developer</div>
            <div className={clsx(styles.copyPrice)}>$0</div>
            <a
              href="https://dashboard.magic.link/login?startWith=developer"
              rel="noreferrer"
              target="_blank"
              style={{ textDecoration: 'none', color: 'inherit' }}
              className={clsx(isMobile ? '68px' : 'w-full')}
            >
              <button
                className={clsx('button variant-outline size-sm w-full')}
                onClick={() => AnalyticsService.TrackAction('Developer plan selected in the middle of the page')}
              >
                {isMobile ? <IconChevronRight /> : 'Start now'}
              </button>
            </a>
          </div>
          <div className={clsx(styles.contentSummary)}>
            <div className={clsx(styles.copyPlanName)}>STARTUP</div>
            <div className={clsx(styles.copyPrice)}>$249</div>
            <a
              href="https://dashboard.magic.link/login?startWith=startup"
              rel="noreferrer"
              target="_blank"
              style={{ textDecoration: 'none', color: 'inherit' }}
              className={clsx(isMobile ? '68px' : 'w-full')}
            >
              <button
                className={clsx('button size-sm w-full')}
                onClick={() => AnalyticsService.TrackAction('Startup plan selected in the middle of the page')}
              >
                {isMobile ? <IconChevronRight color="white" /> : 'Start free trial'}
              </button>
            </a>
          </div>
          <div className={clsx(styles.contentSummary)}>
            <div className={clsx(styles.copyPlanName)}>GROWTH</div>
            <div className={clsx(styles.copyPrice)}>$499</div>
            <a
              href="https://dashboard.magic.link/login?startWith=growth"
              rel="noreferrer"
              target="_blank"
              style={{ textDecoration: 'none', color: 'inherit' }}
              className={clsx(isMobile ? '68px' : 'w-full')}
            >
              <button
                className={clsx('button size-sm w-full')}
                onClick={() => AnalyticsService.TrackAction('Growth plan selected in the middle of the page')}
              >
                {isMobile ? <IconChevronRight color="white" /> : 'Start free trial'}
              </button>
            </a>
          </div>
          <div className={clsx(styles.contentSummary)}>
            <div className={clsx(styles.copyPlanName)}>{isMobile ? 'ENTERPRISE' : 'ENT'}</div>
            <div className={clsx(styles.copyPrice)}>Custom</div>
            <Link href="/contact">
              <button
                className={clsx('button variant-dark size-sm')}
                style={{
                  width: isMobile ? '68px' : '100%',
                }}
                onClick={() => AnalyticsService.TrackAction('Enterprise plan selected in the middle of the page')}
              >
                {isMobile ? <IconChevronRight color="white" /> : 'Talk to sales'}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Spacer size={40} orientation="vertical" />
      {/* Monthly Active Wallets */}
      <div className={clsx(styles.contentRow)}>
        <div className={clsx(styles.contentGridLeft)}>
          <div
            className={clsx(
              'typography-m text-center',
              isMobile ? 'font-semibold color-ink80' : 'font medium color-ink100',
            )}
          >
            Monthly Active Wallets
          </div>
        </div>
        <div className={clsx(styles.contentGrid)}>
          <div>1,000</div>
          <div>5,000</div>
          <div>10,000</div>
          <div>Custom</div>
        </div>
      </div>
      <div
        className={clsx(styles.dividerInk20)}
        style={{
          margin: '12px 0',
        }}
      />
      {/* Fee per Additional MAW */}
      <div className={clsx(styles.contentRow)}>
        <div className={clsx(styles.contentGridLeft)}>
          <div
            className={clsx(
              'typography-m text-center',
              isMobile ? 'font-semibold color-ink80' : 'font medium color-ink100',
            )}
          >
            Fee per Additional MAW
          </div>
        </div>
        <div className={clsx(styles.contentGrid)}>
          <div>$0.05</div>
          <div>$0.05</div>
          <div>$0.05</div>
          <div>Custom</div>
        </div>
      </div>
      <Spacer size={20} orientation="vertical" />
      {/* feature check list */}
      <div className={clsx(styles.contentArccordion)}>
        <Accordion
          key="feature"
          alwaysOpen
          items={accordionItems.map((item, index) => ({
            headline: (
              <div className={clsx(styles.contentArcodianHeadline)}>
                <Lordicon size={40} icon={item.icon} name={item.slug} color="" once />
                <div className={clsx('typography-xl')}>{item.name}</div>
              </div>
            ),
            content: item.features.map(row => (
              <div key={row.name} className={clsx(styles.contentRow, styles.contentArccordianRow)}>
                <div className={clsx(styles.contentGridLeft)}>
                  <div className={clsx('typography-l color-ink80')}>{row.name}</div>
                  <div className={clsx('typography-m color-ink70')}>{row.description}</div>
                </div>
                <div className={clsx(styles.contentGrid)}>
                  {row.available.map((value, valueIndex) => (
                    <div key={`${valueIndex}-${value}`} className={clsx(styles.contentArccordianValue)}>
                      {typeof value === 'boolean' && (value ? <CheckIcon /> : '-')}
                      {typeof value === 'string' && <div className={clsx('typography-m')}>{value}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )),
            itemKey: `${index}`,
          }))}
          variant="feature"
        />
      </div>
    </div>
  );
};
