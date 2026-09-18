export interface BrandCount {
  products: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  isActive: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count: BrandCount;
}

export interface BrandsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BrandsResponse {
  success: boolean;
  data: Brand[];
  meta: BrandsMeta;
}