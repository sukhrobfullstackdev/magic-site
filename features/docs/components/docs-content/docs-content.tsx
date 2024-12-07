import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { Media, Spacer, clsx, Flex, CallToAction } from '@magiclabs/ui';
import type { DocsPageRenderData } from 'features/docs/docs-data';
import { RichText, EmbedRenderers, WithRichTextStyles } from 'components/widgets/rich-text';
import { GraphCMSImage } from 'components/widgets/graphcms-image';
import { PostCard } from 'features/blog/components/posts-listing';

import {
  DocsSmartShortcutSetReferenceFragment,
  DocsPage,
  DocsCategory,
  DocsCallOutReferenceFragment,
  DocsCountryCodesReferenceFragment,
  DocsHeroCardReferenceFragment,
  DocsNavigationLink,
  DocsGuidesSetReferenceFragment,
  DocsVideoReferenceFragment,
  DocsPassportWaitlistCalloutReferenceFragment,
} from 'graphql/generated';
import { useSidenavContext } from '../sidenav';
import { ShortcutTile } from '../shortcut-tile';

import styles from './docs-content.module.less';

interface DocsContentProps {
  data: DocsPageRenderData;
  beforeContentSlot?: React.ReactNode;
}

export const DocsContent: React.FC<DocsContentProps> = props => {
  const { data, beforeContentSlot } = props;

  const scrollPaddingStyles = `
  html, body {
    scroll-padding-top: 66px;
  }
  @media (max-width: 1023px) { 
    html, body {
      scroll-padding-top: 44px;
    }
  }
`;

  return (
    <>
      <Head>
        {/* This adds scroll padding when using the right side nav to scroll 
        to a specific section. This is needed to account for the "fixed" sub nav header 
        and prevents any section titles from being cut off/hidden. */}
        <style>{scrollPaddingStyles}</style>
      </Head>

      <main className={clsx('docsContents___', styles.DocsContents)}>
        <div className={styles.header}>
          <Spacer size={50} orientation="vertical" />
          <Media at="xs">
            <h1 className={clsx([styles.title, styles.xs])}>{data.title}</h1>
          </Media>
          <Media greaterThan="xs">
            <h1 className={styles.title}>{data.title}</h1>
          </Media>

          {!!data.excerpt && (
            <>
              <Spacer size={16} orientation="vertical" />
              <p>{data.excerpt}</p>
            </>
          )}

          {beforeContentSlot}

          <Spacer size={10} orientation="vertical" />
        </div>

        <div className={styles.mainContent}>
          <RichText content={data.content} references={data.references} embedRenderers={embedRenderers} />
        </div>

        <Spacer size={100} orientation="vertical" />
      </main>
    </>
  );
};

