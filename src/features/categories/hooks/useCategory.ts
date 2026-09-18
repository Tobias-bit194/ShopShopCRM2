import { useCallback, useEffect, useState } from "react";

import { getCategoryById } from "../services/categories.service";
import type { CategoryDetails } from "../types/categories.types";

const useCategory = (id?: string) => {
  const [category, setCategory] = useState<CategoryDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    if (!id) {
      setCategory(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getCategoryById(id);

      setCategory(data);
    } catch (error) {
      console.error("Failed to load category:", error);

      setCategory(null);
      setError("Failed to load category");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return {
    category,
    isLoading,
    error,
    refetch: fetchCategory,
  };
};

export default useCategory;