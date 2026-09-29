import useDashboard from "../hooks/useDashboard";

import StatsSection from "../ui/Stats/StatsSection";
import WeeklyReport from "../ui/WeeklyReport/WeeklyReport";
import RealtimeUsers from "../ui/RealtimeUsers/RealtimeUsers";
import SalesByCountry from "../ui/SalesByCountry/SalesByCountry";
import TransactionsTable from "../ui/Transactions/TransactionsTable";
import TopProducts from "../ui/TopProducts/TopProducts";
import BestSellingProducts from "../ui/BestSelling/BestSellingProducts";
import QuickAddProduct from "../ui/QuickAddProduct/QuickAddProduct";

const DashboardPage = () => {
  const {
    dashboard,
    isLoading,
    error,
  } = useDashboard();

  if (isLoading) {
    return (
      <div
        className="
          flex min-h-[400px]
          items-center justify-center
          rounded-2xl
          border border-[#EAECF0]
          bg-white
          text-sm text-[#98A2B3]

          dark:border-gray-800
          dark:bg-gray-900
          dark:text-gray-500
        "
      >
        Loading dashboard...
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div
        className="
          flex min-h-[400px]
          items-center justify-center
          rounded-2xl
          border border-red-200
          bg-red-50
          text-sm text-red-500

          dark:border-red-900
          dark:bg-red-950/30
          dark:text-red-400
        "
      >
        {error || "Dashboard data not found"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsSection kpis={dashboard.kpis} />

      {/* Main dashboard */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6 xl:col-span-2">
          <WeeklyReport
            report={dashboard.weeklyReport}
          />

          <TransactionsTable
            orders={dashboard.orders.recent}
          />

          <BestSellingProducts
            products={dashboard.bestSelling}
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-[#EAECF0]
              bg-white

              dark:border-gray-800
              dark:bg-gray-900
            "
          >
            <RealtimeUsers
              data={dashboard.realtimeUsers}
            />

            <SalesByCountry
              data={dashboard.salesByCountry}
            />
          </div>

          <TopProducts
            products={dashboard.topProducts}
          />

          <QuickAddProduct
            data={dashboard.quickAdd}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;