'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { getMemoTest } from '@/graphql/queries';
import { createGameSession, endGameSession, updateGameSession } from '@/graphql/mutations';
import Card from './Card';
import EndGameModal from './EndGameModal';
import { StatusEnum } from '@/types';
import { RootState } from '@/store/store';
import { startGame } from '@/features/currentSession/currentSessionSlice';
import { createPairs } from '@/lib/createPairs';
import Link from 'next/link';
import { modifyStatus, incrementRetryCount, endGame } from '@/features/currentSession/currentSessionSlice';
import calculateScore from '@/lib/calculateScore';

interface GameSessionProps {
  gameId: string;
  isNewGame?: boolean | string;
}

const GameSession: React.FC<GameSessionProps> = ({ gameId, isNewGame }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.currentSession.cards);
  const retryCount = useSelector((state: RootState) => state.currentSession.retryCount);
  const sessionId = useSelector((state: RootState) => state.currentSession.sessionId);

  const score = calculateScore(retryCount, cards.length);
  const [modalOpen, setModalOpen] = useState(false);

  const [createSession] = useMutation(createGameSession);
  const [endSession] = useMutation(endGameSession);
  const [updateSession] = useMutation(updateGameSession);

  const flippedCards = useRef<number[]>([]);

  const isNewGameSession = isNewGame === 'false' ? false : Boolean(isNewGame);

  const { loading, error, data } = useQuery(getMemoTest, {
    variables: { id: gameId },
  });

  const handleClick = async (position: number) => {
    if (flippedCards.current.length === 0) {
      flippedCards.current = [position];
      dispatch(modifyStatus({ position, status: 'uncovered' }));
    } else if (flippedCards.current.length === 1) {
      const first = flippedCards.current[0];

      flippedCards.current.push(position);
      dispatch(modifyStatus({ position, status: 'uncovered' }));

      // Increment count
      await updateSession({
        variables: {
          input: {
            id: sessionId,
            retries: retryCount + 1,
          },
        },
      });
      dispatch(incrementRetryCount());

      // Dispatch an async function after a delay to give user time to see the cards
      setTimeout(() => {
        let status: StatusEnum;
        if (cards[first - 1]?.imageUrl === cards[position - 1]?.imageUrl) {
          status = 'matched';
        } else {
          status = 'covered';
        }

        dispatch(modifyStatus({ position: first, status }));
        dispatch(modifyStatus({ position, status }));

        flippedCards.current = [];
      }, 800);
    }
  };

  useEffect(() => {
    if (isNewGameSession && data) {
      const cards = createPairs(data?.memoTest?.images);

      const handleCreateSession = async () => {
        try {
          const response = await createSession({
            variables: {
              input: {
                memo_test_id: data?.memoTest?.id,
                retries: 0,
                number_of_pairs: data?.memoTest?.images.length,
                state: 'Started',
                user_id: 1,
              },
            },
          });

          const newGame = {
            gameId,
            cards,
            sessionId: response.data.createGameSession.id,
          };

          dispatch(startGame(newGame));
        } catch (error) {
          console.error(error);
          // TODO: Add UI error indicator and CTA to retry
        }
      };

      handleCreateSession();
    }
  }, [isNewGameSession, gameId, dispatch, data, createSession]);

  const allCardsMatched = cards.length > 0 && cards.every((card) => card.status === 'matched');

  const endGameCallback = useCallback(async () => {
    try {
      await endSession({
        variables: {
          input: {
            id: sessionId,
            state: 'Completed',
          },
        },
      });

      dispatch(endGame());
    } catch (error) {
      console.error(error);
      // TODO: Add UI error indicator and CTA to retry
    }
  }, [dispatch, sessionId, endSession]);

  useEffect(() => {
    if (allCardsMatched) {
      setModalOpen(true);
    }
  }, [allCardsMatched, dispatch]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error :(</p>;

  const { memoTest } = data;

  return (
    <>
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

      <EndGameModal open={modalOpen} retryCount={retryCount} score={score} endGameCallback={endGameCallback} />
    </>
  );
};

export default GameSession;
