import api from "../../../services/api";

import type {
  Category,
  CategoriesResponse,
  CategoryDetails,
  CategoryDetailsResponse,
} from "../types/categories.types";

export interface CategoryPayload {
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
}

// GET all categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<CategoriesResponse>(
    "/admin/categories",
  );

  return response.data.data;
};

// GET category by id
export const getCategoryById = async (
  id: string,
): Promise<CategoryDetails> => {
  const response = await api.get<CategoryDetailsResponse>(
    `/admin/categories/${id}`,
  );

  return response.data.data;
};

// CREATE category
export const createCategory = async (
  data: CategoryPayload,
): Promise<Category> => {
  const response = await api.post(
    "/admin/categories",
    data,
  );

  return response.data.data;
};

// UPDATE category
export const updateCategory = async (
  id: string,
  data: CategoryPayload,
): Promise<Category> => {
  const response = await api.patch(
    `/admin/categories/${id}`,
    data,
  );

  return response.data.data;
};

// DELETE / archive category
export const deleteCategory = async (
  id: string,
): Promise<Category> => {
  const response = await api.delete(
    `/admin/categories/${id}`,
  );

  return response.data.data;
};