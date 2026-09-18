import { useCallback, useEffect, useState } from "react";

import { getCategories } from "../services/categories.service";
import type { Category } from "../types/categories.types";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      setError("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
};

export default useCategories;