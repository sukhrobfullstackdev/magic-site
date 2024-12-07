/* eslint-disable react/jsx-pascal-case */

import React, { useCallback, useEffect } from 'react';
import { clsx, Flex, MonochromeIcons, TextButton } from '@magiclabs/ui';
import { useForceUpdate, useIsMounted } from 'usable-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { defaultPageLayout } from 'components/layout/default-page-layout';
import { AnalyticsService } from 'lib/analytics-service';
import { cleanURL } from 'lib/url-helpers';
import styles from './banner.module.less';

interface AllowedURL {
  url: string;
  theme: 'light' | 'dark' | 'dim';
}

interface BannerProps {
  allowedURLs?: AllowedURL[];
}

export const Banner: React.FC<BannerProps> = props => {
  const { allowedURLs = [] } = props;
  const isMounted = useIsMounted();
  const router = useRouter();

  const forceUpdate = useForceUpdate();
  const currentRoute = allowedURLs.find(
    route => route.url === cleanURL(router.asPath) || route.url === router.pathname,
  );
  const isMatchPath = cleanURL(router.asPath) === currentRoute?.url || currentRoute?.url === router.pathname;

  const { banner } = defaultPageLayout.useData();

  const onPress = useCallback(() => {
    AnalyticsService.TrackAction('Banner clicked');
  }, []);

  /**
   * only render the banner if the current route is in the allowedURLs
   * REASON: we dont to have DOM misbehavior when the banner is not needed or rendered
   * @see:  https://github.com/facebook/react/issues/10879
   */
  useEffect(() => {
    if (isMounted()) {
      forceUpdate();
    }
  }, [isMounted, forceUpdate]);

  if (!isMounted()) return null;

  return (
    <>
      {isMatchPath && !!banner?.text && !!banner?.url ? (
        <Flex.Column horizontal="center" className={clsx([styles.banner, styles[currentRoute.theme]])}>
          <Flex.Row>
            <div className={styles.buttonWrapper}>
              <Link href={banner.url} passHref legacyBehavior>
                <TextButton.a
                  size="sm"
                  onPress={onPress}
                  trailingIcon={MonochromeIcons.ArrowRight}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {banner.text}
                </TextButton.a>
              </Link>
            </div>
          </Flex.Row>
        </Flex.Column>
      ) : null}
    </>
  );
};
