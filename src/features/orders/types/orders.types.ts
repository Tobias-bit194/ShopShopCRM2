export type OrderStatus =
  | "PENDING"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "CASH_ON_DELIVERY";

export type PaymentStatus =
  | "UNPAID"
  | "PAID";

export interface OrderAddressSnapshot {
  city: string;
  house: string;
  title: string;
  region: string;
  street: string;
  district: string;
}

export interface OrderCustomerSnapshot {
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;

  productName: string;
  productSku: string;
  productImage: string | null;

  attributes: unknown | null;

  price: number;
  quantity: number;
  total: number;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;

  comment: string | null;
  changedBy: string;
  adminId: string | null;

  createdAt: string;
}

export interface OrderUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;

  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;

  couponId: string | null;

  addressSnapshot: OrderAddressSnapshot;
  customerSnapshot: OrderCustomerSnapshot;

  notes: string | null;

  createdAt: string;
  updatedAt: string;

  items: OrderItem[];
  statusHistory: OrderStatusHistory[];

  user: OrderUser;
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
}

export interface OrderDetailsResponse {
  success: boolean;
  data: Order;
}

export interface UpdateOrderNotesPayload {
  notes: string;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
  comment: string;
}