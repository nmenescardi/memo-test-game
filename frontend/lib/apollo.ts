import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.API_URL;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
