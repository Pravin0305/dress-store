
import { useState } from 'react';
import type { ReactNode } from 'react';
import styles from '../styles/filterSection.module.css';

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  activeCount?: number;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
  activeCount,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.section} ${open ? styles.open : ''}`.trim()}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={styles.header}
        aria-expanded={open}
      >
        <span className={styles.title}>
          {title}
          {typeof activeCount === 'number' && activeCount > 0 && (
            <span className={styles.counter}>{activeCount}</span>
          )}
        </span>
        <ChevronIcon className={styles.icon} />
      </button>
      {open && <div className={styles.body}>{children}</div>}
    </div>
  );
}

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default FilterSection;
