import { Card } from '@/types';

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function createPairs(images: string[]): Card[] {
  let cards: Card[] = [];
  let pairImages = [...images, ...images];

  pairImages = shuffleArray(pairImages);

  pairImages.forEach((imageUrl, index) => {
    cards.push({
      position: index + 1,
      imageUrl: imageUrl,
      status: 'covered',
      isFlipped: false,
    });
  });

  return cards;
}
