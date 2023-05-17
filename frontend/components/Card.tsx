'use client';

import NextImage from 'next/image';
import { Card as CardType } from '@/types';

interface CardProps extends CardType {
  handleClick: (position: number) => void;
}
const Card: React.FC<CardProps> = ({ imageUrl, position, status, handleClick }) => {
  const shouldShowImage = status === 'uncovered' || status === 'matched';

  return (
    <div
      className={`w-40 h-40 bg-gray-200 flex items-center justify-center relative ${
        status === 'uncovered' ? 'bg-blue-500' : ''
      }`}
    >
      <NextImage
        src={imageUrl}
        alt="card"
        fill
        style={{ objectFit: 'cover', display: shouldShowImage ? 'initial' : 'none' }}
        priority={true}
      />
      {!shouldShowImage && (
        <div
          className="w-full h-full flex justify-center items-center cursor-pointer text-xl bg-gray-200"
          onClick={() => handleClick(position)}
        >
          {position}
        </div>
      )}
    </div>
  );
};

export default Card;
