
import type { SortOption } from '../types';
import { SORT_OPTIONS } from '../utils/constants';
import styles from '../styles/sortDropdown.module.css';

type SortId = SortOption['id'];

interface SortDropdownProps {
  value: SortId;
  onChange: (id: SortId) => void;
  options?: SortOption[];
  className?: string;
}

function SortDropdown({
  value,
  onChange,
  options = SORT_OPTIONS,
  className = '',
}: SortDropdownProps) {
  return (
    <label className={`${styles.wrap} ${className}`.trim()}>
      <span className={styles.label}>Sort:</span>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value as SortId)}
        aria-label="Sort products"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronIcon />
    </label>
  );
}

function ChevronIcon() {
  return (
    <svg
      className={styles.chevron}
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

export default SortDropdown;
