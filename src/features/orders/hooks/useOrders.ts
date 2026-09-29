import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getOrders } from "../services/orders.service";

import type { Order } from "../types/orders.types";

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getOrders();

      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);

      setError("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    isLoading,
    error,
    refetch: fetchOrders,
  };
};

export default useOrders;