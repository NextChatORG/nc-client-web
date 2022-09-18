import {
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResultTuple,
  OperationVariables,
  TypedDocumentNode,
  useLazyQuery as graphqlQuery,
} from '@apollo/client';
import { GraphQLParsedErrors, parseGraphQLErrors } from '@nc-core/utils';

export function useLazyQuery<TData = unknown, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: Omit<LazyQueryHookOptions<TData, TVariables>, 'onError'> & {
    onError?: (errors: GraphQLParsedErrors) => void;
  },
): LazyQueryResultTuple<TData, TVariables> {
  return graphqlQuery(query, {
    ...options,
    onError(err) {
      const parsedErrors = parseGraphQLErrors(err);
      if (options?.onError) options.onError(parsedErrors);
    },
  });
}
