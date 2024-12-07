import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';
import { Flex, Spacer } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';

import styles from './share-content.module.less';

interface ShareContentProps {
  shareUrl: string;
  title: string;
}

export const ShareContent: React.FC<ShareContentProps> = props => {
  const { shareUrl, title } = props;

  return (
    <>
      <Spacer size={40} orientation="vertical" />
      <Flex.Row horizontal="center">
        <Flex.Column horizontal="center">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className={styles.ShareContent}
            onClick={() => {
              AnalyticsService.TrackAction('Social Media Share', {
                title,
                platform: 'Facebook',
              });
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            <FacebookIcon size={40} round onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </FacebookShareButton>
        </Flex.Column>
        <Flex.Column horizontal="center">
          <TwitterShareButton
            url={`${shareUrl} via @magic_labs`}
            title={title}
            className={styles.ShareContent}
            onClick={() => {
              AnalyticsService.TrackAction('Social Media Share', {
                title,
                platform: 'Twitter',
              });
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            <TwitterIcon size={40} round onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </TwitterShareButton>
        </Flex.Column>
        <Flex.Column horizontal="center">
          <LinkedinShareButton
            url={shareUrl}
            className={styles.ShareContent}
            onClick={() => {
              AnalyticsService.TrackAction('Social Media Share', {
                title,
                platform: 'LinkedIn',
              });
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            <LinkedinIcon size={40} round onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </LinkedinShareButton>
        </Flex.Column>
        <Flex.Column horizontal="center">
          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className={styles.ShareContent}
            onClick={() => {
              AnalyticsService.TrackAction('Social Media Share', {
                title,
                platform: 'Reddit',
              });
            }}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            placeholder={undefined}
          >
            <RedditIcon size={40} round onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          </RedditShareButton>
        </Flex.Column>
      </Flex.Row>
    </>
  );
};
