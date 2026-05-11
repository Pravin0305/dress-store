
import { useEffect, useState } from 'react';
import { SIZES, PRICE_RANGES } from '../utils/constants';
import type { Color } from '../types';
import type { ShopFilters } from '../hooks/useShopFilters';
import Button from './Button';
import FilterSection from './FilterSection';
import SizeChip from './SizeChip';
import ColorSwatch from './ColorSwatch';
import styles from '../styles/filterSidebar.module.css';

interface FilterSidebarProps {
  filters: ShopFilters;
  availableColors: Color[];
  resultCount: number;
  activeCount: number;
  onToggleSize: (s: string) => void;
  onToggleColor: (c: string) => void;
  onSetPrice: (id: string | null) => void;
  onSetSale: (b: boolean) => void;
  onSetStock: (b: boolean) => void;
  onClear: () => void;
}

function FilterSidebar(props: FilterSidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [drawerOpen]);

  return (
    <>
      {}
      <button
        type="button"
        className={styles.mobileTrigger}
        onClick={() => setDrawerOpen(true)}
        aria-label="Open filters"
      >
        <FilterIcon />
        Filters
        {props.activeCount > 0 && (
          <span className={styles.activeBadge}>{props.activeCount}</span>
        )}
      </button>

      {}
      <aside className={styles.sidebar} aria-label="Product filters">
        <div className={styles.sidebarHeader}>
          <h3 className={styles.title}>Filters</h3>
          {props.activeCount > 0 && (
            <button type="button" className={styles.clear} onClick={props.onClear}>
              Clear all
            </button>
          )}
        </div>
        <FilterControls {...props} />
      </aside>

      {}
      {drawerOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <header className={styles.drawerHeader}>
              <h3 className={styles.title}>Filters</h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
              >
                ×
              </button>
            </header>
            <div className={styles.drawerBody}>
              <FilterControls {...props} />
            </div>
            <footer className={styles.drawerFooter}>
              <Button variant="ghost" onClick={props.onClear}>
                Clear all
              </Button>
              <Button onClick={() => setDrawerOpen(false)}>
                Show {props.resultCount} {props.resultCount === 1 ? 'result' : 'results'}
              </Button>
            </footer>
          </div>
        </>
      )}
    </>
  );
}

function FilterControls({
  filters,
  availableColors,
  onToggleSize,
  onToggleColor,
  onSetPrice,
  onSetSale,
  onSetStock,
}: FilterSidebarProps) {
  return (
    <>
      <FilterSection title="Size" activeCount={filters.sizes.length}>
        <div className={styles.sizesGrid}>
          {SIZES.map((size) => (
            <SizeChip
              key={size}
              size={size}
              selected={filters.sizes.includes(size)}
              onClick={() => onToggleSize(size)}
              variant="sm"
            />
          ))}
        </div>
      </FilterSection>

      {availableColors.length > 0 && (
        <FilterSection title="Color" activeCount={filters.colors.length}>
          <div className={styles.colorsGrid}>
            {availableColors.map((c) => (
              <ColorSwatch
                key={c.name}
                color={c}
                selected={filters.colors.includes(c.name)}
                showLabel
                variant="sm"
                onClick={() => onToggleColor(c.name)}
              />
            ))}
          </div>
        </FilterSection>
      )}

      <FilterSection title="Price" activeCount={filters.priceRangeId ? 1 : 0}>
        <div className={styles.priceList}>
          <label className={styles.radioRow}>
            <input
              type="radio"
              name="price"
              checked={filters.priceRangeId === null}
              onChange={() => onSetPrice(null)}
            />
            Any price
          </label>
          {PRICE_RANGES.map((range) => (
            <label key={range.id} className={styles.radioRow}>
              <input
                type="radio"
                name="price"
                checked={filters.priceRangeId === range.id}
                onChange={() => onSetPrice(range.id)}
              />
              {range.label}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Availability"
        activeCount={(filters.onSaleOnly ? 1 : 0) + (filters.inStockOnly ? 1 : 0)}
      >
        <div className={styles.toggleGroup}>
          <label className={styles.checkRow}>
            <input
              type="checkbox"
              checked={filters.onSaleOnly}
              onChange={(e) => onSetSale(e.target.checked)}
            />
            On sale only
          </label>
          <label className={styles.checkRow}>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => onSetStock(e.target.checked)}
            />
            In stock only
          </label>
        </div>
      </FilterSection>
    </>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M6 12h12M10 18h4" />
    </svg>
  );
}

export default FilterSidebar;
