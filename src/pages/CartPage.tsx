
import Container from '../components/Container';
import SectionHeader from '../components/SectionHeader';
import CartItemRow from '../components/CartItemRow';
import CartSummary from '../components/CartSummary';
import EmptyState from '../components/EmptyState';
import { useCart } from '../context/CartContext';
import styles from '../styles/cartPage.module.css';

function CartPage() {
  const { items, uniqueCount, updateQty, removeItem, clear } = useCart();

  if (items.length === 0) {
    return (
      <Container size="lg">
        <div className={styles.page}>
          <SectionHeader
            title="Your Cart"
            subtitle="Add a piece from the shop to get started."
          />
          <EmptyState
            icon={<BagIcon />}
            title="Your cart is empty"
            message="Looks like you haven't added anything yet. Browse the collection and add your favourite pieces."
            ctaLabel="Continue shopping"
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
          title="Your Cart"
          subtitle={`${uniqueCount} ${uniqueCount === 1 ? 'piece' : 'pieces'} in your bag.`}
        />

        <div className={styles.layout}>
          <section className={styles.items} aria-label="Cart items">
            <div className={styles.itemsHeader}>
              <span>
                {uniqueCount} {uniqueCount === 1 ? 'item' : 'items'}
              </span>
              <button
                type="button"
                className={styles.clearLink}
                onClick={clear}
              >
                Clear cart
              </button>
            </div>

            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onChangeQty={updateQty}
                onRemove={removeItem}
              />
            ))}
          </section>

          <CartSummary />
        </div>
      </div>
    </Container>
  );
}

function BagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export default CartPage;
