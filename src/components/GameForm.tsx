import { useState, useEffect } from 'react';
import type { Game, GameStatus } from '../types';
import StarRating from './StarRating';
import CoverUpload from './CoverUpload';

interface GameFormProps {
  onAdd: (game: Game) => void;
  onUpdate: (game: Game) => void;
  editingGame: Game | null;
  onCancelEdit: () => void;
}

export default function GameForm({ onAdd, onUpdate, editingGame, onCancelEdit }: GameFormProps) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState<GameStatus>('wishlist');
  const [hours, setHours] = useState(0);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [cover, setCover] = useState<string | undefined>();
  const [titleError, setTitleError] = useState('');
  const [coverError, setCoverError] = useState('');

  // Load editing game data
  useEffect(() => {
    if (editingGame) {
      setTitle(editingGame.title);
      setPlatform(editingGame.platform);
      setGenre(editingGame.genre);
      setStatus(editingGame.status);
      setHours(editingGame.hours);
      setRating(editingGame.rating);
      setNotes(editingGame.notes);
      setCover(editingGame.cover);
      setTitleError('');
      setCoverError('');
    }
  }, [editingGame]);

  const resetForm = () => {
    setTitle('');
    setPlatform('PC');
    setGenre('');
    setStatus('wishlist');
    setHours(0);
    setRating(0);
    setNotes('');
    setCover(undefined);
    setTitleError('');
    setCoverError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError('Judul game wajib diisi');
      return;
    }

    if (editingGame) {
      // Update existing game
      const updatedGame: Game = {
        ...editingGame,
        title: title.trim(),
        platform,
        genre: genre.trim(),
        status,
        rating,
        hours: Math.max(0, hours),
        notes: notes.trim(),
        cover
      };
      onUpdate(updatedGame);
      resetForm();
    } else {
      // Add new game
      const newGame: Game = {
        id: crypto.randomUUID(),
        title: title.trim(),
        platform,
        genre: genre.trim(),
        status,
        rating,
        hours: Math.max(0, hours),
        notes: notes.trim(),
        cover,
        createdAt: Date.now()
      };
      onAdd(newGame);
      resetForm();
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="title">Judul Game</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError('');
            }}
            aria-invalid={!!titleError}
            placeholder="Masukkan judul game"
          />
          {titleError && <div className="field-error" role="alert">{titleError}</div>}
        </div>

        <div className="form-field">
          <label htmlFor="platform">Platform</label>
          <select id="platform" value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="PC">PC</option>
            <option value="Mobile">Mobile</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo">Nintendo</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="genre">Genre <span className="optional">(opsional)</span></label>
          <input
            id="genre"
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Action, RPG, Strategy, dll"
          />
        </div>

        <div className="form-field">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value as GameStatus)}>
            <option value="wishlist">Wishlist</option>
            <option value="playing">Sedang Dimainkan</option>
            <option value="completed">Tamat</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="hours">Jam Main <span className="optional">(opsional)</span></label>
          <input
            id="hours"
            type="number"
            min="0"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
        </div>

        <div className="form-field">
          <label>Rating <span className="optional">(opsional)</span></label>
          <StarRating value={rating} onChange={setRating} />
        </div>

        <div className="form-field field-full">
          <label htmlFor="cover">Cover <span className="optional">(opsional)</span></label>
          <CoverUpload value={cover} onChange={setCover} onError={setCoverError} />
          {coverError && <div className="field-error" role="alert">{coverError}</div>}
        </div>

        <div className="form-field field-full">
          <label htmlFor="notes">Catatan <span className="optional">(opsional)</span></label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Kesan, progress, atau catatan lainnya"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14m7-7H5" />
          </svg>
          {editingGame ? 'Update Game' : 'Tambah Game'}
        </button>
        {editingGame && (
          <button type="button" className="btn-secondary" onClick={handleCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
