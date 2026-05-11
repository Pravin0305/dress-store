
import styles from '../styles/sizeChip.module.css';

interface SizeChipProps {
  size: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'sm' | 'md' | 'lg';
  className?: string;
}

function SizeChip({
  size,
  selected = false,
  disabled = false,
  onClick,
  variant = 'md',
  className = '',
}: SizeChipProps) {
  const sizeClass = variant === 'md' ? '' : styles[variant];
  const classes = [
    styles.chip,
    sizeClass,
    selected ? styles.selected : '',
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Size ${size}${selected ? ', selected' : ''}`}
    >
      {size}
    </button>
  );
}

export default SizeChip;
