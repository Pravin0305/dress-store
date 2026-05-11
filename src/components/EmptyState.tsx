
import type { ReactNode } from 'react';
import Button from './Button';
import styles from '../styles/emptyState.module.css';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message?: string;
  ctaLabel?: string;
  ctaTo?: string;
  className?: string;
}

function EmptyState({
  icon,
  title,
  message,
  ctaLabel,
  ctaTo,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`${styles.empty} ${className}`.trim()}>
      {icon && <div className={styles.iconWrap}>{icon}</div>}
      <h2 className={styles.title}>{title}</h2>
      {message && <p className={styles.message}>{message}</p>}
      {ctaLabel && ctaTo && (
        <Button to={ctaTo} className={styles.cta}>
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