export const embedRenderers: EmbedRenderers = {
  DocsSmartShortcutSet: (props: DocsSmartShortcutSetReferenceFragment) => {
    const {
      title,
      setDescription,
      category,
      basicPages,
      buildADemoPages,
      quickstartPages,
      docsNavigationLinks,
      shouldRenderRecursiveCategories,
      shouldRenderTitleAndDescription,
    } = props;
    const { data } = useSidenavContext();

    const allNodes = [
      ...(category?.children || []),
      ...basicPages,
      ...buildADemoPages,
      ...quickstartPages,
      ...docsNavigationLinks,
    ].filter(node => !(node as any)?.children);

    const [sliceValue, setSliceValue] = React.useState(6);

    const slicedNodes = allNodes.slice(0, sliceValue);
    const hasMore = allNodes.length > sliceValue;

    return (
      <div className={styles.ShortcutSet}>
        {!!shouldRenderTitleAndDescription && (
          <WithRichTextStyles>
            <h4>{title}</h4>
            {!!setDescription && <h5>{setDescription}</h5>}
          </WithRichTextStyles>
        )}

        <Spacer size={16} orientation="vertical" />

        <Flex.Row horizontal="flex-start" vertical="center" wrap>
          {slicedNodes.map(child => {
            const { id, sidenavLabel, icon } = child as DocsPage;
            const { children } = child as DocsCategory;
            const { label, url: navUrl, large } = child as DocsNavigationLink;

            // Respect the `recursiveCategories` setting
            // if the current node is a sub-category.
            if (children?.[0]?.id && !shouldRenderRecursiveCategories) {
              return null;
            }

            const resolvedID = children?.[0]?.id || id;
            const resolvedIcon = (children?.[0] as DocsPage)?.icon || icon;
            const resolvedLabel = sidenavLabel || label;
            const url = data.flatPages.find(node => node.id === resolvedID)?.href || navUrl;

            if (resolvedID && resolvedLabel && url) {
              return (
                <ShortcutTile
                  key={resolvedID}
                  title={resolvedLabel}
                  image={resolvedIcon}
                  url={url}
                  basis={allNodes.length ? '30.1%' : '46.1%'}
                  large={!!large}
                />
              );
            }

            return null;
          })}
        </Flex.Row>
        {hasMore && (
          <button onClick={() => setSliceValue(allNodes.length)} className={styles.viewMore}>
            View {allNodes.length - sliceValue} more
          </button>
        )}
      </div>
    );
  },

  DocsCallOut: (props: DocsCallOutReferenceFragment) => {
    const { headline, description, buttonText, url } = props;

    return (
      <>
        <Spacer size={30} orientation="vertical" />
        <div className={styles.CallOut}>
          <div>
            <h3>{headline}</h3>
            <p>{description}</p>
          </div>

          <Link href={url}>{buttonText}</Link>
        </div>
        <Spacer size={30} orientation="vertical" />
      </>
    );
  },

  DocsCountryCodes: (props: DocsCountryCodesReferenceFragment) => {
    const { unsupportedCountryCodes } = props;
    const sortedCountryCodes = unsupportedCountryCodes.data.sort((a: number, b: number) => a - b);
    const formattedCountryCodes = sortedCountryCodes.map((num: number) => `+${num}`).join(', ');

    return (
      <div className={styles.CountryCodes}>
        <p>{formattedCountryCodes}</p>
      </div>
    );
  },

  DocsGuidesSet: (props: DocsGuidesSetReferenceFragment) => {
    const { title, details, posts } = props;

    return (
      <div className={styles.DocsGuideSet}>
        <WithRichTextStyles>
          <h2>{title}</h2>
          {!!details && <h5>{details}</h5>}
        </WithRichTextStyles>
        <Spacer size={16} orientation="vertical" />

        <Flex.Row className={styles.postsCards} horizontal="space-between" wrap>
          {posts.map((post: any) => (
            <PostCard
              {...post}
              featured={post.featured}
              focusProps={null}
              key={post.id}
              classNames={styles.postsCardEntity}
            />
          ))}
        </Flex.Row>
        <Spacer size={24} orientation="vertical" />
        <CallToAction.a size="md" color="primary" href="/guides">
          View all guides
        </CallToAction.a>
      </div>
    );
  },

  DocsHeroCard: (props: DocsHeroCardReferenceFragment) => {
    const { headline, description, buttonText, url, colorA, colorB, imageDesktop, imageMobile, imageMobileYOffset } =
      props;

    return (
      <div
        className={styles.HeroCard}
        style={{
          background: `linear-gradient(107.61deg, ${colorA.hex} 26.5%, ${colorB.hex} 104.29%)`,
          boxShadow: `2px 4px 25px 2px rgba(${colorA.rgba.r}, ${colorA.rgba.g}, ${colorA.rgba.b}, 0.16)`,
        }}
      >
        <Flex.Column shrink={0} className={styles.content}>
          <h2>{headline}</h2>
          <p>{description}</p>

          <Spacer size={32} orientation="vertical" />

          <Flex.Row style={{ width: '100%' }}>
            <Flex.Item className={styles.buttonWrapper}>
              <Media lessThan="sm">
                <CallToAction.a outline size="sm" color="secondary" href={url}>
                  {buttonText}
                </CallToAction.a>
              </Media>

              <Media greaterThanOrEqual="sm">
                <CallToAction.a outline size="md" color="secondary" href={url}>
                  {buttonText}
                </CallToAction.a>
              </Media>
            </Flex.Item>

            <Flex.Row
              horizontal="center"
              className={clsx(styles.imageWrapper, styles.mobileOnly)}
              style={{ top: imageMobileYOffset == null ? undefined : `${imageMobileYOffset}px` }}
            >
              <GraphCMSImage image={imageMobile ?? imageDesktop} />
            </Flex.Row>
          </Flex.Row>
        </Flex.Column>

        <div className={clsx(styles.imageWrapper, styles.desktopOnly)}>
          <GraphCMSImage image={imageDesktop} objectFit="contain" objectPosition="right" />
        </div>
      </div>
    );
  },

  DocsVideo: (props: DocsVideoReferenceFragment) => {
    const { url, videoTitle } = props;
    let videoUrl = url;

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = new URLSearchParams(new URL(url).search).get('v') || url.split('/').pop();
      videoUrl = `https://www.youtube.com/embed/${videoId}`;
    }

    return (
      <div className={styles.Video}>
        <iframe src={videoUrl} title={videoTitle} allowFullScreen />
      </div>
    );
  },

  DocsPassportWaitlistCallout: (props: DocsPassportWaitlistCalloutReferenceFragment) => {
    const { url } = props;
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
        <Flex.Row className={styles.PassportCallout}>
          <img src="/images/icons/megaphone.svg" width={24} height={24} alt="megaphone icon" />
          <Flex.Row className={styles.textContainer}>
            <p>
              Looking for Passport? <span className={styles.signUp}>Sign up for early access</span>
            </p>
            <img src="/images/icons/arrow-right.svg" width={16} height={16} alt="right arrow" />
          </Flex.Row>
        </Flex.Row>
      </a>
    );
  },
};
