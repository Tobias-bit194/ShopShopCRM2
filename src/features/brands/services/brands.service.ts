import api from "../../../services/api";

import type {
  Brand,
  BrandDetailsResponse,
  BrandPayload,
  BrandsResponse,
} from "../types/brands.types";
// GET all brands
export const getBrands = async (): Promise<BrandsResponse> => {
  const response = await api.get<BrandsResponse>("/admin/brands");

  return response.data;
};


// GET brand by ID
export const getBrandById = async (
  id: string,
): Promise<BrandDetailsResponse> => {
  const response =
    await api.get<BrandDetailsResponse>(
      `/admin/brands/${id}`,
    );

  return response.data;
};

// CREATE brand
export const createBrand = async (
  data: BrandPayload,
): Promise<Brand> => {
  const response = await api.post(
    "/admin/brands",
    data,
  );

  return response.data.data;
};

// UPDATE brand
export const updateBrand = async (
  id: string,
  data: BrandPayload,
): Promise<Brand> => {
  const response = await api.patch(
    `/admin/brands/${id}`,
    data,
  );

  return response.data.data;
};

// DELETE / soft-delete brand
export const deleteBrand = async (
  id: string,
): Promise<void> => {
  await api.delete(`/admin/brands/${id}`);
};



