'use client';

import NextImage from 'next/image';
import { Card as CardType } from '@/types';
import ReactCardFlip from 'react-card-flip';

interface CardProps extends CardType {
  handleClick: (position: number) => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, position, status, handleClick }) => {
  const isFlipped = status === 'uncovered' || status === 'matched';

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div
        key="front"
        className="w-40 h-40 bg-gray-200 flex items-center justify-center cursor-pointer"
        onClick={() => handleClick(position)}
      >
        {position}
      </div>

      <div key="back" className="w-40 h-40 bg-blue-500 flex items-center justify-center relative">
        <NextImage src={imageUrl} alt="card" layout="fill" objectFit="cover" priority={true} />
      </div>
    </ReactCardFlip>
  );
};

export default Card;
