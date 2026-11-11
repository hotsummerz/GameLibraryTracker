import type { Game } from '../types';
import { calculateStats } from '../utils/stats';

interface StatsBarProps {
  games: Game[];
}

export default function StatsBar({ games }: StatsBarProps) {
  const stats = calculateStats(games);

  return (
    <div className="stats-grid">
      <div className="bento-card stat-card">
        <div className="stat-label">Total Game</div>
        <div className="stat-value">{stats.total}</div>
      </div>
      <div className="bento-card stat-card">
        <div className="stat-label">Sedang Dimainkan</div>
        <div className="stat-value">{stats.playing}</div>
      </div>
      <div className="bento-card stat-card">
        <div className="stat-label">Tamat</div>
        <div className="stat-value">{stats.completed}</div>
      </div>
    </div>
  );
}
