import React from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Image from 'next/image';
import imgMagicIcon from 'public/images/pricing/magic-connect-logo-icon.png';
import imgMagicIconConnect from 'public/images/pricing/features-icon-magic-connect.png';
import imgFeaturesIconDiamond from 'public/images/pricing/features-icon-diamond.png';
import imgCheckmark from 'public/images/pricing/check.svg';

import styles from './plugandplay.module.less';

export const PlugAndPlaySection: React.FC = () => {
  return (
    <SectionWrapper id="universal-wallet" className={clsx(styles.HeroSection)}>
      <div className={clsx(styles.dividerContainer)}>
        <div className={clsx(styles.dividerImage)}>
          <Image
            src={imgMagicIcon}
            alt="Magic"
            width={80}
            height={80}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </div>
        <div className={clsx(styles.dividerLine)} />
      </div>
      <h3 className={clsx(styles.headline, 'mb-3')}>Universal Wallet</h3>
      <p className={clsx(styles.subheadline)}>
        <strong>All-in-one wallet </strong> optimized for onboarding
      </p>
      <div className={clsx(styles.pricingFeaturesContainer, 'd-flex flex-column flex-md-row mt-0 mt-md-5')}>
        <div className={clsx(styles.pricingFeaturesCol, 'col-12 col-md-6  d-flex flex-column mb-5 mb-md-0')}>
          <div className={clsx(styles.pricingFeaturesImg)}>
            <Image
              src={imgMagicIconConnect}
              alt="Magic"
              width={80}
              height={80}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center center',
              }}
            />
          </div>

          <div className={clsx(styles.titleColumnTitle, 'textBold mb-2 mt-2')}>Core features</div>
          <div>Free with every plan</div>
          <ul className={clsx(styles.titleColumnList, 'mb-4')}>
            <li className={clsx(styles.titleColumnListItem, 'd-flex mt-4')}>
              <img
                loading="lazy"
                src="/images/pricing/check.svg"
                alt="✓"
                className={clsx(styles.titleColumnListItemIcon)}
              />
              <div className={clsx(styles.titleColumnListItemText)}>Email and Google One-Tap login</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img
                loading="lazy"
                src="/images/pricing/check.svg"
                alt="✓"
                className={clsx(styles.titleColumnListItemIcon)}
              />
              <div className={clsx(styles.titleColumnListItemText)}>
                Ethereum, Polygon,
                <Tippy
                  className="tippy-container"
                  interactive
                  content={
                    <span className={clsx(styles.tooltipBody)}>
                      Universal wallets are supported on Ethereum, Polygon, and Optimism. Solana and additional
                      blockchains coming soon.
                    </span>
                  }
                >
                  <span className={clsx(styles.hasTooltip)}>and more</span>
                </Tippy>
              </div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img
                loading="lazy"
                src="/images/pricing/check.svg"
                alt="✓"
                className={clsx(styles.titleColumnListItemIcon)}
              />
              <div className={clsx(styles.titleColumnListItemText)}>Pre-built, fully-featured widget</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img
                loading="lazy"
                src="/images/pricing/check.svg"
                alt="✓"
                className={clsx(styles.titleColumnListItemIcon)}
              />
              <div className={clsx(styles.titleColumnListItemText)}>3rd-party wallet selectors</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img
                loading="lazy"
                src="/images/pricing/check.svg"
                alt="✓"
                className={clsx(styles.titleColumnListItemIcon)}
              />
              <div className={clsx(styles.titleColumnListItemText)}>Fiat on-ramp</div>
            </li>
          </ul>
          <div className={clsx(styles.titleColumnActions, 'd-flex flex-column align-items-stretch mt-auto')}>
            <a
              id="signup"
              data-segment-action="Pricing Builder Clicked"
              href="https://dashboard.magic.link/signup"
              className={clsx(styles.buttonSecondary, styles.titleColumnActionsButton)}
              rel="noreferrer"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className={clsx(styles.pricingFeaturesCol, 'col-12 col-md-6 d-flex flex-column mb-5 mb-md-0')}>
          <div className={clsx('d-flex align-items-center')}>
            <div className={clsx(styles.pricingFeaturesImg)}>
              <Image
                src={imgFeaturesIconDiamond}
                alt="Magic"
                width={80}
                height={80}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
            </div>
            <div className={clsx('ps-3')}>
              <span className={clsx(styles.titleColumnTag)}>ADD-ON</span>
            </div>
          </div>

          <div className={clsx(styles.titleColumnTitle, 'textBold mb-2 mt-2')}>Pro Bundle</div>
          <div>$199 per month, 7-day free trial</div>
          <ul className={clsx(styles.titleColumnList, 'mb-4')}>
            <li className={clsx(styles.titleColumnListItem, 'd-flex mt-4')}>
              <img
                loading="lazy"
                src="/images/pricing/check.svg"
                alt="✓"
                className={clsx(styles.titleColumnListItemIcon)}
              />
              <div className={clsx(styles.titleColumnListItemText)}>
                Collect verified email from 3rd-party wallets (MetaMask, WalletConnect, etc.)
              </div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img
                loading="lazy"
                src="/images/pricing/check.svg"
                alt="✓"
                className={clsx(styles.titleColumnListItemIcon)}
              />
              <div className={clsx(styles.titleColumnListItemText)}>Custom brand color and theme</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img
                loading="lazy"
                src="/images/pricing/check.svg"
                alt="✓"
                className={clsx(styles.titleColumnListItemIcon)}
              />
              <div className={clsx(styles.titleColumnListItemText)}>5 total team seats</div>
            </li>
          </ul>
          <div className={clsx(styles.titleColumnActions, 'd-flex flex-column align-items-stretch mt-auto')}>
            <a
              id="signup"
              data-segment-action="Pricing Builder Clicked"
              href="https://dashboard.magic.link/signup?mc_premium_bundle=true"
              className={clsx(styles.buttonSecondary, styles.titleColumnActionsButton, styles.isPurple)}
              rel="noreferrer"
            >
              Try for Free
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
