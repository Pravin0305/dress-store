

export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;

  price: number;

  originalPrice?: number;
  description: string;
  details: string[];
  categoryId: string;
  images: string[];
  sizes: string[];
  colors: Color[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  body: string;

  date: string;
  size: string;
  verified: boolean;
}

export type ReviewsByProductId = Record<string, Review[]>;

export interface SortOption {
  id: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  label: string;
}

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}
