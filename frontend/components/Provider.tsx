'use client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '@/store/store';

const uri = process.env.API_URL || 'http://localhost/graphql';
export const Provider = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </StoreProvider>
  );
};
