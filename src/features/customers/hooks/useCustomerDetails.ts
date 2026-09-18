import { useCallback, useEffect, useState } from "react";

import { getCustomerById } from "../services/customers.service";

import type { CustomerDetails } from "../types/customers.types";

const useCustomerDetails = (id?: string) => {
  const [customer, setCustomer] =
    useState<CustomerDetails | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const fetchCustomer = useCallback(async () => {
    if (!id) {
      setCustomer(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await getCustomerById(id);

      setCustomer(data);
    } catch (error: unknown) {
      console.error(
        "Failed to fetch customer details:",
        error,
      );

      let message =
        "Failed to load customer details.";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const requestError = error as {
          response?: {
            data?: {
              message?: string | string[];
            };
          };
        };

        const responseMessage =
          requestError.response?.data?.message;

        if (Array.isArray(responseMessage)) {
          message = responseMessage.join(", ");
        } else if (
          typeof responseMessage === "string"
        ) {
          message = responseMessage;
        }
      }

      setError(message);
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  return {
    customer,
    isLoading,
    error,
    refetch: fetchCustomer,
  };
};

export default useCustomerDetails;