/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */

import { pickBy, uniq } from 'lodash';
import { useAlgolia as useAlgoliaImpl } from 'use-algolia';
import { ALGOLIA_APP_ID, ALGOLIA_API_KEY } from 'constants/config';
import { SearchOptions } from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';
import React, { useState, useCallback, useEffect } from 'react';
import { useDebounced, useEffectAfterMount } from 'usable-react';
import type { TextField } from '@magiclabs/ui';
import { useRouter } from 'next/router';
import { appendEnvToIndex } from '../append-env-to-index';

export function useAlgolia<T = any>(index: string, initialRequest?: RequestOptions & SearchOptions) {
  return useAlgoliaImpl<T>(ALGOLIA_APP_ID, ALGOLIA_API_KEY, appendEnvToIndex(index), initialRequest);
}

export function useSearcher<T = any>(options: {
  index: string;
  tagsAttribute: string;
  filter?: string;
  debounceTimeout?: number;
  searchOptions?: RequestOptions & SearchOptions;
}) {
  const { index, tagsAttribute, filter, searchOptions, debounceTimeout = 1000 } = options;

  // We effectively disable the initial query by returning zero hits per page from Algolia.
  const [searchState, requestDispatch, getMore] = useAlgolia<T>(index);

  const router = useRouter();

  // Search term state & callbacks
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermDebounced = useDebounced(searchTerm, isSearching ? debounceTimeout : 0);
  const updateSearchTerm = useCallback(event => setSearchTerm(event.target.value), []);
  const clearSearchTerm = useCallback(() => setSearchTerm(''), []);

  // Tags state & callbacks
  const [tags, setTags] = useState<string[]>([]);
  const [stagedTags, setStagedTags] = useState<string[]>([]);
  const addStagedTag = useCallback((tag: string) => setStagedTags(uniq([...stagedTags, tag])), [stagedTags]);
  const removeStagedTag = useCallback(
    (tag: string) => setStagedTags(uniq(stagedTags.filter(t => t !== tag))),
    [stagedTags],
  );
  const saveStagedTags = useCallback(() => setTags([...stagedTags]), [stagedTags]);
  const clearStagedTags = useCallback(() => setStagedTags([]), []);
  const resetStagedTags = useCallback(() => setStagedTags([...tags]), [tags]);

  // Search executor
  const executeSearch = useCallback(() => {
    const tagsFilter = (tags || []).map(i => `${tagsAttribute}:${i}`).join(' OR ');

    if (searchTerm.length || tagsFilter.length) {
      requestDispatch({
        query: searchTerm,
        filters: filter ? (tagsFilter.length ? `(${tagsFilter}) AND (${filter})` : filter) : tagsFilter,
        hitsPerPage: 12,
        ...searchOptions,
      });
    }
  }, [searchOptions, searchTerm, tags, filter, tagsAttribute]);

  // `TextField` props for a search input
  const textFieldProps: Partial<React.ComponentProps<typeof TextField>> = {
    value: searchTerm,
    onChange: updateSearchTerm,
    onFocus: useCallback(() => setIsSearching(true), []),
    onBlur: useCallback(() => setIsSearching(false), []),
  };

  // Update URL query with search term + tech stack filters.
  useEffectAfterMount(() => {
    if (!searchTerm && !tags.length) {
      router.replace(window.location.pathname, undefined, { shallow: true });
    } else {
      router.push(
        {
          query: pickBy({
            search: searchTerm,
            tags: tags.join(','),
          }),
        },
        undefined,
        { shallow: true },
      );
    }
  }, [searchTermDebounced, tags]);

  // Update search state when new search terms are added to the URL query.
  useEffectAfterMount(() => {
    executeSearch();
  }, [router.query]);

  // Upon `router.isReady`, we must consume the current search query (if any)
  // from `router.query` because NextJS automatic static optimization injects
  // an empty query object upon first render.
  useEffectAfterMount(() => {
    const qSearch = router.query.search ?? '';
    const qTags = router.query.tags ?? undefined;

    const nextSearchTerm = Array.isArray(qSearch) ? qSearch[0] : qSearch;
    const nextTags = Array.isArray(qTags) ? qTags[0].split(',') : qTags?.split(',') ?? [];

    setSearchTerm(nextSearchTerm);
    setStagedTags(nextTags);
    setTags(nextTags);
  }, [router.isReady]);

  const [hits, setHits] = useState<typeof searchState.hits>([]);
  useEffect(() => {
    if (!!searchState.response?.params.includes('query=') || searchState.response?.params.includes('filters=')) {
      setHits(searchState.response.hits);
    }
  }, [searchState.hits]);

  return {
    // Tags-related state & callbacks
    tags,
    stagedTags,
    addStagedTag,
    removeStagedTag,
    saveStagedTags,
    resetStagedTags,
    clearStagedTags,

    // Search term-related state & callbacks
    searchTerm,
    searchTermDebounced,
    clearSearchTerm,

    // `TextField` related props
    textFieldProps,

    // Algolia executor & results state
    hits,
    execute: executeSearch,
    hasMore: searchState.hasMore,
    getMore,

    // Indicates if an active search is in progress
    isActive:
      (!!searchTermDebounced.length || tags.length) &&
      (!!searchState.response?.params.includes('query=') || searchState.response?.params.includes('filters=')),
  };
}
