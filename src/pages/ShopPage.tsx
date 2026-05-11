
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import SectionHeader from '../components/SectionHeader';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/FilterSidebar';
import FilterChip from '../components/FilterChip';
import SortDropdown from '../components/SortDropdown';
import { useShopFilters } from '../hooks/useShopFilters';
import {
  getCategoryById,
  getProducts,
  getProductsByCategory,
} from '../data';
import { PRICE_RANGES } from '../utils/constants';
import type { Color } from '../types';
import styles from '../styles/shopPage.module.css';

function ShopPage() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const category = categoryId ? getCategoryById(categoryId) : undefined;

  const baseProducts = useMemo(
    () => (categoryId ? getProductsByCategory(categoryId) : getProducts()),
    [categoryId],
  );

  const {
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
  } = useShopFilters();

  const filtered = useMemo(() => apply(baseProducts), [apply, baseProducts]);

  const availableColors = useMemo<Color[]>(() => {
    const seen = new Map<string, Color>();
    for (const p of baseProducts) {
      for (const c of p.colors) {
        if (!seen.has(c.name)) seen.set(c.name, c);
      }
    }
    return Array.from(seen.values());
  }, [baseProducts]);

  const priceRange = filters.priceRangeId
    ? PRICE_RANGES.find((r) => r.id === filters.priceRangeId) ?? null
    : null;

  return (
    <Container size="xxl">
      <div className={styles.page}>
        <SectionHeader
          eyebrow={
            filters.searchQuery.trim()
              ? 'Search results'
              : category
                ? 'Category'
                : 'Browse'
          }
          title={
            filters.searchQuery.trim()
              ? `Results for “${filters.searchQuery}”`
              : category?.name ?? 'All Dresses'
          }
          subtitle={
            filters.searchQuery.trim()
              ? `Showing pieces matching your search${
                  category ? ` in ${category.name}` : ''
                }.`
              : category?.tagline ??
                'Every dress in the store, curated across categories.'
          }
        />

        <div className={styles.layout}>
          <FilterSidebar
            filters={filters}
            availableColors={availableColors}
            resultCount={filtered.length}
            activeCount={activeCount}
            onToggleSize={toggleSize}
            onToggleColor={toggleColor}
            onSetPrice={setPriceRange}
            onSetSale={setOnSaleOnly}
            onSetStock={setInStockOnly}
            onClear={clearAll}
          />

          <div className={styles.results}>
            <div className={styles.toolbar}>
              <span className={styles.count}>
                <strong>{filtered.length}</strong>{' '}
                {filtered.length === 1 ? 'piece' : 'pieces'}
                {activeCount > 0 && ` · ${activeCount} ${activeCount === 1 ? 'filter' : 'filters'}`}
              </span>
              <SortDropdown value={filters.sort} onChange={setSort} />
            </div>

            {activeCount > 0 && (
              <div className={styles.chipsRow} aria-label="Active filters">
                {filters.searchQuery.trim() && (
                  <FilterChip
                    label={`Search: “${filters.searchQuery}”`}
                    onRemove={() => setSearchQuery('')}
                  />
                )}
                {filters.sizes.map((s) => (
                  <FilterChip
                    key={`size-${s}`}
                    label={`Size: ${s}`}
                    onRemove={() => toggleSize(s)}
                  />
                ))}
                {filters.colors.map((name) => {
                  const swatch = availableColors.find((c) => c.name === name);
                  return (
                    <FilterChip
                      key={`color-${name}`}
                      label={name}
                      color={swatch?.hex}
                      onRemove={() => toggleColor(name)}
                    />
                  );
                })}
                {priceRange && (
                  <FilterChip
                    label={priceRange.label}
                    onRemove={() => setPriceRange(null)}
                  />
                )}
                {filters.onSaleOnly && (
                  <FilterChip
                    label="On sale"
                    onRemove={() => setOnSaleOnly(false)}
                  />
                )}
                {filters.inStockOnly && (
                  <FilterChip
                    label="In stock"
                    onRemove={() => setInStockOnly(false)}
                  />
                )}
                <button
                  type="button"
                  onClick={clearAll}
                  className={styles.clearLink}
                >
                  Clear all
                </button>
              </div>
            )}

            <ProductGrid
              products={filtered}
              emptyMessage={
                filters.searchQuery.trim()
                  ? `Nothing matched “${filters.searchQuery}”. Try a different word or clear filters.`
                  : activeCount > 0
                    ? 'No dresses match these filters. Try removing one.'
                    : 'No dresses in this category yet.'
              }
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ShopPage;
