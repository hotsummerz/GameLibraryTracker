import type { Game, GameStatus } from '../types';
import StatusBadge from './StatusBadge';
import StarRating from './StarRating';

interface GameCardProps {
  game: Game;
  onDelete: (game: Game) => void;
  onEdit: (game: Game) => void;
  onChangeStatus: (id: string, status: GameStatus) => void;
  onRate: (id: string, rating: number) => void;
}

export default function GameCard({ game, onDelete, onEdit, onChangeStatus, onRate }: GameCardProps) {
  const handleStatusChange = () => {
    if (game.status === 'wishlist') {
      onChangeStatus(game.id, 'playing');
    } else if (game.status === 'playing') {
      onChangeStatus(game.id, 'completed');
    }
    // completed stays completed
  };

  return (
    <li className={`bento-card game-card ${game.status === 'completed' ? 'is-done' : ''}`}>
      <div className="game-cover">
        {game.cover ? (
          <img
            src={game.cover}
            alt={`Cover ${game.title}`}
            width={64}
            height={88}
            loading="lazy"
            className="cover-thumbnail"
          />
        ) : (
          <div className="cover-placeholder" aria-hidden="true">
            <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm9 5l-4 4-2-2-4 5h12l-2-7z" />
            </svg>
          </div>
        )}
      </div>

      <div className="game-body">
        <h3 className="game-title">{game.title}</h3>
        <div className="task-meta">
          <StatusBadge status={game.status} />
          <span className="meta-item">{game.platform}</span>
          {game.genre && <span className="meta-item">{game.genre}</span>}
          {game.hours > 0 && <span className="meta-item meta-hours">{game.hours}h</span>}
        </div>
        <StarRating value={game.rating} onChange={(r) => onRate(game.id, r)} />
        {game.notes && (
          <div className="task-notes">{game.notes}</div>
        )}
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="btn-icon"
          onClick={() => onEdit(game)}
          aria-label="Edit game"
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          type="button"
          className="btn-icon"
          onClick={handleStatusChange}
          aria-label="Ubah status"
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button
          type="button"
          className="btn-icon is-danger"
          onClick={() => onDelete(game)}
          aria-label="Hapus game"
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>
    </li>
  );
}
