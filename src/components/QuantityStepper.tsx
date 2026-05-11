
import styles from '../styles/quantityStepper.module.css';

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  label,
  size = 'md',
  disabled = false,
  className = '',
}: QuantityStepperProps) {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));

  function dec() {
    if (disabled) return;
    onChange(clamp(value - step));
  }

  function inc() {
    if (disabled) return;
    onChange(clamp(value + step));
  }

  return (
    <div className={`${styles.wrap} ${className}`.trim()}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={`${styles.stepper} ${size === 'sm' ? styles.sm : ''}`.trim()}>
        <button
          type="button"
          className={styles.btn}
          onClick={dec}
          disabled={disabled || value <= min}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className={styles.value} aria-live="polite">{value}</span>
        <button
          type="button"
          className={styles.btn}
          onClick={inc}
          disabled={disabled || value >= max}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default QuantityStepper;
