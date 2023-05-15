'use client';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const uri = process.env.API_URL || 'http://localhost/graphql';
export const Provider = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
