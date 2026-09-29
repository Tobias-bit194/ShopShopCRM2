import useOrders from "../hooks/useOrders";

import OrdersHeader from "../ui/OrdersHeader/OrdersHeader";
import OrdersStats from "../ui/OrdersStats/OrdersStats";
import OrdersTable from "../ui/OrdersTable/OrdersTable";

const OrdersPage = () => {
  const {
    orders,
    isLoading,
    error,
  } = useOrders();

  return (
    <div className="space-y-6">
      <OrdersHeader />

      <OrdersStats
        orders={orders}
        isLoading={isLoading}
      />

      <OrdersTable
        orders={orders}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default OrdersPage;