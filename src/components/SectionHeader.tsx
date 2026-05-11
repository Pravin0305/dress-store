
import { Link } from 'react-router-dom';
import styles from '../styles/sectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaTo?: string;
  align?: 'start' | 'center';
  className?: string;
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaTo,
  align = 'start',
  className = '',
}: SectionHeaderProps) {
  return (
    <header
      className={`${styles.header} ${align === 'center' ? styles.center : ''} ${className}`.trim()}
    >
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <div className={styles.row}>
        <h2 className={styles.title}>{title}</h2>
        {ctaLabel && ctaTo && (
          <Link to={ctaTo} className={styles.cta}>
            {ctaLabel} →
          </Link>
        )}
      </div>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
}

export default SectionHeader;
