export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  mobileImage: string | null;
  buttonText: string | null;
  link: string | null;
  sortOrder: number;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BannersMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BannersResponse {
  success: boolean;
  data: Banner[];
  meta: BannersMeta;
}

export interface BannerResponse {
  success: boolean;
  data: Banner;
}

export interface BannerPayload {
  title: string;
  subtitle: string;
  image: string;
  mobileImage: string;
  buttonText: string;
  link: string;
  sortOrder: number;
  isActive: boolean;
  startDate: string | null;
  endDate: string | null;
}

export interface BannerStatusPayload {
  isActive: boolean;
}