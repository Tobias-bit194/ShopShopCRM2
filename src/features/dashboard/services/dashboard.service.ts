import api from "../../../services/api";

import type {
  BestSellingProduct,
  BestSellingResponse,
  DashboardData,
  DashboardKpis,
  DashboardKpisResponse,
  DashboardOrders,
  DashboardOrdersResponse,
  QuickAddData,
  QuickAddResponse,
  RealtimeUsers,
  RealtimeUsersResponse,
  SalesByCountryItem,
  SalesByCountryResponse,
  TopProduct,
  TopProductsResponse,
  WeeklyReport,
  WeeklyReportResponse,
} from "../types/dashboard.types";

// =========================
// KPI
// =========================

export const getDashboardKpis =
  async (): Promise<DashboardKpis> => {
    const response =
      await api.get<DashboardKpisResponse>(
        "/admin/dashboard/kpis",
      );

    return response.data.data;
  };

// =========================
// Weekly report
// =========================

export const getWeeklyReport =
  async (): Promise<WeeklyReport> => {
    const response =
      await api.get<WeeklyReportResponse>(
        "/admin/dashboard/weekly-report",
      );

    return response.data.data;
  };

// =========================
// Realtime users
// =========================

export const getRealtimeUsers =
  async (): Promise<RealtimeUsers> => {
    const response =
      await api.get<RealtimeUsersResponse>(
        "/admin/dashboard/realtime-users",
      );

    return response.data.data;
  };

// =========================
// Sales by country / region
// =========================

export const getSalesByCountry =
  async (): Promise<SalesByCountryItem[]> => {
    const response =
      await api.get<SalesByCountryResponse>(
        "/admin/dashboard/sales-by-country",
      );

    return response.data.data;
  };

// =========================
// Dashboard orders
// =========================

export const getDashboardOrders =
  async (): Promise<DashboardOrders> => {
    const response =
      await api.get<DashboardOrdersResponse>(
        "/admin/dashboard/orders",
      );

    return response.data.data;
  };

// =========================
// Top products
// =========================

export const getTopProducts =
  async (): Promise<TopProduct[]> => {
    const response =
      await api.get<TopProductsResponse>(
        "/admin/dashboard/top-products",
      );

    return response.data.data;
  };

// =========================
// Best selling
// =========================

export const getBestSelling =
  async (): Promise<BestSellingProduct[]> => {
    const response =
      await api.get<BestSellingResponse>(
        "/admin/dashboard/best-selling",
      );

    return response.data.data;
  };

// =========================
// Quick add
// =========================

export const getQuickAdd =
  async (): Promise<QuickAddData> => {
    const response =
      await api.get<QuickAddResponse>(
        "/admin/dashboard/quick-add",
      );

    return response.data.data;
  };

// =========================
// Whole dashboard
// =========================

export const getDashboard =
  async (): Promise<DashboardData> => {
    const [
      kpis,
      weeklyReport,
      realtimeUsers,
      salesByCountry,
      orders,
      topProducts,
      bestSelling,
      quickAdd,
    ] = await Promise.all([
      getDashboardKpis(),
      getWeeklyReport(),
      getRealtimeUsers(),
      getSalesByCountry(),
      getDashboardOrders(),
      getTopProducts(),
      getBestSelling(),
      getQuickAdd(),
    ]);

    return {
      kpis,
      weeklyReport,
      realtimeUsers,
      salesByCountry,
      orders,
      topProducts,
      bestSelling,
      quickAdd,
    };
  };