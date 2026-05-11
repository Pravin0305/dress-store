
import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import styles from '../styles/select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
}

function Select({
  label,
  error,
  required,
  placeholder,
  options,
  id,
  className,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className={`${styles.field} ${error ? styles.error : ''} ${className ?? ''}`.trim()}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          <span>
            {label}
            {required && <span className={styles.required} aria-hidden="true">*</span>}
          </span>
        </label>
      )}

      <div className={styles.wrap}>
        <select
          id={selectId}
          className={styles.select}
          required={required}
          aria-invalid={error ? true : undefined}
          {...rest}
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronIcon />
      </div>

      {error && (
        <p className={styles.errorMsg} role="alert">{error}</p>
      )}
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      className={styles.chevron}
      width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default Select;
