'use client';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider as StoreProvider } from 'react-redux';
import { store, persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const uri = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000/graphql';
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
