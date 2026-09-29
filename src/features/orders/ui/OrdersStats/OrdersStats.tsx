import { MoreVertical } from "lucide-react";

import type {
  Order,
  OrderStatus,
} from "../../types/orders.types";

interface OrdersStatsProps {
  orders: Order[];
  isLoading: boolean;
}

interface StatItem {
  title: string;
  value: number;
  status?: OrderStatus;
}

const OrdersStats = ({
  orders,
  isLoading,
}: OrdersStatsProps) => {
  const stats: StatItem[] = [
    {
      title: "Total Orders",
      value: orders.length,
    },
    {
      title: "Pending Orders",
      value: orders.filter(
        (order) => order.status === "PENDING",
      ).length,
      status: "PENDING",
    },
    {
      title: "Completed Orders",
      value: orders.filter(
        (order) => order.status === "DELIVERED",
      ).length,
      status: "DELIVERED",
    },
    {
      title: "Canceled Orders",
      value: orders.filter(
        (order) => order.status === "CANCELLED",
      ).length,
      status: "CANCELLED",
    },
  ];

  const getValueClass = (status?: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "text-amber-500 dark:text-amber-400";

      case "DELIVERED":
        return "text-emerald-600 dark:text-emerald-400";

      case "CANCELLED":
        return "text-rose-500 dark:text-rose-400";

      default:
        return "text-gray-900 dark:text-white";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            rounded-2xl
            border border-gray-200
            bg-white p-6
            shadow-sm
            transition-colors

            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {stat.title}
            </h3>

            <button
              type="button"
              className="
                cursor-pointer text-gray-400
                transition-colors
                hover:text-gray-600
                dark:hover:text-gray-300
              "
            >
              <MoreVertical size={18} />
            </button>
          </div>

          <span
            className={`
              text-3xl font-bold
              ${getValueClass(stat.status)}
            `}
          >
            {isLoading ? "..." : stat.value}
          </span>

          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Current orders
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrdersStats;