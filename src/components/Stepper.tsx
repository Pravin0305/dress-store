
import styles from '../styles/stepper.module.css';

interface StepperProps {
  steps: string[];
  current: number;
  className?: string;
}

function Stepper({ steps, current, className = '' }: StepperProps) {
  return (
    <ol className={`${styles.stepper} ${className}`.trim()} aria-label="Checkout progress">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isComplete = stepNum < current;
        const isLast = stepNum === steps.length;

        return (
          <li
            key={label}
            className={[
              styles.item,
              isActive ? styles.active : '',
              isComplete ? styles.complete : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className={styles.dot} aria-current={isActive ? 'step' : undefined}>
              {isComplete ? <CheckIcon /> : stepNum}
            </span>
            <span className={styles.label}>{label}</span>
            {!isLast && (
              <span
                className={`${styles.line} ${isComplete ? styles.completeLine : ''}`}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default Stepper;
