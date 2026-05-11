
import type { ReactNode } from 'react';
import styles from '../styles/badge.module.css';

export type BadgeVariant =
  | 'neutral'
  | 'accent'
  | 'sale'
  | 'success'
  | 'muted'
  | 'softAccent'
  | 'softDanger';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

function Badge({ variant = 'neutral', className = '', children }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`.trim()}>
      {children}
    </span>
  );
}

export default Badge;
