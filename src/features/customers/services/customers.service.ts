import api from "../../../services/api";

import type {
  Customer,
  CustomerDetails,
  CustomersResponse,
  CustomerDetailsResponse,
  UpdateCustomerStatusPayload,
  UpdateCustomerStatusResponse,
} from "../types/customers.types";

/* =========================
   GET CUSTOMERS
========================= */

export const getCustomers = async (): Promise<
  Customer[]
> => {
  const response =
    await api.get<CustomersResponse>(
      "/admin/customers",
    );

  return response.data.data;
};

/* =========================
   GET CUSTOMER BY ID
========================= */

export const getCustomerById = async (
  id: string,
): Promise<CustomerDetails> => {
  const response =
    await api.get<CustomerDetailsResponse>(
      `/admin/customers/${id}`,
    );

  return response.data.data;
};

/* =========================
   UPDATE CUSTOMER STATUS
========================= */

export const updateCustomerStatus = async (
  id: string,
  isActive: boolean,
) => {
  const payload: UpdateCustomerStatusPayload = {
    isActive,
  };

  const response =
    await api.patch<UpdateCustomerStatusResponse>(
      `/admin/customers/${id}/status`,
      payload,
    );

  return response.data.data;
};