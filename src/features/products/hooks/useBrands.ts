import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getBrands } from "../services/brands.service";

import type { Brand } from "../types/brands.types";

const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] =
    useState(true);
  const [error, setError] = useState<
    string | null
  >(null);

  const fetchBrands = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getBrands();

      setBrands(data);
    } catch (error) {
      console.error(
        "Failed to load brands:",
        error,
      );

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
    isLoading,
    error,
    refetch: fetchBrands,
  };
};

export default useBrands;