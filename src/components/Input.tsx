
import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from '../styles/input.module.css';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'children'> {
  label?: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  leftIcon?: ReactNode;
  rightAdornment?: ReactNode;
}

function Input({
  label,
  error,
  hint,
  required,
  optional,
  leftIcon,
  rightAdornment,
  id,
  className,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error
    ? `${inputId}-err`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div
      className={`${styles.field} ${error ? styles.error : ''} ${className ?? ''}`.trim()}
    >
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          <span>
            {label}
            {required && <span className={styles.required} aria-hidden="true">*</span>}
          </span>
          {optional && <span className={styles.optional}>Optional</span>}
        </label>
      )}

      <div className={styles.wrap}>
        {leftIcon && (
          <span className={styles.iconLeft} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={styles.input}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {rightAdornment && (
          <span className={styles.iconRight}>{rightAdornment}</span>
        )}
      </div>

      {error ? (
        <p id={`${inputId}-err`} className={styles.errorMsg} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
