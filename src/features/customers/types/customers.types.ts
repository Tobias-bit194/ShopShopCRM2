/* =========================
   CUSTOMER LIST
========================= */

export interface CustomerCount {
  orders: number;
  reviews: number;
}

export interface Customer {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string | null;

  avatar: string | null;

  isActive: boolean;
  deletedAt: string | null;

  createdAt: string;
  updatedAt: string;

  _count: CustomerCount;

  totalOrders: number;
  totalSpent: number;
}

/* =========================
   CUSTOMER ACTIVITY
========================= */

export interface CustomerActivity {
  id: string;
  userId: string;

  type: string;

  metadata: unknown | null;

  createdAt: string;
}

/* =========================
   WISHLIST
========================= */

export interface CustomerWishlist {
  id: string;
  userId: string;

  createdAt: string;
  updatedAt: string;

  items: unknown[];
}

/* =========================
   CUSTOMER DETAILS
========================= */

export interface CustomerDetails {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string | null;

  avatar: string | null;

  isActive: boolean;
  deletedAt: string | null;

  createdAt: string;
  updatedAt: string;

  addresses: unknown[];
  reviews: unknown[];

  wishlist: CustomerWishlist | null;

  activities: CustomerActivity[];

  orders: unknown[];

  totalOrders: number;
  deliveredOrders: number;

  totalSpent: number;
  averageOrderValue: number;

  lastOrder: unknown | null;

  purchasedProducts: unknown[];
}

/* =========================
   PAGINATION
========================= */

export interface CustomersMeta {
  page: number;
  limit: number;

  total: number;
  totalPages: number;
}

/* =========================
   PAYLOADS
========================= */

export interface UpdateCustomerStatusPayload {
  isActive: boolean;
}

/* =========================
   RESPONSES
========================= */

export interface CustomersResponse {
  success: boolean;

  data: Customer[];

  meta: CustomersMeta;
}

export interface CustomerDetailsResponse {
  success: boolean;

  data: CustomerDetails;
}

export interface UpdateCustomerStatusResponse {
  success: boolean;

  data: {
    id: string;

    firstName: string;
    lastName: string;

    email: string;
    phone: string | null;

    avatar: string | null;

    isActive: boolean;
    deletedAt: string | null;

    createdAt: string;
    updatedAt: string;
  };
}