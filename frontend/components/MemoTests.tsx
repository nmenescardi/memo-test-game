'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { getMemoTests } from '@/graphql/queries';
import { MemoTest } from '@/components/MemoTest';
import { MemoTest as MemoTestType } from '@/types';

export default function MemoTests() {
  const { loading, error, data } = useQuery(getMemoTests);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  const memoTests: MemoTestType[] = data.memoTests;

  return (
    <div className="bg-white rounded shadow-md p-6 w-full md:w-3/4 lg:w-1/2">
      <h1 className="text-xl mb-4">Select a game to start playing: </h1>
      {memoTests?.map((memoTest) => (
        <MemoTest key={memoTest.id} memoTest={memoTest} />
      ))}
    </div>
  );
}
