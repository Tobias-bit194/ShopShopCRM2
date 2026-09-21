import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getBrandById } from "../services/brands.service";

import type { BrandDetails } from "../types/brands.types";

const useBrandDetails = (
  id: string | undefined,
) => {
  const [brand, setBrand] =
    useState<BrandDetails | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchBrandDetails =
    useCallback(async () => {
      if (!id) {
        setBrand(null);
        setError("Brand ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response =
          await getBrandById(id);

        setBrand(response.data);
      } catch (error) {
        console.error(
          "Failed to load brand details:",
          error,
        );

        setBrand(null);
        setError(
          "Failed to load brand details",
        );
      } finally {
        setIsLoading(false);
      }
    }, [id]);

  useEffect(() => {
    fetchBrandDetails();
  }, [fetchBrandDetails]);

  return {
    brand,
    isLoading,
    error,
    refetch: fetchBrandDetails,
  };
};

export default useBrandDetails;