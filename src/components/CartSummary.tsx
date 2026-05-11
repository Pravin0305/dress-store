
import Button from './Button';
import { useCart } from '../context/CartContext';
import { FREE_SHIPPING_THRESHOLD } from '../utils/constants';
import { formatPrice } from '../utils/formatters';
import styles from '../styles/cartSummary.module.css';

function CartSummary() {
  const { subtotal, shipping, total, freeShippingRemaining, items } = useCart();

  const progressPct = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100),
  );
  const eligibleForFreeShipping = freeShippingRemaining === 0 && subtotal > 0;

  return (
    <aside className={styles.summary} aria-label="Order summary">
      <h2 className={styles.title}>Order Summary</h2>

      <div className={styles.row}>
        <span className={styles.label}>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Shipping</span>
        {shipping === 0 && subtotal > 0 ? (
          <span className={styles.free}>FREE</span>
        ) : (
          <span>{subtotal === 0 ? '—' : formatPrice(shipping)}</span>
        )}
      </div>

      {subtotal > 0 && (
        <div
          className={`${styles.shippingBanner} ${eligibleForFreeShipping ? styles.shippingFree : ''}`.trim()}
        >
          {eligibleForFreeShipping ? (
            <span>You unlocked free shipping. Nice.</span>
          ) : (
            <span>
              Add <strong>{formatPrice(freeShippingRemaining)}</strong> more
              for free shipping.
            </span>
          )}
          <div className={styles.progressTrack}>
            <div
              className={`${styles.progressFill} ${eligibleForFreeShipping ? styles.progressFillFull : ''}`.trim()}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      <div className={styles.divider} />

      <div className={`${styles.row} ${styles.totalRow}`}>
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      {items.length === 0 ? (
        <Button size="lg" block disabled>
          Proceed to checkout
        </Button>
      ) : (
        <Button size="lg" block to="/checkout">
          Proceed to checkout
        </Button>
      )}

      <p className={styles.note}>
        Taxes calculated at checkout. Free 30-day returns on all orders.
      </p>
    </aside>
  );
}

export default CartSummary;
