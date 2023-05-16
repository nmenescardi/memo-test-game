'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { getMemoTest } from '@/graphql/queries';
import Card from './Card';
import { RootState } from '@/store/store';
import { startGame } from '@/features/currentSession/currentSessionSlice';

const GameSession = ({ gameId, isNewGame }: { gameId: string; isNewGame?: boolean | string }) => {
  const dispatch = useDispatch();
  const currentSession = useSelector((state: RootState) => state.currentSession);
  const [game, setGame] = useState({});

  const isNewGameSession = isNewGame === 'false' ? false : Boolean(isNewGame);

  const { loading, error, data } = useQuery(getMemoTest, {
    variables: { id: gameId },
  });

  useEffect(() => {
    if (isNewGameSession) {
      const newGame = {
        gameId,
        boardStatus: [],
      };
      dispatch(startGame(newGame));

      setGame(newGame);
    }
  }, [isNewGameSession, gameId, dispatch]);

  useEffect(() => {
    if (!isNewGameSession) {
      setGame(currentSession);
    }
  }, [isNewGameSession, currentSession]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error :(</p>;

  const { memoTest } = data;

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
