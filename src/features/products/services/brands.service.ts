import api from "../../../services/api";

import type {
  Brand,
  BrandsResponse,
} from "../types/brands.types";

export const getBrands = async (): Promise<Brand[]> => {
  const response = await api.get<BrandsResponse>(
    "/admin/brands",
  );

  return response.data.data;
};