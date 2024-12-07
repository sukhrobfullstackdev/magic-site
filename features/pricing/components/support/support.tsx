import React from 'react';
// import { CallToAction, Flex, clsx, Spacer, transitions, createFramerTransition } from '@magiclabs/ui';
import { clsx } from '@magiclabs/ui';
import { SectionWrapper } from 'components/layout/section-wrapper';
import Image from 'next/image';

import imgVipSupportFull from 'public/images/pricing/magic-vip-support-full.jpg';
import imgCheckmark from 'public/images/pricing/check.svg';

import styles from './support.module.less';

export const SupportSection: React.FC = () => {
  return (
    <SectionWrapper id="support" className={clsx(styles.HeroSection, 'my-5')}>
      <div className={clsx(styles.supportWrapper, 'd-flex flex-column flex-md-row')}>
        <div className={clsx(styles.supportCol, 'col-12 col-md-4 d-flex')}>
          <div className={clsx(styles.supportImgContainer, 'flex-fill')}>
            <Image
              src={imgVipSupportFull}
              className={clsx(styles.supportImg)}
              alt="Magic"
              width={524}
              height={390}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </div>
        </div>
        <div className={clsx(styles.supportCol, 'flex-fill p-5')}>
          <div className={clsx(styles.supportColTitle, 'textBold')}>VIP Support</div>
          <div className={clsx(styles.supportColSubTitle)}>
            <strong>$1,999</strong> per month
          </div>
          <ul className={clsx(styles.titleColumnList, 'd-flex flex-column flex-md-row mt-4')}>
            <li className={clsx(styles.titleColumnListItem, 'col d-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Dedicated support channel</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'col d-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Magic office hours</div>
            </li>
          </ul>
          <ul className={clsx(styles.titleColumnList, 'd-flex flex-column flex-md-row')}>
            <li className={clsx(styles.titleColumnListItem, 'col d-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>Guaranteed response times</div>
            </li>
            <li className={clsx(styles.titleColumnListItem, 'col d-flex')}>
              <img loading="lazy" src={imgCheckmark} alt="✓" className={clsx(styles.titleColumnListItemIcon)} />
              <div className={clsx(styles.titleColumnListItemText)}>High-level roadmap previews</div>
            </li>
          </ul>
          <span className={clsx(styles.titleColumnActions, 'd-flex flex-column  mt-4')}>
            <a
              id="signup"
              data-segment-action="Pricing Builder Clicked"
              href="https://dashboard.magic.link/login?vip_support_bundle=true"
              target="_blank"
              className={clsx(styles.buttonSecondary, styles.titleColumnActionsButton, styles.isPurple)}
              rel="noreferrer"
            >
              Subscribe
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.38889 6.33333C5.38889 6.08285 5.48839 5.84263 5.66551 5.66551C5.84263 5.48839 6.08285 5.38889 6.33333 5.38889H10.1111C10.3616 5.38889 10.6018 5.28938 10.7789 5.11227C10.9561 4.93515 11.0556 4.69493 11.0556 4.44444C11.0556 4.19396 10.9561 3.95374 10.7789 3.77662C10.6018 3.5995 10.3616 3.5 10.1111 3.5H6.33333C5.58189 3.5 4.86122 3.79851 4.32986 4.32986C3.79851 4.86122 3.5 5.58189 3.5 6.33333V17.6667C3.5 18.4181 3.79851 19.1388 4.32986 19.6701C4.86122 20.2015 5.58189 20.5 6.33333 20.5H17.6667C18.4181 20.5 19.1388 20.2015 19.6701 19.6701C20.2015 19.1388 20.5 18.4181 20.5 17.6667V13.8889C20.5 13.6384 20.4005 13.3982 20.2234 13.2211C20.0463 13.0439 19.806 12.9444 19.5556 12.9444C19.3051 12.9444 19.0648 13.0439 18.8877 13.2211C18.7106 13.3982 18.6111 13.6384 18.6111 13.8889V17.6667C18.6111 17.9171 18.5116 18.1574 18.3345 18.3345C18.1574 18.5116 17.9171 18.6111 17.6667 18.6111H6.33333C6.08285 18.6111 5.84263 18.5116 5.66551 18.3345C5.48839 18.1574 5.38889 17.9171 5.38889 17.6667V6.33333ZM14.8333 3.5C14.5829 3.5 14.3426 3.5995 14.1655 3.77662C13.9884 3.95374 13.8889 4.19396 13.8889 4.44444C13.8889 4.69493 13.9884 4.93515 14.1655 5.11227C14.3426 5.28938 14.5829 5.38889 14.8333 5.38889H17.2757L11.3323 11.3323C11.1602 11.5104 11.065 11.749 11.0672 11.9966C11.0693 12.2442 11.1687 12.4811 11.3438 12.6562C11.5189 12.8313 11.7558 12.9307 12.0034 12.9328C12.251 12.935 12.4896 12.8398 12.6677 12.6677L18.6111 6.72433V9.16667C18.6111 9.41715 18.7106 9.65737 18.8877 9.83449C19.0648 10.0116 19.3051 10.1111 19.5556 10.1111C19.806 10.1111 20.0463 10.0116 20.2234 9.83449C20.4005 9.65737 20.5 9.41715 20.5 9.16667V4.44444C20.5 4.19396 20.4005 3.95374 20.2234 3.77662C20.0463 3.5995 19.806 3.5 19.5556 3.5H14.8333Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
};
