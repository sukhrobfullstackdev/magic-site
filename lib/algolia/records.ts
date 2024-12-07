/* eslint-disable import/no-extraneous-dependencies */

import { createHash } from 'crypto';
import { memoize, mergeWith } from 'lodash';
import type { ObjectWithObjectID, Settings, Hit } from '@algolia/client-search';
import type { SearchIndex } from 'algoliasearch';
import { AnyDict } from 'types/util';

export type AlgoliaRecord<T extends AnyDict = AnyDict> = ObjectWithObjectID & T;
export type AlgoliaHit<T extends AnyDict = AnyDict> = Hit<T>;

export async function clearRecords(connection: SearchIndex) {
  await connection.clearObjects().wait();
}

export async function getRecordsByDistinctAttribute<T extends AlgoliaRecord>(options: {
  connection: SearchIndex;
  distinctAttribute: string;
  distinction: string;
  attributesToRetrieve?: string[];
}): Promise<T[]> {
  const { connection, distinctAttribute, distinction, attributesToRetrieve = [] } = options;

  let hits: AlgoliaRecord<T>[] = [];

  await connection.browseObjects({
    query: '', // Empty query will match all records
    filters: `${distinctAttribute}:${distinction}`,
    attributesToRetrieve: [distinctAttribute, ...attributesToRetrieve],
    batch: (batch: ReadonlyArray<ObjectWithObjectID & T>) => {
      hits = hits.concat(batch);
    },
  });

  return hits;
}

export async function uploadRecords<T extends AlgoliaRecord[]>(options: {
  records: T;
  connection: SearchIndex;
  distinctAttribute?: string;
  indexSettings: Omit<Settings, 'attributeForDistinct'>;
}) {
  const { records, connection, distinctAttribute, indexSettings } = options;

  const defaultIndexSettings: Settings = {
    distinct: !!distinctAttribute,
    attributeForDistinct: distinctAttribute,
    attributesForFaceting: distinctAttribute ? [`filterOnly(${distinctAttribute})`] : undefined,
    snippetEllipsisText: '…',
  };

  await connection
    .setSettings(
      mergeWith({}, defaultIndexSettings, indexSettings, (objValue, srcValue) => {
        if (Array.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      }),
    )
    .wait();

  await connection.saveObjects(records).wait();
}

export function getObjectIDForRecord(blob: any) {
  return md5(JSON.stringify(blob));
}

const md5 = memoize(source => {
  return createHash('md5').update(source).digest('hex');
});
