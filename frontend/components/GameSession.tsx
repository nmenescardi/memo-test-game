'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { getMemoTest } from '@/graphql/queries';
import Card from './Card';
import { StatusEnum } from '@/types';
import { RootState } from '@/store/store';
import { startGame } from '@/features/currentSession/currentSessionSlice';
import { createPairs } from '@/lib/createPairs';
import Link from 'next/link';
import { modifyStatus, incrementRetryCount } from '@/features/currentSession/currentSessionSlice';
import calculateScore from '@/lib/calculateScore';

interface GameSessionProps {
  gameId: string;
  isNewGame?: boolean | string;
}

const GameSession: React.FC<GameSessionProps> = ({ gameId, isNewGame }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.currentSession.cards);
  const retryCount = useSelector((state: RootState) => state.currentSession.retryCount);
  const score = calculateScore(retryCount, cards.length);

  const flippedCards = useRef<number[]>([]);

  const isNewGameSession = isNewGame === 'false' ? false : Boolean(isNewGame);

  const { loading, error, data } = useQuery(getMemoTest, {
    variables: { id: gameId },
  });

  const handleClick = (position: number) => {
    if (flippedCards.current.length === 0) {
      flippedCards.current = [position];
      dispatch(modifyStatus({ position, status: 'uncovered' }));
    } else if (flippedCards.current.length === 1) {
      const first = flippedCards.current[0];

      flippedCards.current.push(position);
      dispatch(modifyStatus({ position, status: 'uncovered' }));

      // Dispatch an async function after a delay to give user time to see the cards
      setTimeout(() => {
        let status: StatusEnum;
        if (cards[first - 1]?.imageUrl === cards[position - 1]?.imageUrl) {
          status = 'matched';
        } else {
          status = 'covered';
        }

        dispatch(incrementRetryCount());

        dispatch(modifyStatus({ position: first, status }));
        dispatch(modifyStatus({ position, status }));

        flippedCards.current = [];
      }, 200);
    }
  };

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
      <p className="text-xl font-bold mb-4">
        Tries: <strong>{retryCount}</strong> | Score: <strong>{score}</strong>
      </p>

      <div className="grid grid-cols-5 gap-4">
        {cards?.map((card) => (
          <Card key={card.position} handleClick={handleClick} {...card} />
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
