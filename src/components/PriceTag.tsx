
import { formatPrice, calcDiscountPercent } from '../utils/formatters';
import styles from '../styles/priceTag.module.css';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  stack?: boolean;
  showDiscount?: boolean;
  className?: string;
}

function PriceTag({
  price,
  originalPrice,
  size = 'md',
  stack = false,
  showDiscount = true,
  className = '',
}: PriceTagProps) {
  const discount = calcDiscountPercent(originalPrice, price);

  const classes = [
    styles.tag,
    styles[size],
    stack ? styles.stack : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <span className={styles.current}>{formatPrice(price)}</span>
      {originalPrice !== undefined && originalPrice > price && (
        <span className={styles.original}>{formatPrice(originalPrice)}</span>
      )}
      {showDiscount && discount !== null && (
        <span className={styles.discount}>-{discount}%</span>
      )}
    </span>
  );
}

export default PriceTag;
