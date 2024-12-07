/* eslint-disable consistent-return */

import fs from 'fs';
import path from 'path';
import parseFrontmatter from 'gray-matter';
import toc from 'markdown-toc';
import { recursiveReadDir } from '../recursive-readdir';

/**
 * For the given `collection`, return a sorted list of
 * article IDs and their associated frontmatter data.
 *
 * You may adjust the sorting functionality by providing an array
 * of sort functions, in order of precedence, to the `sortBy` field.
 */
export async function getSortedArticleListing({ collection, sortBy = [SortBy.IndexAscending, SortBy.DateAscending] }) {
  const articleIDs = await getArticleIDs({ collection });

  // Get all content datas, including parsed frontmatter and markdown source
  const articleDatas = await Promise.all(
    articleIDs.map(async id => {
      const { frontmatter } = await getArticleData({ collection, id });
      return { id, frontmatter };
    }),
  );

  return articleDatas.sort((a, b) => {
    for (const sorter of Object.values(Array.isArray(sortBy) ? sortBy : [sortBy])) {
      const sortHint = sorter(a, b);
      if (sortHint != null) return sortHint;
    }

    return 0;
  });
}

/**
 * For the given `collection`, return a list of article IDs.
 */
export async function getArticleIDs({ collection }) {
  // Get file names under [root]/content/:collection/*
  const directory = path.join(process.cwd(), 'content', collection);
  const articleListing = await recursiveReadDir(directory);

  // Filter out non-markdown files, strip the file extension,
  // then normalize the path separator to get an article ID.
  return articleListing
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
    .map(id => id.split(path.sep).join('/'));
}

/**
 * For the given `collection` and `id` pairing,
 * return the associated markdown source and frontmatter data.
 */
export async function getArticleData({ collection, id }) {
  // Read markdown file as string
  const fullPath = path.join(process.cwd(), 'content', collection, `${id}.md`);
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');

  // Use `gray-matter` to parse the "frontmatter" metadata
  const { data: frontmatter, content: markdown } = parseFrontmatter(fileContents);

  // Create a data structure to be used for rendering a table-of-contents
  const tableOfContents = toc(markdown).json;

  // Combine the data with the ID and collection
  return {
    id,
    collection,
    markdown,
    frontmatter,
    tableOfContents,
  };
}

export const SortBy = {
  /**
   * Sort by the frontmatter index (smallest to largest), if present.
   */
  IndexAscending: (a, b) => {
    if (a.frontmatter.index != null || b.frontmatter.index != null) {
      return a.frontmatter.index > b.frontmatter.index ? 1 : -1;
    }
  },

  /**
   * Sort by the frontmatter index (largest to smallest), if present.
   */
  IndexDescending: (a, b) => {
    if (a.frontmatter.index != null || b.frontmatter.index != null) {
      return a.frontmatter.index < b.frontmatter.index ? 1 : -1;
    }
  },

  /**
   * Sort by the frontmatter date (oldest to newest), if present.
   */
  DateAscending: (a, b) => {
    if (a.frontmatter.date != null || b.frontmatter.date != null) {
      // @ts-ignore
      return new Date(a.frontmatter.date) - new Date(b.frontmatter.date);
    }
  },

  /**
   * Sort by the frontmatter date (newest to oldest), if present.
   */
  DateDescending: (a, b) => {
    if (a.frontmatter.date != null || b.frontmatter.date != null) {
      // @ts-ignore
      return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
    }
  },
};
