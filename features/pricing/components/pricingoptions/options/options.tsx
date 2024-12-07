import React from 'react';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import imgCheckmark from 'public/images/pricing/check.svg';

import styles from './options.module.less';

export const OptionsSection: React.FC = () => {
  return (
    <SectionWrapper className={clsx(styles.HeroSection)}>
      <div className={clsx(styles.pricingCards_flex, 'd-flex flex-column flex-md-row')}>
        <div className={clsx(styles.pricingCards_col, 'col-12 col-md-6 mb-5 mb-md-0')}>
          <div className={clsx(styles.pricingCards_card)}>
            <div className={clsx(styles.pricingCards_cardTop, 'd-flex flex-column align-items-start')}>
              <h2 className={clsx(styles.pricingCards_tier)}>Developer</h2>
              <h4 className={clsx(styles.pricingCards_title)}>Free to Start</h4>
              <div className={clsx('d-flex flex-column align-items-start mb-4')}>
                <div className={clsx(styles.pricingCards_supporting_text)}>
                  1,000 free monthly active wallets (MAWs)
                </div>
                <div className={clsx(styles.pricingCards_supporting_text)}>
                  <strong>$0.05</strong> per MAW up to 5,000 MAWs, <br />
                  then <strong>$0.10</strong> per MAW
                </div>
              </div>
              <div className={clsx(styles.pricingCards_featureActions, 'mt-auto')}>
                <a
                  id="signup"
                  data-segment-action="Pricing Builder Clicked"
                  href="https://dashboard.magic.link/signup"
                  className={clsx('btnGlass')}
                  rel="noreferrer"
                >
                  Start for free
                </a>
              </div>
            </div>
            <div className={clsx(styles.pricingCards_cardBottom, 'd-flex flex-column align-items-start')}>
              <ul className={clsx(styles.pricingCards_FeatureList)}>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>1,000 Monthly Active Wallets</div>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>10+ Auth Login Options</div>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <span className={clsx(styles.pricingCards_FeatureListItemText)}>Scalable Key Management</span>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>Web, Mobile, and Gaming SDKs</div>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>
                    Support for
                    <Tippy
                      className="tippy-container"
                      interactive
                      content={
                        <span className={clsx(styles.tooltipBody)}>
                          Magic supports Ethereum, Polygon, Solana, Flow, Binance Smart Chain, Optimism, Avalanche, NEAR
                          and many more. Full list available&nbsp;
                          <a
                            href="https://magic.link/docs/auth/overview#blockchains"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            here
                          </a>
                          .
                        </span>
                      }
                    >
                      <span className={clsx(styles.hasTooltip, 'ms-1')}>25 blockchains</span>
                    </Tippy>
                  </div>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>UI Widgets</div>
                </li>
              </ul>
            </div>
            <div className={clsx(styles.pricingCardBackgroundShape)} />
            <div className={clsx(styles.pricingCardBackgroundLaptop)} />
          </div>
        </div>

        <div className={clsx(styles.pricingCards_col, styles.pricingCards_colDark, 'col-12 col-md-6')}>
          <div className={clsx(styles.pricingCards_card)}>
            <div className={clsx(styles.pricingCards_cardTop, 'd-flex flex-column align-items-start')}>
              <h2 className={clsx(styles.pricingCards_tier, styles.pricingCards_tierEnterprise)}>Enterprise</h2>
              <h4 className={clsx(styles.pricingCards_title)}>Custom Pricing</h4>
              <div className={clsx('d-flex flex-column align-items-start mb-4')}>
                <div className={clsx(styles.pricingCards_supporting_text)}>
                  Best for <strong>5,000+</strong> MAWs <br />
                  Volume MAW discounts
                </div>
              </div>
              <div className={clsx(styles.pricingCards_featureActions, 'mt-auto')}>
                <a
                  id="signup"
                  data-segment-action="Pricing Builder Clicked"
                  href="/contact"
                  className={clsx('btnGlass btnPurple')}
                  rel="noreferrer"
                >
                  Contact Sales
                </a>
              </div>
            </div>
            <div className={clsx(styles.pricingCards_cardBottom, 'd-flex flex-column align-items-start')}>
              <ul className={clsx(styles.pricingCards_FeatureList)}>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>
                    5,000+ Wallets & Everything In Developer Plan
                  </div>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>Custom Blockchain Support</div>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>
                    Premium Auth Features;&nbsp;
                    <Tippy
                      className="tippy-container"
                      interactive
                      content={
                        <span className={clsx(styles.tooltipBody)}>
                          Magic offers turnkey solutions for Firebase Auth, Auth0, Azure, Okta, and any other OIDC
                          provider.
                        </span>
                      }
                    >
                      <span className={clsx(styles.hasTooltip)}>OIDC/Identity Provider Integration</span>
                    </Tippy>
                  </div>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>Custom API Rate Limits</div>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>End-to-End NFT Feature</div>
                </li>
                <li className={clsx(styles.pricingCards_FeatureListItem, 'd-flex')}>
                  <img
                    loading="lazy"
                    src={imgCheckmark}
                    alt="✓"
                    className={clsx(styles.pricingCards_FeatureListItemIcon)}
                  />
                  <div className={clsx(styles.pricingCards_FeatureListItemText)}>
                    VIP Support & Guaranteed Response Times/SLAs
                  </div>
                </li>
              </ul>
            </div>
            <div className={clsx(styles.pricingCardBackgroundShape)} />
            <div className={clsx(styles.pricingCardBackgroundGlobe)} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
