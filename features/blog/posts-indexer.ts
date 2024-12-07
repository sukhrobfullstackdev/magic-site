/* eslint-disable import/no-extraneous-dependencies */

import { PostMetadataFragment } from 'graphql/generated';
import { getConnection } from 'lib/algolia/clients/admin';
import {
  AlgoliaHit,
  AlgoliaRecord,
  getObjectIDForRecord,
  getRecordsByDistinctAttribute,
  uploadRecords,
} from 'lib/algolia/records';
import type { RichTextRecord } from '../../lib/graphcms/rich-text-indexer';

export const PostsAlgoliaIndex = 'posts_v2';

export type PostRecord = AlgoliaRecord<PostMetadataFragment & RichTextRecord>;
export type PostHit = AlgoliaHit<PostMetadataFragment & RichTextRecord>;

export async function removeObsoleteAlgoliaRecordsForPost(slug: string) {
  const connection = getConnection(PostsAlgoliaIndex);
  const discardableRecords = await getRecordsByDistinctAttribute({
    connection,
    distinctAttribute: 'slug',
    distinction: slug,
  });
  await connection.deleteObjects(discardableRecords.map(obj => obj.objectID)).wait();
}

export async function createAndUploadAlgoliaRecordsForPost(
  post: PostMetadataFragment,
  richTextRecords: RichTextRecord[],
) {
  const alogliaRecords = richTextRecords.map((partialRecord, i) => {
    const result: AlgoliaRecord<PostMetadataFragment> = {
      objectID: getObjectIDForRecord({ slug: post.slug, ...partialRecord, i }),
      ...partialRecord,
      ...post,
      tags: (post as PostMetadataFragment).tags.map((tag: any) => tag?.tagID),
    };

    return result;
  });

  const connection = getConnection(PostsAlgoliaIndex);

  await uploadRecords({
    connection,
    records: alogliaRecords,
    distinctAttribute: 'slug',
    indexSettings: {
      searchableAttributes: ['content', 'title'],
      attributesForFaceting: ['filterOnly(tags)', 'filterOnly(type.typeID)'],
      attributesToSnippet: ['content:20'],
    },
  });
}
