
import { useMemo } from 'react';
import Container from '../components/Container';
import SectionHeader from '../components/SectionHeader';
import ProductGrid from '../components/ProductGrid';
import EmptyState from '../components/EmptyState';
import { useWishlist } from '../context/WishlistContext';
import { getProductById } from '../data';
import type { Product } from '../types';
import styles from '../styles/wishlistPage.module.css';

function WishlistPage() {
  const { ids, count, clear } = useWishlist();

  const products = useMemo<Product[]>(
    () =>
      ids
        .map((id) => getProductById(id))
        .filter((p): p is Product => Boolean(p)),
    [ids],
  );

  if (count === 0) {
    return (
      <Container size="lg">
        <div className={styles.page}>
          <SectionHeader
            title="Your Wishlist"
            subtitle="Tap the heart on any dress to save it for later."
          />
          <EmptyState
            icon={<HeartIcon />}
            title="No saved pieces yet"
            message="Tap the heart on any dress to save it here. We'll remember it across visits."
            ctaLabel="Browse the collection"
            ctaTo="/shop"
          />
        </div>
      </Container>
    );
  }

  return (
    <Container size="xxl">
      <div className={styles.page}>
        <SectionHeader
          title="Your Wishlist"
          subtitle="Pieces you're keeping an eye on."
        />

        <div className={styles.toolbar}>
          <span className={styles.count}>
            <strong>{count}</strong> {count === 1 ? 'piece' : 'pieces'} saved
          </span>
          <button
            type="button"
            className={styles.clearLink}
            onClick={clear}
          >
            Clear wishlist
          </button>
        </div>

        <ProductGrid products={products} />
      </div>
    </Container>
  );
}

function HeartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21l8.84-8.61a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default WishlistPage;
