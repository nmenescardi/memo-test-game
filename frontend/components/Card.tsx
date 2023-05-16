'use client';

import Image from 'next/image';
import { Card as CardType } from '@/types';

interface CardProps extends CardType {
  handleClick: (position: number) => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, position, status, handleClick }) => {
  return (
    <div
      className={`w-16 h-16 bg-gray-200 flex items-center justify-center ${
        status === 'uncovered' ? 'bg-blue-500' : ''
      }`}
    >
      {status === 'uncovered' || status === 'matched' ? (
        <Image src={imageUrl} alt="card" width="64" height="64" />
      ) : (
        <div
          className="w-full h-full flex justify-center items-center cursor-pointer"
          onClick={() => handleClick(position)}
        >
          {position}
        </div>
      )}
    </div>
  );
};

export default Card;
