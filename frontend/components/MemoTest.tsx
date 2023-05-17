'use client';
import React from 'react';
import { Button } from '@mui/material';
import { MemoTest as MemoTestType } from '@/types';
import Link from 'next/link';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

type MemoTestProps = {
  memoTest: MemoTestType;
};

export const MemoTest: React.FC<MemoTestProps> = ({ memoTest }) => {
  const currentSession = useSelector((state: RootState) => state.currentSession);

  const isOngoingSession = currentSession && currentSession.gameId === memoTest.id;

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h2 className="text-xl font-semibold">{memoTest.name}</h2>
        <p>{memoTest.highestScore ? `Highest score: ${memoTest.highestScore}` : null}</p>
      </div>
      <div>
        <Link href={{ pathname: `/game/${memoTest.id}`, query: { isNewGame: true } }}>
          <Button variant="contained">Start</Button>
        </Link>

        {isOngoingSession && (
          <span className="ml-3">
            <Link href={{ pathname: `/game/${memoTest.id}`, query: { isNewGame: false } }}>
              <Button variant="contained">Continue</Button>
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};
