import api from "../../../services/api";

import type {
  Order,
  OrdersResponse,
  OrderDetailsResponse,
  UpdateOrderNotesPayload,
  UpdateOrderStatusPayload,
} from "../types/orders.types";

// GET all orders
export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get<OrdersResponse>(
    "/admin/orders",
  );

  return response.data.data;
};

// GET order by id
export const getOrderById = async (
  id: string,
): Promise<Order> => {
  const response = await api.get<OrderDetailsResponse>(
    `/admin/orders/${id}`,
  );

  return response.data.data;
};

// UPDATE order notes
export const updateOrderNotes = async (
  id: string,
  data: UpdateOrderNotesPayload,
): Promise<Order> => {
  const response = await api.patch<OrderDetailsResponse>(
    `/admin/orders/${id}`,
    data,
  );

  return response.data.data;
};

// UPDATE order status
export const updateOrderStatus = async (
  id: string,
  data: UpdateOrderStatusPayload,
): Promise<Order> => {
  const response = await api.patch<OrderDetailsResponse>(
    `/admin/orders/${id}/status`,
    data,
  );

  return response.data.data;
};