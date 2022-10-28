import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { VITE_API_URL, VITE_WS_API_URL } from '@nc-core/constants/environment';
import { JWT_TOKEN } from '@nc-core/constants/local-storage';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

export * from './auth';
export * from './messages';
export * from './notifications';
export * from './search';
export * from './user-friends';
export * from './users';

const wsLink = new GraphQLWsLink(
  createClient({
    connectionParams() {
      const jwt = localStorage.getItem(JWT_TOKEN);
      if (!jwt || !jwt.length) return;

      return {
        Authorization: `Bearer ${jwt}`,
      };
    },
    url: VITE_WS_API_URL,
  }),
);

const httpLink = createHttpLink({ uri: VITE_API_URL });

const authLink = setContext((_, { headers }) => {
  const jwt = localStorage.getItem(JWT_TOKEN);

  return {
    headers: {
      ...headers,
      Authorization: jwt ? `Bearer ${jwt}` : undefined,
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client;
