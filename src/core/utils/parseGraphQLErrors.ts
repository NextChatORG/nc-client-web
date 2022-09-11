import { ApolloError } from "@apollo/client";
import { toast } from "react-toastify";

export interface GraphQLFieldError {
  field: string;
  message: string;
}

export interface GraphQLParsedErrors {
  fields: GraphQLFieldError[];
}

export function parseGraphQLErrors({ graphQLErrors, ...errors }: ApolloError): GraphQLParsedErrors {
  const fields: GraphQLFieldError[] = [];

  if (graphQLErrors && graphQLErrors.length > 0) {
    for (let err of graphQLErrors) {
      if (err.extensions.field !== undefined) {
        fields.push({
          field: err.extensions.field as string,
          message: err.message,
        });
      } else {
        switch (err.extensions.code) {
          case 'BAD_USER_INPUT':
          case 'INTERNAL_SERVER_ERROR':
            toast.error(err.message);
            break;

          default:
            console.error('Unknown GraphQL error', err);
            break;
        }
      }
    }
  }

  if (errors.networkError) {
    toast.error(`${errors.networkError.name}: ${errors.networkError.message}`);
  }

  return { fields };
}
