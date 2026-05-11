
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from '../components/Container';
import Breadcrumbs from '../components/Breadcrumbs';
import ImageGallery from '../components/ImageGallery';
import PriceTag from '../components/PriceTag';
import Rating from '../components/Rating';
import SizeChip from '../components/SizeChip';
import ColorSwatch from '../components/ColorSwatch';
import QuantityStepper from '../components/QuantityStepper';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import ProductGrid from '../components/ProductGrid';
import ReviewList from '../components/ReviewList';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import {
  getProductById,
  getCategoryById,
  getRelatedProducts,
  getReviewsForProduct,
} from '../data';
import { FREE_SHIPPING_THRESHOLD } from '../utils/constants';
import { formatPrice } from '../utils/formatters';
import styles from '../styles/productDetailPage.module.css';

function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductById(slug) : undefined;

  if (!product) {
    return (
      <Container size="md">
        <div className={styles.notFound}>
          <h1>Product not found</h1>
          <p>We couldn’t find a dress matching “{slug}”.</p>
          <Button to="/shop">Back to shop</Button>
        </div>
      </Container>
    );
  }

  return <ProductView key={product.id} productId={product.id} />;
}

function ProductView({ productId }: { productId: string }) {

  const product = getProductById(productId)!;
  const category = getCategoryById(product.categoryId);
  const reviews = useMemo(() => getReviewsForProduct(productId), [productId]);
  const related = useMemo(() => getRelatedProducts(productId, 4), [productId]);

  const { addItem } = useCart();
  const { has: hasWish, toggle: toggleWish } = useWishlist();
  const inWishlist = hasWish(product.id);

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] ?? '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name ?? '');
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const addedTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    return () => {
      if (addedTimer.current) window.clearTimeout(addedTimer.current);
    };
  }, []);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setJustAdded(true);
    if (addedTimer.current) window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setJustAdded(false), 1800);
  }

  function handleWishlist() {
    toggleWish(product.id);
  }

  const lineTotal = product.price * quantity;
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - lineTotal);

  return (
    <Container size="xxl">
      <div className={styles.page}>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/shop' },
            ...(category
              ? [{ label: category.name, to: `/shop/category/${category.id}` }]
              : []),
            { label: product.name },
          ]}
        />

        {}
        <div className={styles.main}>
          <ImageGallery images={product.images} alt={product.name} />

          <div className={styles.info}>
            {category && <p className={styles.eyebrow}>{category.name}</p>}
            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.ratingRow}>
              <Rating
                value={product.rating}
                count={product.reviewCount}
                size="md"
                showValue
              />
            </div>

            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              size="lg"
            />

            <p className={styles.description}>{product.description}</p>

            <div className={styles.divider} />

            {}
            {product.colors.length > 0 && (
              <div className={styles.field}>
                <div>
                  <span className={styles.fieldLabel}>Color</span>{' '}
                  <span className={styles.fieldValue}>· {selectedColor}</span>
                </div>
                <div className={styles.swatchRow}>
                  {product.colors.map((c) => (
                    <ColorSwatch
                      key={c.name}
                      color={c}
                      selected={selectedColor === c.name}
                      onClick={() => setSelectedColor(c.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {}
            {product.sizes.length > 0 && (
              <div className={styles.field}>
                <div>
                  <span className={styles.fieldLabel}>Size</span>{' '}
                  <span className={styles.fieldValue}>· {selectedSize || 'Select a size'}</span>
                </div>
                <div className={styles.chipsRow}>
                  {product.sizes.map((s) => (
                    <SizeChip
                      key={s}
                      size={s}
                      selected={selectedSize === s}
                      onClick={() => setSelectedSize(s)}
                    />
                  ))}
                </div>
              </div>
            )}

            {}
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Quantity</span>
              <div className={styles.qtyRow}>
                <QuantityStepper value={quantity} onChange={setQuantity} />
                {!product.inStock && (
                  <span className={styles.oosNotice}>Currently out of stock</span>
                )}
              </div>
            </div>

            {}
            <div className={styles.actions}>
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                variant={justAdded ? 'accent' : 'primary'}
              >
                {!product.inStock
                  ? 'Out of stock'
                  : justAdded
                    ? `Added to cart ✓`
                    : `Add to cart · ${formatPrice(lineTotal)}`}
              </Button>
              <Button
                size="lg"
                variant={inWishlist ? 'accent' : 'secondary'}
                onClick={handleWishlist}
              >
                {inWishlist ? '♥ In wishlist' : '♡ Save to wishlist'}
              </Button>
            </div>

            {}
            <div className={styles.shipping}>
              {remainingForFreeShip > 0 ? (
                <span>
                  Add <b>{formatPrice(remainingForFreeShip)}</b> more for free shipping.
                </span>
              ) : (
                <span>
                  <b>Free shipping</b> on this order. Delivered in 3–5 business days.
                </span>
              )}
            </div>

            {}
            {product.details.length > 0 && (
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Details</span>
                <ul className={styles.detailsList}>
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {}
        <section className={styles.bottom}>
          <SectionHeader
            eyebrow="Customer feedback"
            title="Reviews"
            subtitle={
              reviews.length === 0
                ? 'No reviews yet.'
                : `${reviews.length} review${reviews.length === 1 ? '' : 's'} from verified buyers.`
            }
          />
          <ReviewList reviews={reviews} />

          {}
          {related.length > 0 && (
            <div>
              <SectionHeader
                eyebrow="You may also like"
                title="Related pieces"
                subtitle="More from the same collection."
                ctaLabel="View category"
                ctaTo={
                  category ? `/shop/category/${category.id}` : '/shop'
                }
              />
              <ProductGrid products={related} compact />
            </div>
          )}
        </section>

        {}
        <Link to="/shop" className={styles.continue}>
          ← Continue shopping
        </Link>
      </div>
    </Container>
  );
}

export default ProductDetailPage;
