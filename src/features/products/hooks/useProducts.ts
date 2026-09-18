import { useCallback, useEffect, useState } from "react";

import { getProducts } from "../services/products.service";
import type { Product } from "../types/products.types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
      setError("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};

export default useProducts;