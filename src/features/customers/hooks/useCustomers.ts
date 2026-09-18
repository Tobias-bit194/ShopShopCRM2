import { useCallback, useEffect, useState } from "react";

import { getCustomers } from "../services/customers.service";

import type { Customer } from "../types/customers.types";

const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getCustomers();

      setCustomers(data);
    } catch (error: unknown) {
      console.error("Failed to fetch customers:", error);

      let message = "Failed to load customers.";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string | string[];
            };
          };
        };

        const responseMessage =
          axiosError.response?.data?.message;

        if (Array.isArray(responseMessage)) {
          message = responseMessage.join(", ");
        } else if (typeof responseMessage === "string") {
          message = responseMessage;
        }
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    isLoading,
    error,
    refetch: fetchCustomers,
  };
};

export default useCustomers;