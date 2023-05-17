import { FC, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import { Button } from '@mui/material';

interface EndGameModalProps {
  open: boolean;
  retryCount: number;
  score: number;
  endGameCallback: () => void;
}

const EndGameModal: FC<EndGameModalProps> = ({ open, retryCount, score, endGameCallback }) => {
  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          Congratulations! You finished the game!
        </h2>
        <p id="modal-description" className="text-xl font-bold mb-4">
          Tries: <strong>{retryCount}</strong> | Score: <strong>{score}</strong>
        </p>
        <Link
          onClick={() => {
            endGameCallback();
          }}
          href={{ pathname: '/' }}
          className="mt-10"
        >
          <Button variant="contained">Go Home</Button>
        </Link>
      </div>
    </Modal>
  );
};

export default EndGameModal;
