import {
  DocumentNode,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  TypedDocumentNode,
  useMutation as graphlMutation,
} from '@apollo/client';
import { GraphQLParsedErrors, parseGraphQLErrors } from '@nc-core/utils';

export function useMutation<TData = unknown, TVariables = OperationVariables>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?:
    | (Omit<MutationHookOptions<TData, TVariables>, 'onError'> & {
        onError?: (errors: GraphQLParsedErrors) => void;
      })
    | undefined,
): MutationTuple<TData, TVariables> {
  return graphlMutation<TData, TVariables>(mutation, {
    ...options,
    onError(err) {
      const parsedErrors = parseGraphQLErrors(err);
      if (options?.onError) options.onError(parsedErrors);
    },
  });
}
