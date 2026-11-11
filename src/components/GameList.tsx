import type { Game, GameStatus } from '../types';
import GameCard from './GameCard';

interface GameListProps {
  games: Game[];
  allGames: Game[];
  onDelete: (game: Game) => void;
  onEdit: (game: Game) => void;
  onChangeStatus: (id: string, status: GameStatus) => void;
  onRate: (id: string, rating: number) => void;
}

export default function GameList({ games, allGames, onDelete, onEdit, onChangeStatus, onRate }: GameListProps) {
  if (allGames.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada game. Tambahkan game pertamamu di atas.</p>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="empty-state">
        <p>Tidak ada game yang cocok dengan pencarian atau filter.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {games.map(game => (
        <GameCard
          key={game.id}
          game={game}
          onDelete={onDelete}
          onEdit={onEdit}
          onChangeStatus={onChangeStatus}
          onRate={onRate}
        />
      ))}
    </ul>
  );
}
