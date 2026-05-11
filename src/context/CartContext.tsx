
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { getProductById } from '../data';
import { FREE_SHIPPING_THRESHOLD } from '../utils/constants';

export interface CartItem {

  id: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface AddItemInput {
  productId: string;
  size: string;
  color: string;
  quantity?: number;
}

interface CartContextValue {
  items: CartItem[];

  itemCount: number;

  uniqueCount: number;
  subtotal: number;
  shipping: number;
  total: number;

  freeShippingRemaining: number;
  addItem: (input: AddItemInput) => void;
  removeItem: (lineId: string) => void;
  updateQty: (lineId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'dressstore.cart.v1';
const SHIPPING_FLAT = 99;

function makeLineId(productId: string, size: string, color: string): string {
  return `${productId}::${size}::${color}`;
}

function isCartItem(x: unknown): x is CartItem {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.productId === 'string' &&
    typeof o.size === 'string' &&
    typeof o.color === 'string' &&
    typeof o.quantity === 'number' &&
    o.quantity > 0
  );
}

function readStored(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStored());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {

    }
  }, [items]);

  const addItem = useCallback((input: AddItemInput) => {
    const qty = Math.max(1, input.quantity ?? 1);
    const id = makeLineId(input.productId, input.size, input.color);
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [
        ...prev,
        {
          id,
          productId: input.productId,
          size: input.size,
          color: input.color,
          quantity: qty,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== lineId));
  }, []);

  const updateQty = useCallback(
    (lineId: string, qty: number) => {
      if (qty < 1) {
        removeItem(lineId);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (i.id === lineId ? { ...i, quantity: qty } : i)),
      );
    },
    [removeItem],
  );

  const clear = useCallback(() => setItems([]), []);

  const { subtotal, itemCount } = useMemo(() => {
    let s = 0;
    let c = 0;
    for (const it of items) {
      const p = getProductById(it.productId);
      if (p) s += p.price * it.quantity;
      c += it.quantity;
    }
    return { subtotal: s, itemCount: c };
  }, [items]);

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      uniqueCount: items.length,
      subtotal,
      shipping,
      total,
      freeShippingRemaining,
      addItem,
      removeItem,
      updateQty,
      clear,
    }),
    [
      items,
      itemCount,
      subtotal,
      shipping,
      total,
      freeShippingRemaining,
      addItem,
      removeItem,
      updateQty,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within <CartProvider>.');
  }
  return ctx;
}
