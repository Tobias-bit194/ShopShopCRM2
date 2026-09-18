export type OrderPaymentStatus =
  | "Paid"
  | "Unpaid";

export type OrderStatus =
  | "Delivered"
  | "Pending"
  | "Shipped"
  | "Cancelled";

export interface Order {
  id: string;
  product: string;
  date: string;
  price: number;

  paymentStatus: OrderPaymentStatus;
  status: OrderStatus;

  image: string;
}

export interface OrderStats {
  totalOrders: number;
  newOrders: number;
  completedOrders: number;
  canceledOrders: number;
}