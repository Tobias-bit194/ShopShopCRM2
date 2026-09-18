import StatsSection from "../ui/Stats/StatsSection";
import WeeklyReport from "../ui/WeeklyReport/WeeklyReport";
import RealtimeUsers from "../ui/RealtimeUsers/RealtimeUsers";
import SalesByCountry from "../ui/SalesByCountry/SalesByCountry";
import TransactionsTable from "../ui/Transactions/TransactionsTable";
import TopProducts from "../ui/TopProducts/TopProducts";
import BestSellingProducts from "../ui/BestSelling/BestSellingProducts";
import QuickAddProduct from "../ui/QuickAddProduct/QuickAddProduct";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <StatsSection />

      {/* Analytics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <WeeklyReport />
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#EAECF0] bg-white dark:border-gray-800 dark:bg-gray-900">
          <RealtimeUsers />
          <SalesByCountry />
        </div>
      </div>

      {/* Transactions */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TransactionsTable />
        </div>

        <TopProducts />
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BestSellingProducts />
        </div>

        <QuickAddProduct />
      </div>
    </div>
  );
};

export default DashboardPage;