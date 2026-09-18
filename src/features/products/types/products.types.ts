/* =========================
   BRAND
========================= */

export interface ProductBrand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/* =========================
   CATEGORY
========================= */

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/* =========================
   IMAGE
========================= */

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  isMain: boolean;
  createdAt: string;
}

/* =========================
   VARIANT
========================= */

export interface ProductVariant {
  id?: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
  isActive: boolean;
}

/* =========================
   PRODUCT
========================= */

export interface Product {
  id: string;

  name: string;
  slug: string;

  description: string | null;
  shortDescription: string | null;

  sku: string;
  barcode: string | null;

  price: number;
  oldPrice: number | null;
  discountPercent: number;

  stock: number;
  reservedStock: number;
  availableStock: number;
  lowStockThreshold: number;

  brandId: string;
  categoryId: string;

  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;

  viewsCount: number;

  createdAt: string;
  updatedAt: string;

  brand: ProductBrand;
  category: ProductCategory;

  images: ProductImage[];
  variants: ProductVariant[];

  averageRating: number;
  reviewsCount: number;
}

/* =========================
   CREATE / UPDATE IMAGE
========================= */

export interface ProductPayloadImage {
  url: string;
  alt: string;
  isMain: boolean;
  sortOrder: number;
}

/* =========================
   CREATE / UPDATE VARIANT
========================= */

export interface ProductPayloadVariant {
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
  isActive: boolean;
}

/* =========================
   CREATE / UPDATE PAYLOAD
========================= */

export interface ProductPayload {
  name: string;
  slug: string;

  description: string;
  shortDescription: string;

  sku: string;
  barcode: string;

  price: number;
  oldPrice: number;
  discountPercent: number;

  stock: number;
  lowStockThreshold: number;

  brandId: string;
  categoryId: string;

  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;

  images: ProductPayloadImage[];
  variants: ProductPayloadVariant[];
}

/* =========================
   API RESPONSES
========================= */

export interface ProductsResponse {
  success: boolean;
  data: Product[];
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}