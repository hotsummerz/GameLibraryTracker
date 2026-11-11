import type { Game, StatusFilter, SortKey } from '../types';

export function filterByStatus(games: Game[], filter: StatusFilter): Game[] {
  if (filter === 'all') return games;
  return games.filter(g => g.status === filter);
}

export function searchGames(games: Game[], query: string): Game[] {
  if (!query.trim()) return games;
  const lower = query.toLowerCase();
  return games.filter(g =>
    g.title.toLowerCase().includes(lower) ||
    g.platform.toLowerCase().includes(lower) ||
    g.genre.toLowerCase().includes(lower)
  );
}

export function sortGames(games: Game[], sortBy: SortKey): Game[] {
  const copy = [...games];
  switch (sortBy) {
    case 'newest':
      return copy.sort((a, b) => b.createdAt - a.createdAt);
    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title, 'id'));
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
  }
}

export function applyFilters(
  games: Game[],
  searchText: string,
  statusFilter: StatusFilter,
  sortBy: SortKey
): Game[] {
  let result = games;
  result = filterByStatus(result, statusFilter);
  result = searchGames(result, searchText);
  result = sortGames(result, sortBy);
  return result;
}
