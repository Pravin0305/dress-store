
import type { Product } from '../types';
import ProductCard from './ProductCard';
import styles from '../styles/productGrid.module.css';

interface ProductGridProps {
  products: Product[];
  compact?: boolean;
  emptyMessage?: string;
  className?: string;
}

function ProductGrid({
  products,
  compact = false,
  emptyMessage = 'No products found.',
  className = '',
}: ProductGridProps) {
  if (products.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div
      className={`${styles.grid} ${compact ? styles.compact : ''} ${className}`.trim()}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductGrid;
