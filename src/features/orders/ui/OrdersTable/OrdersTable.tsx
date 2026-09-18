import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";

import type {
  Order,
  OrderStatus,
} from "../../types/orders.types";

/* =========================
   MOCK DATA
========================= */

const mockOrders: Order[] = [
  {
    id: "#ORD0001",
    product: "Wireless Bluetooth Headphones",
    date: "01-01-2025",
    price: 49.99,
    paymentStatus: "Paid",
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
  },
  {
    id: "#ORD0002",
    product: "Men's T-Shirt",
    date: "01-01-2025",
    price: 14.99,
    paymentStatus: "Unpaid",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100",
  },
  {
    id: "#ORD0003",
    product: "Men's Leather Wallet",
    date: "01-01-2025",
    price: 49.99,
    paymentStatus: "Paid",
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=100",
  },
  {
    id: "#ORD0004",
    product: "Memory Foam Pillow",
    date: "01-01-2025",
    price: 39.99,
    paymentStatus: "Paid",
    status: "Shipped",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=100",
  },
  {
    id: "#ORD0005",
    product: "Adjustable Dumbbells",
    date: "01-01-2025",
    price: 14.99,
    paymentStatus: "Unpaid",
    status: "Pending",
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=100",
  },
  {
    id: "#ORD0006",
    product: "Coffee Maker",
    date: "01-01-2025",
    price: 79.99,
    paymentStatus: "Unpaid",
    status: "Cancelled",
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100",
  },
  {
    id: "#ORD0007",
    product: "Casual Baseball Cap",
    date: "01-01-2025",
    price: 49.99,
    paymentStatus: "Paid",
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100",
  },
  {
    id: "#ORD0008",
    product: "Full HD Webcam",
    date: "01-01-2025",
    price: 39.99,
    paymentStatus: "Paid",
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100",
  },
  {
    id: "#ORD0009",
    product: "Smart LED Color Bulb",
    date: "01-01-2025",
    price: 79.99,
    paymentStatus: "Unpaid",
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1550985616-11610c812251?w=100",
  },
  {
    id: "#ORD0010",
    product: "Men's T-Shirt",
    date: "01-01-2025",
    price: 14.99,
    paymentStatus: "Unpaid",
    status: "Delivered",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100",
  },
];

/* =========================
   FILTER TYPES
========================= */

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

/* =========================
   HELPERS
========================= */

const getStatusClass = (
  status: OrderStatus,
) => {
  switch (status) {
    case "Delivered":
      return `
        bg-emerald-50 text-emerald-600
        dark:bg-emerald-950/50
        dark:text-emerald-400
      `;

    case "Pending":
      return `
        bg-amber-50 text-amber-500
        dark:bg-amber-950/50
        dark:text-amber-400
      `;

    case "Shipped":
      return `
        bg-blue-50 text-blue-600
        dark:bg-blue-950/50
        dark:text-blue-400
      `;

    case "Cancelled":
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

/* =========================
   COMPONENT
========================= */

const OrdersTable = () => {
  const [search, setSearch] = useState("");

  const [activeFilter, setActiveFilter] =
    useState<OrderFilter>("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const pageSize = 10;

  /* =========================
     FILTER ORDERS
  ========================= */

  const filteredOrders = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return mockOrders.filter((order) => {
      const matchesSearch =
        !query ||
        order.id
          .toLowerCase()
          .includes(query) ||
        order.product
          .toLowerCase()
          .includes(query);

      let matchesStatus = true;

      if (activeFilter === "Completed") {
        matchesStatus =
          order.status === "Delivered";
      }

      if (activeFilter === "Pending") {
        matchesStatus =
          order.status === "Pending";
      }

      if (activeFilter === "Canceled") {
        matchesStatus =
          order.status === "Cancelled";
      }

      return matchesSearch && matchesStatus;
    });
  }, [search, activeFilter]);

  /* =========================
     PAGINATION
  ========================= */

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

  /* =========================
     COUNTS
  ========================= */

  const completedCount =
    mockOrders.filter(
      (order) =>
        order.status === "Delivered",
    ).length;

  const pendingCount =
    mockOrders.filter(
      (order) => order.status === "Pending",
    ).length;

  const canceledCount =
    mockOrders.filter(
      (order) =>
        order.status === "Cancelled",
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
        return mockOrders.length;
    }
  };

  /* =========================
     FILTER CHANGE
  ========================= */

  const handleFilterChange = (
    filter: OrderFilter,
  ) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

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
      {/* =====================
          TOOLBAR
      ====================== */}

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Filters */}

        <div
          className="
            flex w-full items-center gap-1
            overflow-x-auto
            rounded-xl
            bg-emerald-100/60
            p-1

            md:w-auto

            dark:bg-emerald-950/40
          "
        >
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
                  whitespace-nowrap
                  rounded-lg px-4 py-2
                  text-xs font-medium
                  transition-colors

                  ${
                    isActive
                      ? `
                          bg-white
                          font-semibold
                          text-black
                          shadow-sm

                          dark:bg-gray-800
                          dark:text-white
                        `
                      : `
                          text-gray-600
                          hover:bg-gray-100

                          dark:text-gray-400
                          dark:hover:bg-gray-800/60
                        `
                  }
                `}
              >
                {filter === "All"
                  ? "All order"
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
              placeholder="Search order report"
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

      {/* =====================
          TABLE
      ====================== */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
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
                Order Id
              </th>

              <th className="px-4 py-3 font-semibold">
                Product
              </th>

              <th className="px-4 py-3 font-semibold">
                Date
              </th>

              <th className="px-4 py-3 font-semibold">
                Price
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

                  const isPaid =
                    order.paymentStatus ===
                    "Paid";

                  return (
                    <tr
                      key={order.id}
                      className="
                        transition-colors

                        hover:bg-gray-50/50

                        dark:hover:bg-gray-800/40
                      "
                    >
                      {/* Checkbox */}

                      <td className="px-4 py-3">
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
                        {order.id}
                      </td>

                      {/* Product */}

                      <td className="px-4 py-3">
                        <div className="flex min-w-[190px] items-center gap-3">
                          <img
                            src={order.image}
                            alt={order.product}
                            className="
                              h-8 w-8
                              shrink-0 rounded-lg
                              bg-gray-100
                              object-cover

                              dark:bg-gray-800
                            "
                          />

                          <span
                            className="
                              max-w-[200px]
                              truncate
                              text-xs font-semibold
                              text-gray-800

                              dark:text-gray-200
                            "
                          >
                            {order.product}
                          </span>
                        </div>
                      </td>

                      {/* Date */}

                      <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                        {order.date}
                      </td>

                      {/* Price */}

                      <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-gray-900 dark:text-gray-100">
                        ${order.price.toFixed(2)}
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
                          {order.status}
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

      {/* =====================
          PAGINATION
      ====================== */}

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

        {/* Page Numbers */}

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