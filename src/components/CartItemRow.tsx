
import { Link } from 'react-router-dom';
import type { CartItem } from '../context/CartContext';
import { getProductById } from '../data';
import { formatPrice } from '../utils/formatters';
import QuantityStepper from './QuantityStepper';
import LazyImage from './LazyImage';
import styles from '../styles/cartItemRow.module.css';

interface CartItemRowProps {
  item: CartItem;
  onChangeQty: (lineId: string, qty: number) => void;
  onRemove: (lineId: string) => void;
}

function CartItemRow({ item, onChangeQty, onRemove }: CartItemRowProps) {
  const product = getProductById(item.productId);

  if (!product) {
    return (
      <article className={styles.row}>
        <div className={styles.info}>
          <p className={styles.name}>Item no longer available</p>
          <button
            type="button"
            className={styles.remove}
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </article>
    );
  }

  const lineTotal = product.price * item.quantity;

  return (
    <article className={styles.row}>
      <Link to={`/product/${product.id}`} className={styles.image}>
        <LazyImage src={product.images[0]} alt={product.name} />
      </Link>

      <div className={styles.info}>
        <Link to={`/product/${product.id}`} className={styles.name}>
          {product.name}
        </Link>
        <p className={styles.meta}>
          Color: <strong>{item.color}</strong> · Size:{' '}
          <strong>{item.size}</strong> · Unit: {formatPrice(product.price)}
        </p>
        <div className={styles.controls}>
          <QuantityStepper
            value={item.quantity}
            onChange={(q) => onChangeQty(item.id, q)}
            size="sm"
          />
          <button
            type="button"
            className={styles.remove}
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${product.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>

      <div className={styles.total}>{formatPrice(lineTotal)}</div>
    </article>
  );
}

export default CartItemRow;
