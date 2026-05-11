
import type { SortOption, PriceRange } from '../types';

export const CURRENCY = {
  code: 'INR',
  symbol: '₹',
  locale: 'en-IN',
} as const;

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export const SORT_OPTIONS: SortOption[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Top Rated' },
];

export const PRICE_RANGES: PriceRange[] = [
  { id: 'under-1500', label: 'Under ₹1,500', min: 0, max: 1500 },
  { id: '1500-3000', label: '₹1,500 – ₹3,000', min: 1500, max: 3000 },
  { id: '3000-6000', label: '₹3,000 – ₹6,000', min: 3000, max: 6000 },
  { id: '6000-plus', label: '₹6,000 & Above', min: 6000, max: Number.POSITIVE_INFINITY },
];

export const FREE_SHIPPING_THRESHOLD = 1999;
