import {
  useMemo,
  useState,
} from "react";

import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Image as ImageIcon,
  MoreHorizontal,
  Search,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import type {
  Order,
  OrderStatus,
} from "../../types/orders.types";

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

type OrderFilter =
  | "All"
  | "Completed"
  | "Pending"
  | "Canceled";

const filters: OrderFilter[] = [
  "All",
  "Completed",
  "Pending",
  "Canceled",
];

const getStatusClass = (
  status: OrderStatus,
) => {
  switch (status) {
    case "DELIVERED":
      return `
        bg-emerald-50 text-emerald-600
        dark:bg-emerald-950/50
        dark:text-emerald-400
      `;

    case "PENDING":
      return `
        bg-amber-50 text-amber-500
        dark:bg-amber-950/50
        dark:text-amber-400
      `;

    case "CANCELLED":
      return `
        bg-rose-50 text-rose-500
        dark:bg-rose-950/50
        dark:text-rose-400
      `;

    default:
      return `
        bg-gray-100 text-gray-600
        dark:bg-gray-800
        dark:text-gray-400
      `;
  }
};

const getStatusLabel = (
  status: OrderStatus,
) => {
  switch (status) {
    case "DELIVERED":
      return "Delivered";

    case "PENDING":
      return "Pending";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
};

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

const formatDate = (value: string) => {
  const date = new Date(value);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const OrdersTable = ({
  orders,
  isLoading,
  error,
}: OrdersTableProps) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState<OrderFilter>("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const pageSize = 10;

  // FILTER ORDERS
  const filteredOrders = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return orders.filter((order) => {
      const customerName = `
        ${order.customerSnapshot.firstName}
        ${order.customerSnapshot.lastName}
      `.toLowerCase();

      const matchesProduct = order.items.some(
        (item) =>
          item.productName
            .toLowerCase()
            .includes(query),
      );

      const matchesSearch =
        !query ||
        order.orderNumber
          .toLowerCase()
          .includes(query) ||
        customerName.includes(query) ||
        order.customerSnapshot.phone
          .toLowerCase()
          .includes(query) ||
        order.customerSnapshot.email
          .toLowerCase()
          .includes(query) ||
        matchesProduct;

      let matchesStatus = true;

      if (activeFilter === "Completed") {
        matchesStatus =
          order.status === "DELIVERED";
      }

      if (activeFilter === "Pending") {
        matchesStatus =
          order.status === "PENDING";
      }

      if (activeFilter === "Canceled") {
        matchesStatus =
          order.status === "CANCELLED";
      }

      return matchesSearch && matchesStatus;
    });
  }, [
    orders,
    search,
    activeFilter,
  ]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredOrders.length / pageSize,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedOrders =
    filteredOrders.slice(
      (safeCurrentPage - 1) * pageSize,
      safeCurrentPage * pageSize,
    );

  // COUNTS
  const completedCount = orders.filter(
    (order) =>
      order.status === "DELIVERED",
  ).length;

  const pendingCount = orders.filter(
    (order) =>
      order.status === "PENDING",
  ).length;

  const canceledCount = orders.filter(
    (order) =>
      order.status === "CANCELLED",
  ).length;

  const getFilterCount = (
    filter: OrderFilter,
  ) => {
    switch (filter) {
      case "Completed":
        return completedCount;

      case "Pending":
        return pendingCount;

      case "Canceled":
        return canceledCount;

      default:
        return orders.length;
    }
  };

  const handleFilterChange = (
    filter: OrderFilter,
  ) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div
        className="
          rounded-2xl border border-gray-200
          bg-white p-12
          text-center text-xs text-gray-400
          shadow-sm

          dark:border-gray-800
          dark:bg-gray-900
          dark:text-gray-500
        "
      >
        Loading orders...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-2xl border border-red-200
          bg-red-50 p-12
          text-center text-xs text-red-500

          dark:border-red-900
          dark:bg-red-950/30
          dark:text-red-400
        "
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className="
        space-y-6 rounded-2xl
        border border-gray-200
        bg-white p-6
        shadow-sm
        transition-colors

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      {/* TOOLBAR */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Filters */}
        {/* Filters */}
<div
  className="
    relative flex w-full items-center
    rounded-xl
    bg-emerald-100/60
    p-1

    md:w-[420px]

    dark:bg-emerald-950/40
  "
>
  {/* Sliding bubble */}
  <div
    className="
      absolute bottom-1 top-1
      rounded-lg
      bg-white
      shadow-sm

      transition-all
      duration-300
      ease-in-out

      dark:bg-gray-800
    "
    style={{
      width: `calc((100% - 8px) / ${filters.length})`,
      left: `calc(4px + ${
        filters.indexOf(activeFilter)
      } * ((100% - 8px) / ${filters.length}))`,
    }}
  />

  {filters.map((filter) => {
    const isActive =
      activeFilter === filter;

    return (
      <button
        key={filter}
        type="button"
        onClick={() =>
          handleFilterChange(filter)
        }
        className={`
          relative z-10
          flex-1 cursor-pointer
          whitespace-nowrap
          rounded-lg
          px-3 py-2
          text-xs font-medium
          transition-colors
          duration-300

          ${
            isActive
              ? `
                  font-semibold
                  text-black

                  dark:text-white
                `
              : `
                  text-gray-600

                  dark:text-gray-400
                `
          }
        `}
      >
        {filter === "All"
          ? "All orders"
          : filter}

        {isActive && (
          <span className="ml-1 text-emerald-500">
            ({getFilterCount(filter)})
          </span>
        )}
      </button>
    );
  })}
</div>

        {/* Actions */}
        <div className="flex w-full items-center gap-3 md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search
              size={14}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-gray-400

                dark:text-gray-500
              "
            />

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search orders"
              className="
                w-full rounded-xl
                border border-gray-200
                bg-gray-50/50
                py-2 pl-9 pr-3
                text-xs text-gray-900
                outline-none
                transition-colors

                placeholder:text-gray-400

                focus:border-emerald-500

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-100
                dark:placeholder:text-gray-500
              "
            />
          </div>

          <button
            type="button"
            title="Filter"
            className="
              cursor-pointer rounded-xl
              border border-gray-200
              bg-white p-2
              text-gray-600
              transition-colors

              hover:bg-gray-50

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-300
              dark:hover:bg-gray-700
            "
          >
            <Filter size={16} />
          </button>

          <button
            type="button"
            title="Sort"
            className="
              cursor-pointer rounded-xl
              border border-gray-200
              bg-white p-2
              text-gray-600
              transition-colors

              hover:bg-gray-50

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-300
              dark:hover:bg-gray-700
            "
          >
            <ArrowUpDown size={16} />
          </button>

          <button
            type="button"
            title="More"
            className="
              cursor-pointer rounded-xl
              border border-gray-200
              bg-white p-2
              text-gray-600
              transition-colors

              hover:bg-gray-50

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-300
              dark:hover:bg-gray-700
            "
          >
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left">
          <thead>
            <tr
              className="
                bg-emerald-50/60
                text-xs text-gray-500

                dark:bg-emerald-950/30
                dark:text-gray-400
              "
            >
              <th className="w-12 rounded-l-xl px-4 py-3 font-semibold">
                <input
                  type="checkbox"
                  className="
                    cursor-pointer
                    rounded border-gray-300
                    bg-transparent
                    accent-emerald-600

                    dark:border-gray-700
                  "
                />
              </th>

              <th className="px-4 py-3 font-semibold">
                No.
              </th>

              <th className="px-4 py-3 font-semibold">
                Order ID
              </th>

              <th className="px-4 py-3 font-semibold">
                Product
              </th>

              <th className="px-4 py-3 font-semibold">
                Date
              </th>

              <th className="px-4 py-3 font-semibold">
                Total
              </th>

              <th className="px-4 py-3 font-semibold">
                Payment
              </th>

              <th className="rounded-r-xl px-4 py-3 font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody
            className="
              divide-y divide-gray-100
              text-sm

              dark:divide-gray-800
            "
          >
            {paginatedOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="
                    px-4 py-12
                    text-center text-xs
                    text-gray-400

                    dark:text-gray-500
                  "
                >
                  No orders found
                </td>
              </tr>
            ) : (
              paginatedOrders.map(
                (order, index) => {
                  const globalIndex =
                    (safeCurrentPage - 1) *
                      pageSize +
                    index +
                    1;

                  const firstItem =
                    order.items[0];

                  const extraItems =
                    order.items.length - 1;

                  const isPaid =
                    order.paymentStatus ===
                    "PAID";

                  return (
                    <tr
                      key={order.id}
                      onClick={() =>
                        navigate(
                          `/orders/${order.id}`,
                        )
                      }
                      className="
                        cursor-pointer
                        transition-colors

                        hover:bg-gray-50/50

                        dark:hover:bg-gray-800/40
                      "
                    >
                      {/* Checkbox */}
                      <td
                        className="px-4 py-3"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >
                        <input
                          type="checkbox"
                          className="
                            cursor-pointer
                            rounded
                            border-gray-300
                            bg-transparent
                            accent-emerald-600

                            dark:border-gray-700
                          "
                        />
                      </td>

                      {/* Number */}
                      <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                        {globalIndex}
                      </td>

                      {/* Order ID */}
                      <td className="px-4 py-3 text-xs font-bold text-gray-800 dark:text-gray-200">
                        {order.orderNumber}
                      </td>

                      {/* Product */}
                      <td className="px-4 py-3">
                        <div className="flex min-w-[200px] items-center gap-3">
                          <div
                            className="
                              flex h-8 w-8
                              shrink-0 items-center
                              justify-center
                              overflow-hidden rounded-lg
                              bg-gray-100

                              dark:bg-gray-800
                            "
                          >
                            {firstItem?.productImage ? (
                              <img
                                src={
                                  firstItem.productImage
                                }
                                alt={
                                  firstItem.productName
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <ImageIcon
                                size={14}
                                className="text-gray-400"
                              />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p
                              className="
                                max-w-[180px]
                                truncate
                                text-xs font-semibold
                                text-gray-800

                                dark:text-gray-200
                              "
                            >
                              {firstItem
                                ? firstItem.productName
                                : "No products"}
                            </p>

                            {extraItems > 0 && (
                              <p className="mt-0.5 text-[10px] text-gray-400 dark:text-gray-500">
                                +{extraItems} more
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(
                          order.createdAt,
                        )}
                      </td>

                      {/* Total */}
                      <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-gray-900 dark:text-gray-100">
                        {formatPrice(order.total)}
                      </td>

                      {/* Payment */}
                      <td className="px-4 py-3">
                        <span
                          className={`
                            inline-flex
                            items-center gap-1.5
                            text-xs font-medium

                            ${
                              isPaid
                                ? `
                                    text-emerald-600
                                    dark:text-emerald-400
                                  `
                                : `
                                    text-rose-500
                                    dark:text-rose-400
                                  `
                            }
                          `}
                        >
                          <span
                            className={`
                              h-1.5 w-1.5
                              rounded-full

                              ${
                                isPaid
                                  ? "bg-emerald-500"
                                  : "bg-rose-500"
                              }
                            `}
                          />

                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`
                            inline-flex
                            items-center
                            rounded-full
                            px-3 py-1
                            text-xs font-semibold

                            ${getStatusClass(
                              order.status,
                            )}
                          `}
                        >
                          {getStatusLabel(
                            order.status,
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                },
              )
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div
        className="
          flex items-center justify-between
          border-t border-gray-100
          pt-4

          dark:border-gray-800
        "
      >
        <button
          type="button"
          disabled={safeCurrentPage === 1}
          onClick={() =>
            setCurrentPage((prev) =>
              Math.max(prev - 1, 1),
            )
          }
          className="
            flex cursor-pointer
            items-center gap-1
            rounded-xl
            border border-gray-200
            bg-white px-4 py-2
            text-xs font-semibold
            text-gray-600
            transition-colors

            hover:bg-gray-50

            disabled:cursor-not-allowed
            disabled:opacity-40

            dark:border-gray-700
            dark:bg-gray-800
            dark:text-gray-300
            dark:hover:bg-gray-700
          "
        >
          <ChevronLeft size={14} />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1,
          ).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() =>
                setCurrentPage(page)
              }
              className={`
                flex h-8 w-8
                cursor-pointer
                items-center justify-center
                rounded-lg
                text-xs font-semibold
                transition-colors

                ${
                  page === safeCurrentPage
                    ? `
                        bg-emerald-500
                        text-white
                        shadow-sm
                      `
                    : `
                        text-gray-600
                        hover:bg-gray-100

                        dark:text-gray-400
                        dark:hover:bg-gray-800
                      `
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={
            safeCurrentPage === totalPages
          }
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                totalPages,
              ),
            )
          }
          className="
            flex cursor-pointer
            items-center gap-1
            rounded-xl
            border border-gray-200
            bg-white px-4 py-2
            text-xs font-semibold
            text-gray-600
            transition-colors

            hover:bg-gray-50

            disabled:cursor-not-allowed
            disabled:opacity-40

            dark:border-gray-700
            dark:bg-gray-800
            dark:text-gray-300
            dark:hover:bg-gray-700
          "
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;