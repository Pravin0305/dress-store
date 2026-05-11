
import { Link } from 'react-router-dom';
import type { MouseEvent } from 'react';
import type { Product } from '../types';
import { calcDiscountPercent } from '../utils/formatters';
import { useWishlist } from '../context/WishlistContext';
import Badge from './Badge';
import PriceTag from './PriceTag';
import Rating from './Rating';
import LazyImage from './LazyImage';
import styles from '../styles/productCard.module.css';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const MAX_VISIBLE_SWATCHES = 4;

function ProductCard({ product, className = '' }: ProductCardProps) {
  const { has, toggle } = useWishlist();
  const inWishlist = has(product.id);
  const discount = calcDiscountPercent(product.originalPrice, product.price);
  const hoverImage = product.images[1] ?? product.images[0];
  const visibleSwatches = product.colors.slice(0, MAX_VISIBLE_SWATCHES);
  const extraSwatches = product.colors.length - visibleSwatches.length;

  function handleWishClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className={`${styles.card} ${className}`.trim()}
      aria-label={product.name}
    >
      <div className={styles.media}>
        {}
        <div className={styles.badges}>
          {product.isNew && <Badge variant="accent">New</Badge>}
          {discount !== null && <Badge variant="sale">-{discount}%</Badge>}
          {product.isBestSeller && !product.isNew && (
            <Badge variant="neutral">Bestseller</Badge>
          )}
        </div>

        {}
        <button
          type="button"
          onClick={handleWishClick}
          className={`${styles.wish} ${inWishlist ? styles.wishActive : ''}`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={inWishlist}
        >
          <HeartIcon filled={inWishlist} />
        </button>

        {}
        <LazyImage
          src={product.images[0]}
          alt={product.name}
          className={`${styles.image} ${styles.imagePrimary}`}
        />
        {hoverImage !== product.images[0] && (
          <LazyImage
            src={hoverImage}
            alt=""
            aria-hidden="true"
            className={`${styles.image} ${styles.imageHover}`}
          />
        )}

        {}
        {!product.inStock && (
          <div className={styles.oosOverlay}>
            <span className={styles.oosTag}>Out of Stock</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{product.categoryId}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <Rating value={product.rating} count={product.reviewCount} size="sm" />
        <PriceTag
          price={product.price}
          originalPrice={product.originalPrice}
          size="md"
        />
        {product.colors.length > 0 && (
          <div className={styles.row}>
            <div className={styles.swatches} aria-label="Available colors">
              {visibleSwatches.map((c) => (
                <span
                  key={c.name}
                  className={styles.swatch}
                  title={c.name}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {extraSwatches > 0 && (
                <span className={styles.moreColors}>+{extraSwatches}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.61a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default ProductCard;
