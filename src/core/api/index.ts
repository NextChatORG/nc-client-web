import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { VITE_API_URL } from '@nc-core/constants/environment';
import { JWT_TOKEN } from '@nc-core/constants/local-storage';

export * from './auth';
export * from './messages';
export * from './search';
export * from './user';

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
