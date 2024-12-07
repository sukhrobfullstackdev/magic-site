/* eslint-disable no-param-reassign */

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Flex,
  TextField,
  Icon,
  TextButton,
  MonochromeIcons,
  transitions,
  Spacer,
  Emoji,
  CallToAction,
  Linkable,
  Checkbox,
  clsx,
} from '@magiclabs/ui';
import { useFocus, useFocusVisible } from '@react-aria/interactions';
import { AnimatePresence, AnimateSharedLayout, motion, useReducedMotion } from 'framer-motion';
import { useSearcher } from 'lib/algolia/clients/search';
import * as sanitizeHtml from 'sanitize-html';
import { Maybe, PostsListingQuery } from 'graphql/generated';
import { AnalyticsService } from 'lib/analytics-service';
import greyDropdown from 'public/images/icons/dropdown.svg';
import { Modal } from 'components/widgets/modal';
import { graphcmsReadable } from 'lib/graphcms/clients/read';
import { postsListingContinued } from 'features/blog/graphql/posts';
import { PostHit, PostsAlgoliaIndex } from 'features/blog/posts-indexer';
import { GraphCMSImage } from 'components/widgets/graphcms-image';

import styles from './posts-listing.module.less';

interface PostsListingProps {
  postType: string;
  categoryLabel?: Maybe<string>;
  posts: PostsListingQuery['posts'];
  featuredPosts?: PostsListingQuery['featuredPosts'];
  tags: PostsListingQuery['tags'];
  totalPosts: number;
}

export const PostsListing: React.FC<PostsListingProps> = ({
  posts: initialPosts,
  featuredPosts,
  postType,
  categoryLabel,
  tags,
  totalPosts,
}) => {
  useEffect(() => {
    AnalyticsService.TrackPage(`${categoryLabel} - Index`);
  }, []);

  // --- Algolia searcher

  const searcher = useSearcher({ index: PostsAlgoliaIndex, tagsAttribute: 'tags', filter: `type.typeID:${postType}` });

  const [showTagsModal, setShowTagsModal] = useState(false);

  const saveTechStackFilter = useCallback(() => {
    AnalyticsService.TrackAction(`${categoryLabel} - Filter by tag`, {
      tags: searcher.tags,
    });

    searcher.saveStagedTags();
    setShowTagsModal(false);
  }, [searcher.saveStagedTags, searcher.tags]);

  const onTechStackChecked: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      if (target.checked) {
        if (!searcher.stagedTags.includes(target.value)) {
          searcher.addStagedTag(target.value);
        }
      } else {
        searcher.removeStagedTag(target.value);
      }
    },
    [searcher.addStagedTag, searcher.stagedTags],
  );

  // --- Focus management

  const { isFocusVisible } = useFocusVisible();
  const { focusProps } = useFocus({
    onBlur: useCallback(ev => delete ev.target.dataset.hasFocus, []),
    onFocus: useCallback(ev => (ev.target.dataset.hasFocus = isFocusVisible), [isFocusVisible]),
  });

  // --- Collate posts and query for more from GraphCMS

  const [posts, setPosts] = useState(() => [...(featuredPosts ?? []), ...initialPosts]);
  const [loadingMorePosts, setLoadingPosts] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(posts.length < totalPosts);
  const loadMorePosts = useCallback(async () => {
    setLoadingPosts(true);

    const res: any = await graphcmsReadable.request(postsListingContinued, {
      pageSize: 12,
      cursor: posts[posts.length - 1].id,
      postType,
    });

    const nextPosts = [...posts, ...res.posts];
    setPosts(nextPosts);
    setHasNextPage(nextPosts.length < totalPosts);
    setLoadingPosts(false);
  }, [posts, postType, totalPosts]);

  const postsToRender = searcher.isActive ? searcher.hits : posts;
  const showLoadMoreCard = !loadingMorePosts && hasNextPage && !searcher.isActive;

  // --- Render!

  return (
    <>
      <div className={styles.PostsListing}>
        {categoryLabel === 'Guides' ? <h1>{categoryLabel}</h1> : <h1>Magic Blog</h1>}

        <div className={styles.desc}>A collection of {totalPosts} posts</div>

        <Spacer size={40} orientation="vertical" />
        <div className={styles.formContainer}>
          <Flex.Row className={styles.formOutline} horizontal="center" wrap>
            <TextField
              type="search"
              placeholder="Search..."
              prefix={<Icon type={MonochromeIcons.Search} />}
              suffix={
                searcher.searchTerm.length ? (
                  <TextButton onPress={searcher.clearSearchTerm}>
                    <Icon size={20} type={MonochromeIcons.Remove} />
                  </TextButton>
                ) : undefined
              }
              {...searcher.textFieldProps}
            />

            {categoryLabel === 'Guides' ? (
              <CallToAction className={styles.button} outline onPress={useCallback(() => setShowTagsModal(true), [])}>
                Filter By Tech
                {searcher.stagedTags.length > 0 && (
                  <>
                    <img src={greyDropdown} aria-hidden="true" alt="button dropdown" /> {searcher.tags.length}
                  </>
                )}
              </CallToAction>
            ) : (
              <></>
            )}
          </Flex.Row>
        </div>
        <Spacer size={40} orientation="vertical" />

        <div className={styles.divider} />
        <Flex.Row className={styles.postsCards} horizontal="space-between" wrap>
          <AnimateSharedLayout>
            <AnimatePresence initial={false}>
              {postsToRender.map(props => (
                <PostCard
                  {...props}
                  featured={props.featured && !searcher.isActive}
                  focusProps={focusProps}
                  key={props.id}
                />
              ))}
              {showLoadMoreCard && <LoadMoreCard focusProps={focusProps} onClick={loadMorePosts} />}
            </AnimatePresence>

            {!postsToRender.length && searcher.isActive && (
              <p className={styles.noMatchingResultsLabel}>
                <i>No matching results...</i> <Emoji symbol="😢" />
              </p>
            )}
          </AnimateSharedLayout>
        </Flex.Row>
      </div>
      <Modal
        in={showTagsModal}
        title="Filter by tech"
        onClose={useCallback(() => {
          setShowTagsModal(false);
          searcher.resetStagedTags();
        }, [searcher.resetStagedTags])}
      >
        <Modal.Body>
          <div className={styles.filterByTech}>
            <Flex.Row wrap>
              {tags.map(tag => (
                <Flex.Item basis="43.4%" className={styles.filterLayerWrapper} key={tag.tagID}>
                  <Flex.Row horizontal="space-between">
                    <Checkbox
                      name="tech-stack"
                      value={tag.tagID!}
                      checked={searcher.stagedTags.includes(tag.tagID!)}
                      onChange={onTechStackChecked}
                    >
                      <Flex.Row horizontal="center">
                        <Spacer orientation="horizontal" size={5} />
                        <GraphCMSImage
                          style={{ width: 24, height: 24 }}
                          fit="crop"
                          image={tag.displayImage}
                          objectFit="contain"
                          alt={tag.displayName}
                        />
                        <Spacer orientation="horizontal" size={10} />
                        <h4>{tag.displayName}</h4>
                      </Flex.Row>
                    </Checkbox>
                  </Flex.Row>
                </Flex.Item>
              ))}
            </Flex.Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Linkable onPress={searcher.clearStagedTags}>Clear All</Linkable>
          <CallToAction onPress={saveTechStackFilter}>Save</CallToAction>
        </Modal.Footer>
      </Modal>
    </>
  );
};

