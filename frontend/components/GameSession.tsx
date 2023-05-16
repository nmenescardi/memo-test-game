'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { getMemoTest } from '@/graphql/queries';
import Card from './Card';
import { Card as CardType } from '@/types';
import { RootState } from '@/store/store';
import { startGame } from '@/features/currentSession/currentSessionSlice';
import { createPairs } from '@/lib/createPairs';
import Link from 'next/link';

interface GameSessionProps {
  gameId: string;
  isNewGame?: boolean | string;
}

const GameSession: React.FC<GameSessionProps> = ({ gameId, isNewGame }) => {
  const dispatch = useDispatch();
  const currentSession = useSelector((state: RootState) => state.currentSession);

  const cards = currentSession?.cards;

  const isNewGameSession = isNewGame === 'false' ? false : Boolean(isNewGame);

  const { loading, error, data } = useQuery(getMemoTest, {
    variables: { id: gameId },
  });

  useEffect(() => {
    if (isNewGameSession && data) {
      const cards = createPairs(data?.memoTest?.images);
      const newGame = {
        gameId,
        cards,
      };
      dispatch(startGame(newGame));
    }
  }, [isNewGameSession, gameId, dispatch, data]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error :(</p>;

  const { memoTest } = data;

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Game: {memoTest.name}</h2>

      <div className="grid grid-cols-5 gap-4">
        {cards?.map((card) => (
          <Card key={card.position} {...card} />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center">
        <Link href={{ pathname: '/' }} className="mt-10">
          ← Back Home
        </Link>
      </div>
    </div>
  );
};

export default GameSession;
