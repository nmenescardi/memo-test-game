'use client';
import { Button } from '@mui/material';
import { MemoTest as MemoTestType } from '@/types';

type MemoTestProps = {
  memoTest: MemoTestType;
};

export const MemoTest: React.FC<MemoTestProps> = ({ memoTest }) => {
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h2 className="text-xl font-semibold">{memoTest.name}</h2>
        <p>{memoTest.highestScore ? `Highest score:  ${memoTest.highestScore}` : null}</p>
      </div>
      <div>
        <Button variant="contained">Start</Button>
      </div>
    </div>
  );
};
