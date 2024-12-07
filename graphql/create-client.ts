import { GraphQLClient as BaseGraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { TypeFromQuery, VariablesFromQuery } from './create-query';

/**
 * An extension of `GraphQLClient` from `graphql-request`
 * decorated with some special typings.
 */
class GraphQLClient extends BaseGraphQLClient {
  rawRequest<T>(query: T, variables?: VariablesFromQuery<T>, requestHeaders?: RequestInit['headers']) {
    return super.rawRequest<TypeFromQuery<T>, VariablesFromQuery<T>>(String(query), variables, requestHeaders);
  }

  request<T>(query: T, variables?: VariablesFromQuery<T>, requestHeaders?: RequestInit['headers']) {
    return super.request<TypeFromQuery<T>, VariablesFromQuery<T>>(String(query), variables, requestHeaders);
  }
}

/**
 * Creates a new GraphQL client.
 */
export function createClient(endpoint: string, options: RequestInit = {}) {
  return new GraphQLClient(endpoint, options);
}
