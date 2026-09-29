import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getOrderById } from "../services/orders.service";

import type { Order } from "../types/orders.types";

const useOrder = (id?: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async () => {
    if (!id) {
      setOrder(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getOrderById(id);

      setOrder(data);
    } catch (error) {
      console.error("Failed to load order:", error);

      setOrder(null);
      setError("Failed to load order");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return {
    order,
    isLoading,
    error,
    refetch: fetchOrder,
  };
};

export default useOrder;