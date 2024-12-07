import React, { useEffect } from 'react';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import imgCheckmarkGrey from 'public/images/pricing/check-grey.svg';
import imgCheckmarkPurple from 'public/images/pricing/check-purple.svg';
import Lordicon from 'components/widgets/lordicon';
import iconAuth from 'public/lordicon/authentication.json';
import iconWallet from 'public/lordicon/wallet.json';
import iconSecurity from 'public/lordicon/security.json';
import iconPlatform from 'public/lordicon/account.json';
import iconWeb3 from 'public/lordicon/globe.json';
import iconSupport from 'public/lordicon/support.json';
import iconWidgets from 'public/lordicon/carousel.json';
import ScrollObserver from '../../helpers/ScrollObserver';

import styles from './features.module.less';

export const FeaturesSection: React.FC = () => {
  useEffect(() => {
    ScrollObserver('.animTarget1', '.featureAnimWrapper1', 'fadeIn', 0);
    ScrollObserver('.animTarget2', '.featureAnimWrapper2', 'fadeIn', 0);
    ScrollObserver('.animTarget3', '.featureAnimWrapper3', 'fadeIn', 0);
    ScrollObserver('.animTarget4', '.featureAnimWrapper4', 'fadeIn', 0);
    ScrollObserver('.animTarget5', '.featureAnimWrapper5', 'fadeIn', 0);
    ScrollObserver('.animTarget6', '.featureAnimWrapper6', 'fadeIn', 0);
    ScrollObserver('.animTarget7', '.featureAnimWrapper7', 'fadeIn', 0);
  }, [styles]);

  return (
    <SectionWrapper id="features" className={clsx(styles.HeroSection, ' mb-4')}>
      <div className={clsx('textCentered ')}>
        <h2 className={clsx(styles.headline, 'mb-3')}>Features</h2>
        <p className={clsx(styles.subheadline)}>Solutions for any use case</p>
      </div>

      <div className={clsx(styles.containerTable, ' mt-5')}>
        <div className={clsx('featureAnimWrapper1')}>
          <div className={clsx('animTarget1')}>
            <div className={clsx(styles.headerRow, 'd-flex align-items-end ')}>
              <div className={clsx(styles.titleColumn, styles.authentication)} style={{ paddingTop: 0 }}>
                <div className={clsx(styles.icon, 'me-2')}>
                  <Lordicon size={40} icon={iconAuth} name="check" color="" />
                </div>
                <h3>Authentication</h3>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <h4>Developer</h4>
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn, styles.roundTop)}>
                <h4>Enterprise</h4>
              </div>
            </div>
            <div className={clsx(styles.pricingRow, styles.noBorder, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Email, SMS OTP </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}>
                Social Logins <br /> <small> Google, Facebook, X, Apple, Discord, + more </small>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> WebAuthn (Web Only) </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> User Data Export </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> Pro </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Custom Email Provider (SMTP) </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> Pro </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Bring-Your-Own IDP / Custom Identity Provider (OIDC) </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Account Recovery </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Account Linking </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('featureAnimWrapper2')}>
          <div className={clsx('animTarget2')}>
            <div className={clsx(styles.headerRow, 'd-flex ')}>
              <div className={clsx(styles.titleColumn, styles.wallets)}>
                <div className={clsx(styles.icon, 'me-2')}>
                  <Lordicon size={40} icon={iconWallet} name="wallet" color="" />
                </div>
                <h3>Wallets</h3>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> </div>
            </div>
            <div className={clsx(styles.pricingRow, styles.noBorder, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Key Management </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> Non-custodial DKMS </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> Non-custodial DKMS </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Secure Private Key Export </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}>
                Blockchains Supported <br /> <small> Ethereum, Polygon, Base, Solana, Flow, + more </small>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> 25 </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> 25 </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Custom Blockchain Support </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Gas Subsidy </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}>
                Token support: <br /> <small> NFTs, Crypto, Stablecoins </small>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('featureAnimWrapper3')}>
          <div className={clsx('animTarget3')}>
            <div className={clsx(styles.headerRow, 'd-flex ')}>
              <div className={clsx(styles.titleColumn, styles.security)}>
                <div className={clsx(styles.icon, 'me-2')}>
                  <Lordicon size={40} icon={iconSecurity} name="shield" color="" />
                </div>
                <h3>Security</h3>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> </div>
            </div>
            <div className={clsx(styles.pricingRow, styles.noBorder, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> SOC2 Type II, HIPAA, ISO </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Domain Allow List </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> User Allow/Block List </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Device Registration </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Custom Session Lengths </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> Pro </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> MFA with Authenticator Apps </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> Pro </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}>
                Advanced MFA <br /> <small> SMS, WebAuthn, Threat-Based, Step-Up </small>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('featureAnimWrapper4')}>
          <div className={clsx('animTarget4')}>
            <div className={clsx(styles.headerRow, 'd-flex ')}>
              <div className={clsx(styles.titleColumn, styles.platform)}>
                <div className={clsx(styles.icon, 'me-2')}>
                  <Lordicon size={40} icon={iconPlatform} name="account" color="" />
                </div>
                <h3>Platform</h3>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> </div>
            </div>
            <div className={clsx(styles.pricingRow, styles.noBorder, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Team Seats </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> 3 </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> Custom </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Additional Team Seats </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> Pro </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> Custom </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> API Rate Limit </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> 500/minute </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> Custom </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Enterprise SSO </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('featureAnimWrapper5')}>
          <div className={clsx('animTarget5')}>
            <div className={clsx(styles.headerRow, 'd-flex ')}>
              <div className={clsx(styles.titleColumn, styles.web3Capabilities)}>
                <div className={clsx(styles.icon, 'me-2')}>
                  <Lordicon size={40} icon={iconWeb3} name="world" color="" />
                </div>
                <h3>Web3 Capabilities</h3>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> </div>
            </div>
            <div className={clsx(styles.pricingRow, styles.noBorder, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Fiat On-Ramp </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> NFT Smart Contract Creation </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> NFT Checkout </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> NFT Minting </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('featureAnimWrapper6')}>
          <div className={clsx('animTarget6')}>
            <div className={clsx(styles.headerRow, 'd-flex ')}>
              <div className={clsx(styles.titleColumn, styles.support)}>
                <div className={clsx(styles.icon, 'me-2')}>
                  <Lordicon size={40} icon={iconSupport} name="support" color="" />
                </div>
                <h3>Support</h3>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> </div>
            </div>
            <div className={clsx(styles.pricingRow, styles.noBorder, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Community Support (Discord) </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Email and Chat Support </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Dedicated Slack Channel </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Custom SLAs for Uptime and Support </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Onboarding Support </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Implementation Assistance / Custom Development </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> Dedicated Customer Success Team </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> - </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('featureAnimWrapper7 ')}>
          <div className={clsx('animTarget7')}>
            <div className={clsx(styles.headerRow, 'd-flex ')}>
              <div className={clsx(styles.titleColumn, styles.uiWidgets)}>
                <div className={clsx(styles.icon, 'me-2')}>
                  <Lordicon size={40} icon={iconWidgets} name="carousel" color="" />
                </div>
                <div>
                  <h3>UI Widgets</h3> <small className={clsx(styles.subheading, 'mt-')}> (Select Blockchains) </small>
                </div>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}> </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}> </div>
            </div>
            <div className={clsx(styles.pricingRow, styles.noBorder, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}> White Label </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
            <div className={clsx(styles.pricingRow, 'd-flex')}>
              <div className={clsx(styles.titleColumn)}>
                UI Widgets (Select Blockchains) <br />
                <small>Login, View Address / Balances / NFTs, Send Tokens, Fiat On-Ramp</small>
              </div>
              <div className={clsx(styles.developer, styles.infoColumn)}>
                <img src={imgCheckmarkGrey} alt="Magic" />
              </div>
              <div className={clsx(styles.enterprise, styles.infoColumn, styles.roundBottom)}>
                <img src={imgCheckmarkPurple} alt="Magic" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
