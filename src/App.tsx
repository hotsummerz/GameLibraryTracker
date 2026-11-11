import { useState } from 'react';
import type { Game, GameStatus, StatusFilter, SortKey } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { applyFilters } from './utils/filterSort';
import { seedGames } from './data/seed';
import { config } from './config';
import Navbar from './components/Navbar';
import PageHeader from './components/PageHeader';
import StatsBar from './components/StatsBar';
import GameForm from './components/GameForm';
import FilterBar from './components/FilterBar';
import GameList from './components/GameList';
import Footer from './components/Footer';
import ConfirmDialog from './components/ConfirmDialog';

function App() {
  const [games, setGames] = useLocalStorage<Game[]>('game-library', seedGames);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortKey>('newest');
  const [gameToDelete, setGameToDelete] = useState<Game | null>(null);

  const visibleGames = applyFilters(games, searchText, statusFilter, sortBy);

  const handleAddGame = (game: Game) => {
    setGames([game, ...games]);
  };

  const handleDeleteGame = (game: Game) => {
    setGameToDelete(game);
  };

  const handleConfirmDelete = () => {
    if (gameToDelete) {
      setGames(games.filter(g => g.id !== gameToDelete.id));
      setGameToDelete(null);
    }
  };

  const handleChangeStatus = (id: string, status: GameStatus) => {
    setGames(games.map(g => g.id === id ? { ...g, status } : g));
  };

  const handleRate = (id: string, rating: number) => {
    setGames(games.map(g => g.id === id ? { ...g, rating } : g));
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Lewati ke konten utama</a>

      <Navbar
        appName={config.appName}
        studentName={config.studentName}
        nim={config.studentNim}
        profileUrl={config.profileUrl}
      />

      <main id="main-content">
        <div className="container">
          <PageHeader
            title="Daftar Game"
            subtitle="Catat dan pantau koleksi game-mu dalam satu tempat."
          />

          <section id="ringkasan" className="section-block">
            <div className="section-header">
              <h2>Ringkasan</h2>
            </div>
            <StatsBar games={games} />
          </section>

          <section id="tambah" className="section-block">
            <div className="section-header">
              <h2>Tambah Game</h2>
            </div>
            <div className="bento-card">
              <GameForm onAdd={handleAddGame} />
            </div>
          </section>

          <section id="daftar" className="section-block">
            <div className="section-header">
              <h2>Daftar Game</h2>
            </div>
            <FilterBar
              searchText={searchText}
              statusFilter={statusFilter}
              sortBy={sortBy}
              games={games}
              onSearchChange={setSearchText}
              onFilterChange={setStatusFilter}
              onSortChange={setSortBy}
            />
            <GameList
              games={visibleGames}
              allGames={games}
              onDelete={handleDeleteGame}
              onChangeStatus={handleChangeStatus}
              onRate={handleRate}
            />
          </section>
        </div>
      </main>

      <Footer
        studentName={config.studentName}
        nim={config.studentNim}
        courseName={config.courseName}
      />

      <ConfirmDialog
        open={gameToDelete !== null}
        title="Hapus game ini?"
        message={gameToDelete ? `"${gameToDelete.title}" akan dihapus secara permanen.` : ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setGameToDelete(null)}
      />
    </>
  );
}

export default App;
