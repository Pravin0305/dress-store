
import styles from '../styles/spinner.module.css';

type Size = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: Size;
  label?: string;
  block?: boolean;
  className?: string;
}

function Spinner({ size = 'md', label = 'Loading', block = false, className = '' }: SpinnerProps) {
  const dot = (
    <span
      role="status"
      aria-label={label}
      className={`${styles.spinner} ${styles[size]} ${className}`.trim()}
    />
  );
  if (block) {
    return <div className={styles.wrap}>{dot}</div>;
  }
  return dot;
}

export default Spinner;
