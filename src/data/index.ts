
import type { Product, Category, Review } from '../types';
import { products } from './products';
import { categories } from './categories';
import { reviews } from './reviews';

export { products, categories, reviews };

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.isBestSeller || p.isNew).slice(0, limit);
}

export function getSaleProducts(limit = 8): Product[] {
  return products
    .filter((p) => p.originalPrice !== undefined && p.originalPrice > p.price)
    .slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [p.name, p.description, p.categoryId, ...(p.tags ?? [])]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getReviewsForProduct(productId: string): Review[] {
  return reviews[productId] ?? [];
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== productId)
    .slice(0, limit);
}
