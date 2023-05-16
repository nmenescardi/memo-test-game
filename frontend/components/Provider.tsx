'use client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider as StoreProvider } from 'react-redux';
import { store, persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const uri = process.env.API_URL || 'http://localhost/graphql';
export const Provider = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </PersistGate>
    </StoreProvider>
  );
};
