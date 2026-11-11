export type GameStatus = 'wishlist' | 'playing' | 'completed';
export type StatusFilter = 'all' | GameStatus;
export type SortKey = 'newest' | 'title' | 'rating';

export interface Game {
  id: string;
  title: string;
  platform: string;
  genre: string;
  status: GameStatus;
  rating: number;
  hours: number;
  notes: string;
  cover?: string;
  createdAt: number;
}
