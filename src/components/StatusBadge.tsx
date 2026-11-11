import type { GameStatus } from '../types';

interface StatusBadgeProps {
  status: GameStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const labels: Record<GameStatus, string> = {
    wishlist: 'Wishlist',
    playing: 'Dimainkan',
    completed: 'Tamat'
  };

  const classes: Record<GameStatus, string> = {
    wishlist: 'badge-blue',
    playing: 'badge-warning',
    completed: 'badge-success'
  };

  return (
    <span className={`badge ${classes[status]}`}>
      {labels[status]}
    </span>
  );
}
