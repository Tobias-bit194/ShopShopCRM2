import api from "../../../services/api";

import type {
  Product,
  ProductPayload,
  ProductResponse,
  ProductsResponse,
} from "../types/products.types";

/* =========================
   GET PRODUCTS
========================= */

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>(
    "/admin/products",
  );

  return response.data.data;
};

/* =========================
   CREATE PRODUCT
========================= */

export const createProduct = async (
  payload: ProductPayload,
): Promise<Product> => {
  const response = await api.post<ProductResponse>(
    "/admin/products",
    payload,
  );

  return response.data.data;
};

/* =========================
   UPDATE PRODUCT
========================= */

export const updateProduct = async (
  id: string,
  payload: ProductPayload,
): Promise<Product> => {
  const response = await api.patch<ProductResponse>(
    `/admin/products/${id}`,
    payload,
  );

  return response.data.data;
};

/* =========================
   DELETE PRODUCT
========================= */

export const deleteProduct = async (
  id: string,
): Promise<Product> => {
  const response = await api.delete<ProductResponse>(
    `/admin/products/${id}`,
  );

  return response.data.data;
};