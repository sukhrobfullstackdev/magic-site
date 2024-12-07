import React from 'react';
import { clsx, HoverActivatedTooltip } from '@magiclabs/ui';
import { SwitchButton } from 'components/partials/switch-button';
import { create } from 'zustand';
import { AnalyticsService } from 'lib/analytics-service';
import styles from './plan-summary.module.less';
import { FeatureList } from './feature-list';
import { FeatureRow, IconTooltip } from './feature-row';

export const PLAN_PERIODS = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
} as const;

type PlanPeriod = typeof PLAN_PERIODS[keyof typeof PLAN_PERIODS];

type PlanPeriodToggleState = {
  planPeriod: PlanPeriod;
  setPlanPeriod: (period: 'monthly' | 'yearly') => void;
};

export const usePlanPeriodToggle = create<PlanPeriodToggleState>(
  (set): PlanPeriodToggleState => ({
    planPeriod: 'monthly',
    setPlanPeriod: planPeriod => set({ planPeriod }),
  }),
);

export const PlanSummary = () => {
  const { planPeriod, setPlanPeriod } = usePlanPeriodToggle();

  return (
    <div className={clsx('d-flex flex-column align-items-center')}>
      <SwitchButton
        className={styles.buttonPricngSwitch}
        options={[
          {
            value: 'monthly',
            label: 'Monthly',
          },
          {
            value: 'yearly',
            label: 'Annual (10% off)',
          },
        ]}
        value={planPeriod}
        onToggle={v => {
          setPlanPeriod(v as PlanPeriod);
        }}
      />

      <div className={styles.contentPlans}>
        {/* Free plan */}
        <div className={styles.contentPlanCard}>
          <div className={styles.contentPlanSummary}>
            <div className={clsx('typography-h3 color-black')}>Developer</div>

            <div className={clsx('typography-m')}>
              <span className={clsx('font-bold')}>For individual builders</span>
              <div className={styles.contentPlanActiveUsers}>
                <p>Up to 1,000 Monthly Active Wallets.</p>
                <HoverActivatedTooltip placement="top" portalize>
                  <HoverActivatedTooltip.Anchor className={styles.centerContent}>
                    <IconTooltip />
                  </HoverActivatedTooltip.Anchor>
                  <HoverActivatedTooltip.Content aria-hidden="true">
                    Wallets accessed by users during a given calendar month. Each additional MAW costs 5¢.
                  </HoverActivatedTooltip.Content>
                </HoverActivatedTooltip>
              </div>
              <p>$0.05 per additional MAW</p>
            </div>

            <div className={styles.contentPlanPrice}>
              <span className={styles.copyDollar}>$</span>
              <span className={styles.copyPrice}>0</span>
              <span className={styles.copyPerMonth}>/mo</span>
            </div>
          </div>

          <a
            href="https://dashboard.magic.link/login?startWith=developer"
            rel="noopener noreferrer"
            target="_blank"
            style={{ textDecoration: 'none', color: 'inherit' }}
            className={clsx('w-full')}
          >
            <button
              className={clsx('button w-full')}
              onClick={() => AnalyticsService.TrackAction('Developer plan selected')}
            >
              Start now
            </button>
          </a>

          <FeatureList
            features={[
              {
                description: 'Email, SMS, Social Logins',
              },
              {
                description: 'Wallet UI Widgets',
              },
              {
                description: 'Token Gating',
              },
              {
                description: 'Fiat On-Ramp',
              },
              {
                description: 'Email & Community Support',
              },
            ]}
          />
        </div>

        {/* Startup Plan */}
        <div className={clsx(styles.contentPlanCard, styles.contentStartCard)}>
          <div className={styles.contentPlanSummary}>
            <div className={clsx('d-flex flex-row align-items-center justify-content-between')}>
              <div className={clsx('typography-h3 color-black')}>Startup</div>
              <div className={styles.contentMostPopular}>
                <span className={styles.copyMostPopular}>MOST POPULAR</span>
              </div>
            </div>

            <div className={clsx('typography-m')}>
              <span className={clsx('font-bold')}>For early-stage teams</span>
              <div className={styles.contentPlanActiveUsers}>
                <p>Up to 5,000 Monthly Active Wallets.</p>
                <HoverActivatedTooltip placement="top" portalize>
                  <HoverActivatedTooltip.Anchor className={styles.centerContent}>
                    <IconTooltip />
                  </HoverActivatedTooltip.Anchor>
                  <HoverActivatedTooltip.Content aria-hidden="true">
                    Wallets accessed by users during a given calendar month. Each additional MAW costs 5¢.
                  </HoverActivatedTooltip.Content>
                </HoverActivatedTooltip>
              </div>
              <p>$0.05 per additional MAW</p>
            </div>

            <div className={styles.contentPlanPrice}>
              <span className={styles.copyDollar}>$</span>
              <span className={styles.copyPrice}>{planPeriod === PLAN_PERIODS.MONTHLY ? '249' : '224'}</span>
              <span className={styles.copyPerMonth}>/mo</span>
            </div>
            {planPeriod === PLAN_PERIODS.YEARLY && <div className={styles.copyAnnually}>$2,688 billed annually</div>}
          </div>

          <a
            href="https://dashboard.magic.link/login?startWith=startup"
            rel="noopener noreferrer"
            target="_blank"
            style={{ textDecoration: 'none', color: 'inherit' }}
            className={clsx('w-full')}
          >
            <button
              className={clsx('button variant-secondary w-full')}
              onClick={() => AnalyticsService.TrackAction('Startup plan selected')}
            >
              Start 30 Day Free Trial
            </button>
          </a>

          <FeatureRow
            icon="none"
            description="Developer Features, plus:"
            style={{
              fontFamily: 'jetBrainsMono',
              lineHeight: '1.5rem',
              textTransform: 'uppercase',
              background: 'linear-gradient(105deg, #3728B7 -25.48%, #6851FF 40.84%, #C970FF 100.89%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          />
          <FeatureList
            title="Auth & Wallets"
            features={[
              {
                description: 'Multi-Factor Auth',
              },
              {
                description: 'Login Data Export',
              },
            ]}
          />

          <FeatureList
            title="Support"
            features={[
              {
                description: 'Prioritized Support',
              },
            ]}
          />

          <FeatureList
            title="Platform"
            features={[
              {
                description: 'Up to 5 Team Seats',
              },
            ]}
          />
        </div>

        {/* Growth Plan */}
        <div className={clsx(styles.contentPlanCard, styles.contentStartCard)}>
          <div className={styles.contentPlanSummary}>
            <div className={clsx('typography-h3 color-black')}>Growth</div>

            <div className={clsx('typography-m')}>
              <span className={clsx('font-bold')}>For growing teams</span>
              <div className={styles.contentPlanActiveUsers}>
                <p>Up to 10,000 Monthly Active Wallets.</p>
                <HoverActivatedTooltip placement="top" portalize>
                  <HoverActivatedTooltip.Anchor className={styles.centerContent}>
                    <IconTooltip />
                  </HoverActivatedTooltip.Anchor>
                  <HoverActivatedTooltip.Content aria-hidden="true">
                    Wallets accessed by users during a given calendar month. Each additional MAW costs 5¢.
                  </HoverActivatedTooltip.Content>
                </HoverActivatedTooltip>
              </div>
              <p>$0.05 per additional MAW</p>
            </div>

            <div className={styles.contentPlanPrice}>
              <span className={styles.copyDollar}>$</span>
              <span className={styles.copyPrice}>{planPeriod === PLAN_PERIODS.MONTHLY ? '499' : '449'}</span>
              <span className={styles.copyPerMonth}>/mo</span>
            </div>
            {planPeriod === PLAN_PERIODS.YEARLY && <div className={styles.copyAnnually}>$5,388 billed annually</div>}
          </div>

          <a
            href="https://dashboard.magic.link/login?startWith=growth"
            rel="noopener noreferrer"
            target="_blank"
            style={{ textDecoration: 'none', color: 'inherit' }}
            className={clsx('w-full')}
            onClick={() => AnalyticsService.TrackAction('Growth plan selected')}
          >
            <button className={clsx('button variant-secondary w-full')}>Start 30 Day Free Trial</button>
          </a>

          <FeatureRow
            icon="none"
            description="Startup Features, plus:"
            style={{
              fontFamily: 'jetBrainsMono',
              lineHeight: '1.5rem',
              textTransform: 'uppercase',
              background: 'linear-gradient(105deg, #3728B7 -25.48%, #6851FF 40.84%, #C970FF 100.89%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          />
          <FeatureList
            title="Auth & Wallets"
            features={[
              {
                description: 'Custom Email Provider (SMTP)',
              },
              {
                description: 'Custom Email Templates',
              },
              {
                description: 'Bring Your Own Auth (OIDC)',
              },
            ]}
          />
          <FeatureList
            title="Support"
            features={[
              {
                description: '30-Min Kickoff Call',
              },
              {
                description: 'Dedicated Support on Slack',
              },
            ]}
          />
          <FeatureList
            title="Platform"
            features={[
              {
                description: 'Up to 10 Team Seats',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
