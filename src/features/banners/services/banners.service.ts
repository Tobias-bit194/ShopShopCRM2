import api from "../../../services/api";

import type {
  Banner,
  BannerPayload,
  BannersResponse,
  BannerResponse,
  BannerStatusPayload,
} from "../types/banners.types";

// GET all banners
export const getBanners =
  async (): Promise<BannersResponse> => {
    const response =
      await api.get<BannersResponse>(
        "/admin/banners",
      );

    return response.data;
  };

// GET banner by ID
export const getBannerById = async (
  id: string,
): Promise<Banner> => {
  const response =
    await api.get<BannerResponse>(
      `/admin/banners/${id}`,
    );

  return response.data.data;
};

// CREATE banner
export const createBanner = async (
  data: BannerPayload,
): Promise<Banner> => {
  const response =
    await api.post<BannerResponse>(
      "/admin/banners",
      data,
    );

  return response.data.data;
};

// UPDATE banner
export const updateBanner = async (
  id: string,
  data: BannerPayload,
): Promise<Banner> => {
  const response =
    await api.patch<BannerResponse>(
      `/admin/banners/${id}`,
      data,
    );

  return response.data.data;
};

// UPDATE banner status
export const updateBannerStatus = async (
  id: string,
  data: BannerStatusPayload,
): Promise<Banner> => {
  const response =
    await api.patch<BannerResponse>(
      `/admin/banners/${id}/status`,
      data,
    );

  return response.data.data;
};

// DELETE / soft-delete banner
export const deleteBanner = async (
  id: string,
): Promise<void> => {
  await api.delete(
    `/admin/banners/${id}`,
  );
};

