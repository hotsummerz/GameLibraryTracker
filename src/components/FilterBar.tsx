import type { StatusFilter, SortKey, Game } from '../types';

interface FilterBarProps {
  searchText: string;
  statusFilter: StatusFilter;
  sortBy: SortKey;
  games: Game[];
  onSearchChange: (text: string) => void;
  onFilterChange: (filter: StatusFilter) => void;
  onSortChange: (sort: SortKey) => void;
}

export default function FilterBar({
  searchText,
  statusFilter,
  sortBy,
  games,
  onSearchChange,
  onFilterChange,
  onSortChange
}: FilterBarProps) {
  const counts = {
    all: games.length,
    wishlist: games.filter(g => g.status === 'wishlist').length,
    playing: games.filter(g => g.status === 'playing').length,
    completed: games.filter(g => g.status === 'completed').length
  };

  const filters: { key: StatusFilter; label: string }[] = [
    { key: 'all', label: 'Semua' },
    { key: 'wishlist', label: 'Wishlist' },
    { key: 'playing', label: 'Dimainkan' },
    { key: 'completed', label: 'Tamat' }
  ];

  return (
    <div className="toolbar">
      <div className="search-wrapper">
        <label htmlFor="search" className="sr-only">Cari judul game</label>
        <input
          id="search"
          type="search"
          placeholder="Cari judul game..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="filter-tabs" role="group" aria-label="Filter status">
        {filters.map(f => (
          <button
            key={f.key}
            type="button"
            className="filter-tab"
            aria-pressed={statusFilter === f.key}
            onClick={() => onFilterChange(f.key)}
          >
            {f.label} <span className="tab-count">{counts[f.key]}</span>
          </button>
        ))}
      </div>
      <div className="sort-control">
        <label htmlFor="sort" className="sr-only">Urutkan</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
        >
          <option value="newest">Terbaru ditambahkan</option>
          <option value="title">Judul (A-Z)</option>
          <option value="rating">Rating tertinggi</option>
        </select>
      </div>
    </div>
  );
}
