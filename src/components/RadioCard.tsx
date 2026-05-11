
import type { ReactNode } from 'react';
import styles from '../styles/radioCard.module.css';

interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
}

function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  subtitle,
  icon,
  disabled = false,
  className = '',
}: RadioCardProps) {
  return (
    <label
      className={[
        styles.card,
        checked ? styles.selected : '',
        disabled ? styles.disabled : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className={styles.input}
      />
      <span className={styles.radio} aria-hidden="true">
        <span className={styles.dot} />
      </span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </span>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
    </label>
  );
}

export default RadioCard;
