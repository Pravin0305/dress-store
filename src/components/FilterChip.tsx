
import styles from '../styles/filterChip.module.css';

interface FilterChipProps {
  label: string;
  color?: string;
  onRemove: () => void;
  className?: string;
}

function FilterChip({ label, color, onRemove, className = '' }: FilterChipProps) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${className}`.trim()}
      onClick={onRemove}
      aria-label={`Remove filter: ${label}`}
    >
      <span className={styles.label}>
        {color && <span className={styles.dot} style={{ backgroundColor: color }} />}
        {label}
      </span>
      <span className={styles.x} aria-hidden="true">×</span>
    </button>
  );
}

export default FilterChip;
