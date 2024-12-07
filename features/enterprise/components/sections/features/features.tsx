import React from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';

import Image from 'next/image';
import imgSecure from 'public/images/enterprise/Secure.svg';
import imgScalable from 'public/images/enterprise/Scalable.svg';
import imgMultichain from 'public/images/enterprise/Multi-chain.svg';

import styles from './features.module.less';

export const FeaturesSection: React.FC = () => {
  return (
    <SectionWrapper className={clsx(styles.HeroSection)}>
      <div className={clsx(styles.heroContent, 'd-flex flex-column flex-md-row')}>
        <div className={clsx(styles.titleColumnCol, 'col mb-5 mb-md-0')}>
          <div className={clsx(styles.titleColumnColIcon, 'mb-4')}>
            <Image
              quality={100}
              src={imgSecure}
              width={64}
              height={64}
              alt="Secure"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className={clsx(styles.titleColumnColTitle, 'mb-4')}>Secure & Compliant</div>
          <div className={clsx(styles.titleColumnColBody)}>
            Enterprise-grade security and compliance (SOC 2 Type 2, GDPR, CCPA) ensure you stay on top of regulations
          </div>
        </div>
        <div className={clsx(styles.titleColumnCol, 'col mb-5 mb-md-0')}>
          <div className={clsx(styles.titleColumnColIcon, 'mb-4')}>
            <Image
              quality={100}
              src={imgScalable}
              width={64}
              height={64}
              alt="Scalable"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className={clsx(styles.titleColumnColTitle, 'mb-4')}>Scalable</div>
          <div className={clsx(styles.titleColumnColBody)}>
            Unparalleled speed to meet your volume needs, creating up to 2,000 wallets per second. Perfect for your next
            NFT drop.
          </div>
        </div>
        <div className={clsx(styles.titleColumnCol, 'col mb-5 mb-md-0')}>
          <div className={clsx(styles.titleColumnColIcon, 'mb-4')}>
            <Image
              quality={100}
              src={imgMultichain}
              width={64}
              height={64}
              alt="Multi-Chain"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className={clsx(styles.titleColumnColTitle, 'mb-4')}>Multi-chain</div>
          <div className={clsx(styles.titleColumnColBody)}>
            Compatible with all major blockchains (20+), with just a few lines of code
          </div>
        </div>
      </div>
      <div className={clsx(styles.heroBackground)} />
    </SectionWrapper>
  );
};
