import OrdersHeader from "../ui/OrdersHeader/OrdersHeader";
import OrdersStats from "../ui/OrdersStats/OrdersStats";
import OrdersTable from "../ui/OrdersTable/OrdersTable";

const OrdersPage = () => {
  return (
    <div className="space-y-6">
      <OrdersHeader />

      <OrdersStats />

      <OrdersTable />
    </div>
  );
};

export default OrdersPage;