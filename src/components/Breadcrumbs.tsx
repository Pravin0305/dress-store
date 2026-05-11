
import { Link } from 'react-router-dom';
import styles from '../styles/breadcrumbs.module.css';

export interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={styles.crumbs}>
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className={styles.crumb}>
              {c.to && !isLast ? (
                <Link to={c.to}>{c.label}</Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                  {c.label}
                </span>
              )}
              {!isLast && <span className={styles.sep} aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