type PostCardProps = PostHit & {
  focusProps: any;
  classNames?: string;
};

export const PostCard: React.FC<PostCardProps> = ({
  slug,
  excerpt,
  title,
  date,
  author,
  type,
  coverImage,
  featured,
  _highlightResult,
  _snippetResult,
  focusProps,
  ...rest
}) => {
  // Used for animating post cards in/out and between positions.
  const getScaleProps = transitions.useScale();
  const shouldReduceMotion = useReducedMotion();

  const cardTitle =
    _highlightResult?.title?.matchLevel === 'full' ? (
      <div
        className={styles.cardTitle}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(_highlightResult?.title?.value) }}
      />
    ) : (
      <div className={styles.cardTitle}>{title}</div>
    );

  const cardDescription =
    _highlightResult?.content?.matchLevel === 'full' ? (
      <div
        className={styles.cardDescription}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(_snippetResult?.content?.value) }}
      />
    ) : (
      <div className={styles.cardDescription}>{excerpt}</div>
    );

  const href = `/posts/${slug}`;

  const formattedDate = new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        layout={shouldReduceMotion ? false : 'position'}
        key={href}
        className={clsx([styles.postsCardEntry, (rest as any)?.classNames])}
        {...focusProps}
        {...getScaleProps(0.9)}
      >
        <GraphCMSImage
          className={clsx(styles.banner, featured && styles.titleColumnd)}
          image={coverImage}
          alt={cardTitle.toString()}
        />
        <div className={styles.info}>
          <div className={styles.cardType}>{type?.displayName}</div>
          {cardTitle}
          {cardDescription}
          <div className={styles.cardDatePublished}>
            {author} · {formattedDate}
          </div>
        </div>
      </motion.a>
    </Link>
  );
};

type LoadMoreCardProps = {
  focusProps: any;
  onClick: () => void;
};

const LoadMoreCard: React.FC<LoadMoreCardProps> = ({ focusProps, onClick }) => {
  // Used for animating post cards in/out and between positions.
  const getScaleProps = transitions.useScale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      layout={shouldReduceMotion ? false : 'position'}
      className={styles.loadMoreCardEntry}
      key="load more"
      onClick={onClick}
      {...focusProps}
      {...getScaleProps(0.9)}
    >
      <div className={styles.label}>Load more</div>
    </motion.button>
  );
};
