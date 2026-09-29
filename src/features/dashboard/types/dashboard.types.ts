// =========================
// Common
// =========================

export interface DashboardRange {
  from: string;
  to: string;
}

export interface DashboardResponse<T> {
  success: boolean;
  data: T;
}

// =========================
// KPI
// =========================

export interface DashboardKpiValue {
  value: number;
  previousValue: number;
  changePercent: number;
}

export interface DashboardPendingKpi {
  orders: number;
  users: number;
}

export interface DashboardKpis {
  label: string;
  range: DashboardRange;
  previousRange: DashboardRange;
  totalSales: DashboardKpiValue;
  totalOrders: DashboardKpiValue;
  pending: DashboardPendingKpi;
  cancelled: DashboardKpiValue;
}

export type DashboardKpisResponse =
  DashboardResponse<DashboardKpis>;

// =========================
// Weekly report
// =========================

export interface WeeklyReportStats {
  customers: number;
  totalProducts: number;
  stockProducts: number;
  outOfStock: number;
  revenue: number;
}

export interface WeeklyChartItem {
  date: string;
  day: string;
  orders: number;
  revenue: number;
  value: number;
}

export interface WeeklyReportChart {
  thisWeek: WeeklyChartItem[];
  lastWeek: WeeklyChartItem[];
  active: WeeklyChartItem[];
}

export interface WeeklyReport {
  week: string;
  range: DashboardRange;
  stats: WeeklyReportStats;
  chart: WeeklyReportChart;
}

export type WeeklyReportResponse =
  DashboardResponse<WeeklyReport>;

// =========================
// Realtime users
// =========================

export interface RealtimeUserMinute {
  time: string;
  users: number;
}

export interface RealtimeUsers {
  total: number;
  windowMinutes: number;
  from: string;
  to: string;
  isDefault: boolean;
  perMinute: RealtimeUserMinute[];
}

export type RealtimeUsersResponse =
  DashboardResponse<RealtimeUsers>;

// =========================
// Sales by country / region
// =========================

export interface SalesByCountryItem {
  name: string;
  code: string;
  sales: number;
  previousSales: number;
  changePercent: number;
  share: number;
}

export type SalesByCountryResponse =
  DashboardResponse<SalesByCountryItem[]>;

// =========================
// Best selling
// =========================

export interface BestSellingProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  image: string;
  price: number;
  orders: number;
  totalOrders: number;
  revenue: number;
  availableStock: number;
  status: string;
}

export type BestSellingResponse =
  DashboardResponse<BestSellingProduct[]>;

// =========================
// Top products
// =========================

export interface TopProduct {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
}

export type TopProductsResponse =
  DashboardResponse<TopProduct[]>;

// =========================
// Quick add
// =========================

export interface QuickAddCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  productsCount: number;
}

export interface QuickAddProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  image: string;
  price: number;
  categoryId: string;
  categoryName: string;
}

export interface QuickAddData {
  categories: QuickAddCategory[];
  selectedCategoryId: string | null;
  products: QuickAddProductItem[];
}

export type QuickAddResponse =
  DashboardResponse<QuickAddData>;

// =========================
// Orders / transactions
// =========================

export interface DashboardOrderStatus {
  status: string;
  count: number;
  total: number;
}

export interface DashboardAddressSnapshot {
  city: string;
  house: string;
  title: string;
  region: string;
  street: string;
  district: string;
}

export interface DashboardCustomerSnapshot {
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
}

export interface DashboardOrderUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface DashboardRecentOrder {
  id: string;
  orderNumber: string;
  userId: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;

  subtotal: string;
  discount: string;
  deliveryFee: string;
  total: string;

  couponId: string | null;

  addressSnapshot: DashboardAddressSnapshot;
  customerSnapshot: DashboardCustomerSnapshot;

  notes: string | null;

  createdAt: string;
  updatedAt: string;

  user: DashboardOrderUser;
}

export interface DashboardOrders {
  range: DashboardRange;
  byStatus: DashboardOrderStatus[];
  recent: DashboardRecentOrder[];
}

export type DashboardOrdersResponse =
  DashboardResponse<DashboardOrders>;

// =========================
// Combined data used by page
// =========================

export interface DashboardData {
  kpis: DashboardKpis;
  weeklyReport: WeeklyReport;
  realtimeUsers: RealtimeUsers;
  salesByCountry: SalesByCountryItem[];
  orders: DashboardOrders;
  topProducts: TopProduct[];
  bestSelling: BestSellingProduct[];
  quickAdd: QuickAddData;
}

