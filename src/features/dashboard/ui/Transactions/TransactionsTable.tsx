import { FilterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import type { DashboardRecentOrder } from "../../types/dashboard.types";

interface TransactionsTableProps {
  orders: DashboardRecentOrder[];
}

const formatPrice = (value: string | number) => {
  const number = Number(value);

  if (Number.isNaN(number)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US").format(number);
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return `
        bg-[#EAF7F0] text-[#3F9F6F]
        dark:bg-emerald-950/40
        dark:text-emerald-400
      `;

    case "PENDING":
      return `
        bg-amber-50 text-amber-600
        dark:bg-amber-950/40
        dark:text-amber-400
      `;

    case "CANCELLED":
      return `
        bg-red-50 text-red-500
        dark:bg-red-950/40
        dark:text-red-400
      `;

    default:
      return `
        bg-gray-100 text-gray-500
        dark:bg-gray-800
        dark:text-gray-400
      `;
  }
};

const formatStatus = (status: string) => {
  return (
    status.charAt(0).toUpperCase() +
    status.slice(1).toLowerCase()
  );
};

const TransactionsTable = ({
  orders,
}: TransactionsTableProps) => {
  return (
    <section className="rounded-2xl border border-[#EAECF0] bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#1D2939] dark:text-white">
            Recent Orders
          </h2>

          <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
            Latest customer orders
          </p>
        </div>

        <button
          type="button"
          className="
            flex cursor-pointer items-center gap-2
            rounded-lg bg-[#4CAF7A]
            px-4 py-2
            text-xs font-semibold text-white
            transition hover:bg-[#3F9F6F]
          "
        >
          <FilterOutlined />
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left">
          <thead>
            <tr className="border-b border-[#EAECF0] text-xs text-[#98A2B3] dark:border-gray-800">
              <th className="pb-3 font-medium">
                Order
              </th>

              <th className="pb-3 font-medium">
                Customer
              </th>

              <th className="pb-3 font-medium">
                Order Date
              </th>

              <th className="pb-3 font-medium">
                Status
              </th>

              <th className="pb-3 text-right font-medium">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.slice(0, 5).map((order) => {
                const customerName =
                  order.user
                    ? `${order.user.firstName} ${order.user.lastName}`
                    : `${order.customerSnapshot.firstName} ${order.customerSnapshot.lastName}`;

                return (
                  <tr
                    key={order.id}
                    className="
                      border-b border-[#F2F4F7]
                      transition-colors
                      last:border-none
                      hover:bg-[#FAFBFA]

                      dark:border-gray-800
                      dark:hover:bg-gray-800/50
                    "
                  >
                    <td className="py-4">
                      <Link
                        to={`/orders/${order.id}`}
                        className="
                          text-xs font-semibold
                          text-[#344054]
                          transition
                          hover:text-[#3F9F6F]

                          dark:text-gray-200
                          dark:hover:text-emerald-400
                        "
                      >
                        {order.orderNumber}
                      </Link>
                    </td>

                    <td className="py-4">
                      <p className="text-xs font-semibold text-[#344054] dark:text-gray-200">
                        {customerName}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#98A2B3]">
                        {order.user?.email ||
                          order.customerSnapshot.email}
                      </p>
                    </td>

                    <td className="py-4 text-xs text-[#667085] dark:text-gray-400">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="py-4">
                      <span
                        className={`
                          inline-flex items-center gap-1.5
                          rounded-full px-2.5 py-1
                          text-xs font-semibold
                          ${getStatusStyles(order.status)}
                        `}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        {formatStatus(order.status)}
                      </span>
                    </td>

                    <td className="py-4 text-right text-sm font-bold text-[#1D2939] dark:text-white">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-xs text-[#98A2B3]"
                >
                  No recent orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end border-t border-[#EAECF0] pt-4 dark:border-gray-800">
        <Link
          to="/orders"
          className="
            rounded-full
            border border-[#4CAF7A]
            px-5 py-2
            text-xs font-semibold
            text-[#3F9F6F]
            transition
            hover:bg-[#EAF7F0]

            dark:text-emerald-400
            dark:hover:bg-emerald-950/30
          "
        >
          View all
        </Link>
      </div>
    </section>
  );
};

export default TransactionsTable;