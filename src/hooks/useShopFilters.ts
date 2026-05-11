
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Product, SortOption } from '../types';
import { PRICE_RANGES } from '../utils/constants';

export type SortId = SortOption['id'];

export interface ShopFilters {
  sizes: string[];
  colors: string[];
  priceRangeId: string | null;
  onSaleOnly: boolean;
  inStockOnly: boolean;
  sort: SortId;
  searchQuery: string;
}

const DEFAULT_SORT: SortId = 'featured';

export function useShopFilters() {
  const [params, setParams] = useSearchParams();

  const filters: ShopFilters = useMemo(
    () => ({
      sizes: params.getAll('size'),
      colors: params.getAll('color'),
      priceRangeId: params.get('price'),
      onSaleOnly: params.get('sale') === '1',
      inStockOnly: params.get('stock') === '1',
      sort: (params.get('sort') as SortId) ?? DEFAULT_SORT,
      searchQuery: params.get('q') ?? '',
    }),
    [params],
  );

  const activeCount = useMemo(() => {
    let n = 0;
    n += filters.sizes.length;
    n += filters.colors.length;
    if (filters.priceRangeId) n += 1;
    if (filters.onSaleOnly) n += 1;
    if (filters.inStockOnly) n += 1;
    if (filters.searchQuery.trim()) n += 1;
    return n;
  }, [filters]);

  const update = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          mutate(next);
          return next;
        },
        { replace: false },
      );
    },
    [setParams],
  );

  const toggleArray = useCallback(
    (key: 'size' | 'color', value: string) => {
      update((next) => {
        const current = next.getAll(key);
        next.delete(key);
        if (current.includes(value)) {
          current.filter((v) => v !== value).forEach((v) => next.append(key, v));
        } else {
          [...current, value].forEach((v) => next.append(key, v));
        }
      });
    },
    [update],
  );

  const toggleSize = useCallback((size: string) => toggleArray('size', size), [toggleArray]);
  const toggleColor = useCallback((color: string) => toggleArray('color', color), [toggleArray]);

  const setPriceRange = useCallback(
    (id: string | null) => {
      update((next) => {
        if (id === null) next.delete('price');
        else next.set('price', id);
      });
    },
    [update],
  );

  const setBoolean = useCallback(
    (key: 'sale' | 'stock', enabled: boolean) => {
      update((next) => {
        if (enabled) next.set(key, '1');
        else next.delete(key);
      });
    },
    [update],
  );

  const setOnSaleOnly = useCallback((v: boolean) => setBoolean('sale', v), [setBoolean]);
  const setInStockOnly = useCallback((v: boolean) => setBoolean('stock', v), [setBoolean]);

  const setSort = useCallback(
    (id: SortId) => {
      update((next) => {
        if (id === DEFAULT_SORT) next.delete('sort');
        else next.set('sort', id);
      });
    },
    [update],
  );

  const setSearchQuery = useCallback(
    (q: string) => {
      update((next) => {
        const trimmed = q.trim();
        if (!trimmed) next.delete('q');
        else next.set('q', trimmed);
      });
    },
    [update],
  );

  const clearAll = useCallback(() => {
    update((next) => {
      next.delete('size');
      next.delete('color');
      next.delete('price');
      next.delete('sale');
      next.delete('stock');
      next.delete('q');
    });
  }, [update]);

  const apply = useCallback(
    (products: Product[]): Product[] => filterAndSort(products, filters),
    [filters],
  );

  return {
    filters,
    activeCount,
    toggleSize,
    toggleColor,
    setPriceRange,
    setOnSaleOnly,
    setInStockOnly,
    setSort,
    setSearchQuery,
    clearAll,
    apply,
  };
}

export function filterAndSort(products: Product[], f: ShopFilters): Product[] {
  const priceRange = f.priceRangeId
    ? PRICE_RANGES.find((p) => p.id === f.priceRangeId) ?? null
    : null;

  const query = f.searchQuery.trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (f.sizes.length && !p.sizes.some((s) => f.sizes.includes(s))) return false;
    if (f.colors.length && !p.colors.some((c) => f.colors.includes(c.name))) return false;
    if (priceRange && (p.price < priceRange.min || p.price >= priceRange.max)) return false;
    if (f.onSaleOnly && !(p.originalPrice && p.originalPrice > p.price)) return false;
    if (f.inStockOnly && !p.inStock) return false;
    if (query && !matchesQuery(p, query)) return false;
    return true;
  });

  return sortProducts(filtered, f.sort);
}

function matchesQuery(p: Product, q: string): boolean {
  const haystack = [
    p.name,
    p.description,
    p.categoryId,
    ...(p.tags ?? []),
    ...p.colors.map((c) => c.name),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(q);
}

function sortProducts(products: Product[], sort: SortId): Product[] {
  const copy = [...products];
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    case 'featured':
    default:

      return copy.sort((a, b) => {
        const score = (p: Product) =>
          (p.isBestSeller ? 2 : 0) + (p.isNew ? 1 : 0) + p.rating / 10;
        return score(b) - score(a);
      });
  }
}
