export interface MemoTest {
  id: string;
  name: string;
  images: string[];
  highestScore: number;
}

export interface Card {
  position: number;
  imageUrl: string;
  status: 'covered' | 'uncovered' | 'matched';
}
