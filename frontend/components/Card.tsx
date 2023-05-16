'use client';

import { useState } from 'react';
import Image from 'next/image';

const Card = ({ image }: { image: string }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-16 h-16 bg-gray-200 flex items-center justify-center ${flipped ? 'bg-blue-500' : ''}`}
    >
      {flipped ? <Image src={image} alt="card" width="64" height="64" /> : <div>Card</div>}
    </div>
  );
};

export default Card;
