
import { formatCount, formatRating } from '../utils/formatters';
import styles from '../styles/rating.module.css';

interface RatingProps {
  value: number;
  max?: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

function Rating({
  value,
  max = 5,
  count,
  size = 'md',
  showValue = false,
  className = '',
}: RatingProps) {
  const clamped = Math.max(0, Math.min(max, value));
  const percent = (clamped / max) * 100;
  const stars = '★'.repeat(max);

  return (
    <span
      className={`${styles.rating} ${styles[size]} ${className}`.trim()}
      aria-label={`Rated ${clamped} out of ${max}${count ? `, ${count} reviews` : ''}`}
    >
      {showValue && <span className={styles.value}>{formatRating(clamped)}</span>}
      <span className={styles.stars} aria-hidden="true">
        {stars}
        <span className={styles.starsFill} style={{ width: `${percent}%` }}>
          {stars}
        </span>
      </span>
      {typeof count === 'number' && (
        <span className={styles.count}>({formatCount(count)})</span>
      )}
    </span>
  );
}

export default Rating;
