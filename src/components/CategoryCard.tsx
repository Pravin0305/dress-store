
import { Link } from 'react-router-dom';
import type { Category } from '../types';
import LazyImage from './LazyImage';
import styles from '../styles/categoryCard.module.css';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

function CategoryCard({ category, className = '' }: CategoryCardProps) {
  return (
    <Link
      to={`/shop/category/${category.id}`}
      className={`${styles.card} ${className}`.trim()}
      aria-label={`Shop ${category.name}`}
    >
      <LazyImage
        src={category.image}
        alt=""
        className={styles.image}
      />
      <span className={styles.overlay} aria-hidden="true" />
      <span className={styles.arrow} aria-hidden="true">→</span>
      <div className={styles.text}>
        <h3 className={styles.name}>{category.name}</h3>
        <p className={styles.tagline}>{category.tagline}</p>
      </div>
    </Link>
  );
}

export default CategoryCard;
