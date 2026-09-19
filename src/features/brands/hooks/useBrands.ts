import { useCallback, useEffect, useState } from "react";

import { getBrands } from "../services/brands.service";

import type {
  Brand,
  BrandsMeta,
} from "../types/brands.types";

const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  const [meta, setMeta] = useState<BrandsMeta>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getBrands();

      setBrands(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error("Failed to load brands:", error);

      setBrands([]);
      setError("Failed to load brands");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return {
    brands,
    meta,
    isLoading,
    error,
    refetch: fetchBrands,
  };
};

export default useBrands;