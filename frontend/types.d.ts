export interface MemoTest {
  id: string;
  name: string;
  images: string[];
  highestScore: number;
}

export type StatusEnum = 'covered' | 'uncovered' | 'matched';
export interface Card {
  position: number;
  imageUrl: string;
  status: StatusEnum;
}
