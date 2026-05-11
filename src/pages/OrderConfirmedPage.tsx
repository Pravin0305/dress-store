
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import { formatPrice } from '../utils/formatters';
import styles from '../styles/orderConfirmedPage.module.css';

interface SavedOrder {
  id: string;
  placedAt: string;
  shipping: {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
    email: string;
    phone: string;
  };
  payment: { method: 'cod' | 'upi' | 'card' };
  total: number;
}

const PAYMENT_LABELS: Record<SavedOrder['payment']['method'], string> = {
  cod: 'Cash on Delivery',
  upi: 'UPI',
  card: 'Credit / Debit Card',
};

function OrderConfirmedPage() {
  const [params] = useSearchParams();
  const orderIdFromUrl = params.get('id') ?? '';

  const order = useMemo<SavedOrder | null>(() => {
    try {
      const raw = window.localStorage.getItem('dressstore.lastOrder.v1');
      if (!raw) return null;
      return JSON.parse(raw) as SavedOrder;
    } catch {
      return null;
    }
  }, []);

  const orderId = orderIdFromUrl || order?.id || '—';
  const eta = useMemo(estimateDelivery, []);

  return (
    <Container size="lg">
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.iconBubble} aria-hidden="true">
            <CheckIcon />
          </div>

          <p className={styles.eyebrow}>Order Placed</p>
          <h1 className={styles.title}>Thank you{order ? `, ${firstName(order.shipping.fullName)}` : ''}!</h1>
          <p className={styles.subtitle}>
            Your order has been placed and a confirmation will reach your
            inbox shortly. We can&apos;t wait for you to twirl in it.
          </p>

          <div className={styles.orderId}>
            <span className={styles.orderIdLabel}>Order ID</span>
            <strong>{orderId}</strong>
          </div>

          <div className={styles.facts}>
            <div className={styles.fact}>
              <span className={styles.factLabel}>Estimated delivery</span>
              <span className={styles.factValue}>{eta}</span>
            </div>
            {order && (
              <div className={styles.fact}>
                <span className={styles.factLabel}>Payment</span>
                <span className={styles.factValue}>
                  {PAYMENT_LABELS[order.payment.method]} · {formatPrice(order.total)}
                </span>
              </div>
            )}
            {order && (
              <div className={styles.fact}>
                <span className={styles.factLabel}>Shipping to</span>
                <span className={styles.factValue}>
                  {order.shipping.fullName}, {order.shipping.city},{' '}
                  {order.shipping.state} {order.shipping.pincode}
                </span>
              </div>
            )}
            {order && (
              <div className={styles.fact}>
                <span className={styles.factLabel}>Contact</span>
                <span className={styles.factValue}>
                  {order.shipping.email}
                  <br />
                  +91 {order.shipping.phone}
                </span>
              </div>
            )}
          </div>

          <div className={styles.cta}>
            <Button to="/shop" size="lg">Continue shopping</Button>
            <Button to="/" variant="ghost" size="lg">Back to home</Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] ?? '';
}

function estimateDelivery(): string {
  const start = new Date();
  const end = new Date();
  start.setDate(start.getDate() + 3);
  end.setDate(end.getDate() + 6);
  const fmt = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
  });
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

function CheckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default OrderConfirmedPage;
