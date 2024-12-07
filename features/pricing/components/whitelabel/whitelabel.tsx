import React from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Image from 'next/image';
import imgMagicIcon from 'public/images/pricing/magic-connect-logo-icon.png';
import imgMagicIconAuth from 'public/images/pricing/features-icon-magic-auth.png';
import imgFeaturesIconStick from 'public/images/pricing/features-icon-stick.png';
import imgFeaturesIconDiamond from 'public/images/pricing/features-icon-diamond.png';
import imgFeaturesIconShapes from 'public/images/pricing/features-icon-shapes.png';
import imgCheckmark from 'public/images/pricing/check.svg';

import styles from './whitelabel.module.less';

export const WhiteLabelSection: React.FC = () => {
  return (
    <SectionWrapper id="dedicated-wallet" className={clsx(styles.HeroSection)}>
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
      <h3 className={clsx(styles.headline, 'mb-3')}>Dedicated Wallet</h3>
      <p className={clsx(styles.subheadline)}>
        Customizable <strong>auth and wallet</strong> API
      </p>
      <div className={clsx(styles.pricingFeaturesContainer, 'd-flex flex-column flex-md-row mt-0 mt-md-5')}>
        <div className={clsx(styles.pricingFeaturesCol, 'col-12 col-md-4  d-flex flex-column mb-5 mb-md-0')}>
          <div className={clsx(styles.pricingFeaturesImg)}>
            <Image
              src={imgMagicIconAuth}
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
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Access to all login methods</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>
                Access to all
                <Tippy
                  className="tippy-container"
                  interactive
                  content={
                    <span className={clsx(styles.tooltipBody)}>
                      Magic supports Ethereum, Polygon, Solana, Flow, Binance Smart Chain, Optimism, Avalanche, NEAR and
                      many more. Full list available
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
                  <span className={clsx(styles.hasTooltip)}>30+ blockchains</span>
                </Tippy>
              </div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Custom branding</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>UI widgets for NFTs, onramps, and more</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Market-rate pricing for SMS logins</div>
            </li>
          </ul>
          <div className={clsx(styles.titleColumnActions, 'd-flex flex-column align-items-stretch mt-auto')}>
            <a
              id="signup"
              data-segment-action="Pricing Builder Clicked"
              href="https://dashboard.magic.link/signup"
              target="_blank"
              className={clsx(styles.buttonSecondary, styles.titleColumnActionsButton)}
              rel="noreferrer"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className={clsx(styles.pricingFeaturesCol, 'col-12 col-md-4  d-flex flex-column mb-5 mb-md-0')}>
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
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Multi-factor authentication</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Custom session lengths</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Custom email providers (SMTP)</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>5 total team seats</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>User data export</div>
            </li>
          </ul>
          <div className={clsx(styles.titleColumnActions, 'd-flex flex-column align-items-stretch mt-auto')}>
            <a
              id="signup"
              data-segment-action="Pricing Builder Clicked"
              href="https://dashboard.magic.link/signup?ma_premium_bundle=true"
              className={clsx(styles.buttonSecondary, styles.titleColumnActionsButton, styles.isPurple)}
              rel="noreferrer"
            >
              Try for Free
            </a>
          </div>
        </div>

        <div className={clsx(styles.pricingFeaturesCol, 'col-12 col-md-4 d-flex flex-column mb-5 mb-md-0')}>
          <div className={clsx('d-flex align-items-center')}>
            <div className={clsx(styles.pricingFeaturesImg)}>
              <Image
                src={imgFeaturesIconStick}
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

          <div className={clsx(styles.titleColumnTitle, 'textBold mb-2 mt-2')}>Bring your own auth provider</div>
          <div>Custom pricing</div>
          <ul className={clsx(styles.titleColumnList, 'mb-4')}>
            <li className={clsx(styles.titleColumnListItem, 'd-flex mt-4')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Attach Web3 wallets for existing users</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>
                Connect any
                <Tippy
                  className="tippy-container"
                  interactive
                  content={
                    <span className={clsx(styles.tooltipBody)}>
                      Magic Wallet Services offers turnkey solutions for Firebase Auth, Auth0, Azure, Okta, and any
                      other OIDC provider.
                    </span>
                  }
                >
                  <span className={clsx(styles.hasTooltip)}>identity provider</span>
                </Tippy>
              </div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'd-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Full white-label support</div>
            </li>
          </ul>
          <div className={clsx(styles.titleColumnActions, 'd-flex flex-column align-items-stretch mt-auto')}>
            <a
              id="signup"
              data-segment-action="Pricing Builder Clicked"
              href="/contact"
              className={clsx(styles.buttonSecondary, styles.titleColumnActionsButton, styles.isPurple)}
              rel="noreferrer"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
