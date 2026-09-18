export interface CategoryCount {
  products: number;
  children: number;
}

export interface Category {
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
  parent: Category | null;
  _count: CategoryCount;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface CategoryPayload {
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
}


export interface CategoryCount {
  products: number;
  children: number;
}

export interface CategoryProductImage {
  url: string;
}

export interface CategoryProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  isActive: boolean;
  images: CategoryProductImage[];
  image: string | null;
}

export interface Category {
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
  parent: Category | null;
  _count: CategoryCount;
}

export interface CategoryDetails extends Category {
  children: Category[];
  products: CategoryProduct[];
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

export interface CategoryDetailsResponse {
  success: boolean;
  data: CategoryDetails;
}