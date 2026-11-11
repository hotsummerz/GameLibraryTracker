interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
}

export default function StarRating({ value, onChange, readOnly = false }: StarRatingProps) {
  const handleClick = (rating: number) => {
    if (readOnly || !onChange) return;
    onChange(rating === value ? 0 : rating);
  };

  const handleKeyDown = (e: React.KeyboardEvent, rating: number) => {
    if (readOnly || !onChange) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(rating);
    }
  };

  return (
    <div className="star-rating" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map(rating => (
        <button
          key={rating}
          type="button"
          className={`star ${rating <= value ? 'is-filled' : ''}`}
          onClick={() => handleClick(rating)}
          onKeyDown={(e) => handleKeyDown(e, rating)}
          disabled={readOnly}
          aria-label={`${rating} dari 5`}
        >
          <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
