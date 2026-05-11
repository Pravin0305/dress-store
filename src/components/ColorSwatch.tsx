
import type { Color } from '../types';
import styles from '../styles/colorSwatch.module.css';

interface ColorSwatchProps {
  color: Color;
  selected?: boolean;
  showLabel?: boolean;
  variant?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

function ColorSwatch({
  color,
  selected = false,
  showLabel = false,
  variant = 'md',
  onClick,
  className = '',
}: ColorSwatchProps) {
  const variantClass = variant === 'md' ? '' : styles[variant];
  const classes = [
    styles.wrap,
    variantClass,
    selected ? styles.selected : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Color ${color.name}${selected ? ', selected' : ''}`}
      title={color.name}
    >
      <span className={styles.dot} style={{ backgroundColor: color.hex }} />
      {showLabel && <span className={styles.label}>{color.name}</span>}
    </button>
  );
}

export default ColorSwatch;
