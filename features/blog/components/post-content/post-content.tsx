import React, { useCallback, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import {
  Flex,
  Spacer,
  Outset,
  TextButton,
  MonochromeIcons,
  Media,
  useToast,
  Popover,
  Icon,
  CallToAction,
} from '@magiclabs/ui';
import { useClickOutside, useClipboard } from 'usable-react';
import { RichText } from 'components/widgets/rich-text';
import { TableOfContents, TableOfContentsNode } from 'components/widgets/table-of-contents';
import { PreviewModeDialog } from 'components/widgets/preview-mode-dialog';
import { AnalyticsService } from 'lib/analytics-service';
import { GraphCMSImage } from 'components/widgets/graphcms-image';
import { PostContentQuery } from 'graphql/generated';
import { ShareContent } from '../share-content';
import { Disqus } from '../disqus';

import styles from './post-content.module.less';

interface PostContentProps {
  preview?: boolean;
  post: NonNullable<PostContentQuery['post']>;
  categoryLabel: string;
  tableOfContents: TableOfContentsNode[];
}

export const PostContent: React.FC<PostContentProps> = ({ preview, post, categoryLabel, tableOfContents }) => {
  const { title, type } = post!;

  useEffect(() => {
    AnalyticsService.TrackPage(`${type?.displayName} - ${title}`);
  }, []);

  return (
    <Flex.Column horizontal="center">
      {preview && <PreviewModeDialog />}
      <PostNav post={post} categoryLabel={categoryLabel} tableOfContents={tableOfContents} />

      <div className={styles.GuidePageViewLayout}>
        <Flex.Item className={styles.dynamicSpacer} shrink={2.5} basis="300px" />

        <Flex.Item shrink={0}>
          <RenderPostContent post={post} categoryLabel={categoryLabel} tableOfContents={tableOfContents} />
        </Flex.Item>

        <Flex.Row className={styles.tocContainer} shrink={1} basis="300px" horizontal="flex-end">
          <Spacer size={15} orientation="horizontal" />
          <TableOfContents title={title} structure={tableOfContents} />
        </Flex.Row>
      </div>
    </Flex.Column>
  );
};

const PostNav: React.FC<PostContentProps> = ({ post, tableOfContents }) => {
  const { title, type } = post;

  const [showTOC, setShowTOC] = useState(false);
  const tocContentRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(
    tocContentRef,
    () => {
      if (showTOC) {
        setShowTOC(false);
      }
    },
    [showTOC],
  );

  const toggleShowTOC = useCallback(() => {
    setShowTOC(!showTOC);
  }, [showTOC]);

  const href = `/${type?.typeID}`;

  const postNavContent = (
    <Outset left={15} right={15} top={10} bottom={10}>
      <Flex.Row className={styles.GuideNavActions} horizontal="space-between" vertical="center">
        <Link href={href} passHref legacyBehavior>
          <TextButton.a
            size="sm"
            color="tertiary"
            leadingIcon={MonochromeIcons.CaretLeft}
            className={styles.PostNavLink}
          >
            {type?.typeID}
          </TextButton.a>
        </Link>

        <Media lessThan="lg">
          <Popover in={showTOC} placement="bottom-end" arrow={false}>
            <Popover.Anchor>
              <TextButton onPress={toggleShowTOC} size="sm" color="tertiary" aria-label="open table of contents">
                Table of Contents <Spacer size={5} orientation="horizontal" />
                <Icon size={20} type={MonochromeIcons.CaretDown} />
              </TextButton>
            </Popover.Anchor>

            <Popover.Content ref={tocContentRef}>
              <TableOfContents
                title={title}
                structure={tableOfContents}
                hasBorderLeft={false}
                onClick={toggleShowTOC}
                maxHeight={320}
                maxWidth={250}
              />
            </Popover.Content>
          </Popover>
        </Media>
      </Flex.Row>
    </Outset>
  );

  return (
    <>
      <Flex.Column className={styles.GuideNav} horizontal="center">
        {postNavContent}
      </Flex.Column>
    </>
  );
};

const RenderPostContent: React.FC<PostContentProps> = ({ post, categoryLabel }) => {
  const { title, date, author, content, scaffold, slug, coverImage, type } = post;
  const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className={styles.GuideContent}>
      <Spacer size={100} orientation="vertical" />

      <div className={styles.header}>
        <div className={styles.contentType}>{categoryLabel}</div>
        <Spacer size={20} orientation="vertical" />
        <h1 className={styles.title}>{title}</h1>
        <Spacer size={20} orientation="vertical" />
        <div className={styles.authordate}>
          {author} · {formattedDate}
        </div>
        <Spacer size={60} orientation="vertical" />
        {scaffold && <CopyScaffoldCTA scaffold={scaffold} />}
        <GraphCMSImage image={coverImage as any} alt={title} />
      </div>

      <div className={styles.mainContent}>
        <RichText content={content?.json} />
      </div>

      <ShareContent title={title} shareUrl={`https://magic.link/posts/${slug}`} />

      <SignUpCTA />

      {type?.typeID === 'guides' ? <Disqus url={`https://magic.link/posts/${slug}`} identifier={slug} /> : <></>}

      <Spacer size={100} orientation="vertical" />
    </main>
  );
};

const CopyScaffoldCTA: React.FC<{ scaffold: string }> = ({ scaffold }) => {
  const { createToast } = useToast();
  const { copy, ref } = useClipboard();

  const onCopyRequest = useCallback(async () => {
    try {
      await copy();
      createToast({ type: 'success', message: 'Copied to clipboard!' });
    } catch {
      createToast({ type: 'error', message: 'Failed to copy to clipboard.' });
    }
  }, [copy, createToast]);

  return (
    <>
      <div className={styles.CopyScaffoldCTA}>
        <Flex.Column>
          <span className={styles.description}>Download this example and get started in seconds:</span>
          <Flex.Row horizontal="flex-end">
            <code ref={ref}>{scaffold}</code>
            <Spacer size={10} />
            <TextButton onPress={onCopyRequest}>
              <Icon type={MonochromeIcons.Copy} />
            </TextButton>
          </Flex.Row>
        </Flex.Column>
      </div>

      <Spacer size={40} orientation="vertical" />
    </>
  );
};

const SignUpCTA: React.FC = () => {
  return (
    <>
      <Spacer size={40} orientation="vertical" />
      <div className={styles.signUpCTAContainer}>
        <div className={styles.signUpCTA}>
          <Spacer size={30} orientation="vertical" />
          <span className={styles.tagline}>Let's make some magic!</span>
          <Flex.Column horizontal="center">
            <Spacer size={30} orientation="vertical" />
            <Flex.Row vertical="center">
              <CallToAction.a href="https://dashboard.magic.link/signup" target="_blank" rel="noreferrer">
                Get started for free
              </CallToAction.a>
            </Flex.Row>
            <Spacer size={30} orientation="vertical" />
          </Flex.Column>
        </div>
      </div>
      <Spacer size={40} orientation="vertical" />
    </>
  );
};
