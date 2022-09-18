import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery as graphqlQuery,
} from '@apollo/client';
import { GraphQLParsedErrors, parseGraphQLErrors } from '@nc-core/utils';

export function useQuery<TData = unknown, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: Omit<QueryHookOptions<TData, TVariables>, 'onError'> & {
    onError?: (errors: GraphQLParsedErrors) => void;
  },
): QueryResult<TData, TVariables> {
  return graphqlQuery(query, {
    ...options,
    onError(err) {
      const parsedErrors = parseGraphQLErrors(err);
      if (options?.onError) options.onError(parsedErrors);
    },
  });
}
