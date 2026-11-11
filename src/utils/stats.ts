import type { Game } from '../types';

export interface Stats {
  total: number;
  playing: number;
  completed: number;
  avgRating: number;
}

export function calculateStats(games: Game[]): Stats {
  const total = games.length;
  const playing = games.filter(g => g.status === 'playing').length;
  const completed = games.filter(g => g.status === 'completed').length;

  const rated = games.filter(g => g.rating > 0);
  const avgRating = rated.length > 0
    ? rated.reduce((sum, g) => sum + g.rating, 0) / rated.length
    : 0;

  return { total, playing, completed, avgRating };
}
