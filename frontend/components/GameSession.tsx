'use client';

import { useQuery } from '@apollo/client';
import { getMemoTest } from '@/graphql/queries';
import Card from './Card';

const GameSession = ({ gameId }: { gameId: string }) => {
  const { loading, error, data } = useQuery(getMemoTest, {
    variables: { id: gameId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { memoTest } = data;
  console.log('memoTest', memoTest);

  //TODO get pairs from images

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">{memoTest.name}</h2>
      <div className="grid grid-cols-4 gap-4">
        {memoTest?.images.map((image: string) => (
          <Card key={image} image={image} />
        ))}
      </div>
    </div>
  );
};

export default GameSession;
