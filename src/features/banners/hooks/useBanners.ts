import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getBanners,
  updateBannerStatus,
} from "../services/banners.service";

import type {
  Banner,
  BannersMeta,
} from "../types/banners.types";

const useBanners = () => {
  const [banners, setBanners] =
    useState<Banner[]>([]);

  const [meta, setMeta] =
    useState<BannersMeta>({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 1,
    });

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [statusLoadingId, setStatusLoadingId] =
    useState<string | null>(null);

  // =========================
  // GET BANNERS
  // =========================

  const fetchBanners = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getBanners();

      setBanners(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error(
        "Failed to load banners:",
        error,
      );

      setBanners([]);
      setError("Failed to load banners");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // =========================
  // CHANGE STATUS
  // =========================

  const handleStatusChange = async (
    banner: Banner,
    isActive: boolean,
  ) => {
    try {
      setStatusLoadingId(banner.id);

      await updateBannerStatus(
        banner.id,
        {
          isActive,
        },
      );

      // Обновляем локально без полной
      // перезагрузки списка
      setBanners((currentBanners) =>
        currentBanners.map((item) =>
          item.id === banner.id
            ? {
                ...item,
                isActive,
              }
            : item,
        ),
      );

      return true;
    } catch (error) {
      console.error(
        "Failed to update banner status:",
        error,
      );

      return false;
    } finally {
      setStatusLoadingId(null);
    }
  };

  // =========================
  // INITIAL FETCH
  // =========================

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return {
    banners,
    meta,
    isLoading,
    error,
    statusLoadingId,

    refetch: fetchBanners,
    handleStatusChange,
  };
};

export default useBanners;