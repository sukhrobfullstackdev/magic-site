import { gql } from 'graphql-request';
import { Nominal } from 'types/util';

export type Query<T = any, V extends Variables = Variables> = Nominal<string, 'query'>;
export type VariablesFromQuery<T> = T extends Query<any, infer U> ? U : never;
export type TypeFromQuery<T> = T extends Query<infer U> ? U : never;
export type Variables = Record<string, any>;

/**
 * Creates a GraphQL query string encoded with type information.
 */
export function createQuery<T = any, V extends Variables = Variables>(query: string) {
  return query as Query<T, V>;
}

export { gql };
