
import { CURRENCY } from './constants';

export function formatPrice(amount: number): string {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '';
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function calcDiscountPercent(
  originalPrice: number | undefined,
  price: number,
): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function formatRating(rating: number): string {
  if (typeof rating !== 'number') return '0.0';
  return rating.toFixed(1);
}

export function formatCount(count: number): string {
  if (count < 1000) return String(count);
  if (count < 1_000_000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}m`;
}
