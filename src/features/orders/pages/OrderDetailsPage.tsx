import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  Clock3,
  Image as ImageIcon,
  MapPin,
  Package,
  Save,
  UserRound,
} from "lucide-react";

import useOrder from "../hooks/useOrder";

import {
  updateOrderNotes,
  updateOrderStatus,
} from "../services/orders.service";

import type { OrderStatus } from "../types/orders.types";

const statuses: OrderStatus[] = [
  "PENDING",
  "DELIVERED",
  "CANCELLED",
];

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("en-US").format(value);
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const getStatusClass = (status: OrderStatus) => {
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

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "Pending";

    case "DELIVERED":
      return "Delivered";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
};

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    order,
    isLoading,
    error,
    refetch,
  } = useOrder(id);

  const [notes, setNotes] = useState("");

  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatus | null>(null);

  const [statusComment, setStatusComment] =
    useState("");

  const [isSavingNotes, setIsSavingNotes] =
    useState(false);

  const [isChangingStatus, setIsChangingStatus] =
    useState(false);

  // Sync local form state when order is loaded/refetched
  useEffect(() => {
    if (!order) return;

    setNotes(order.notes || "");
    setSelectedStatus(order.status);
  }, [order]);

  // SAVE NOTES
  const handleSaveNotes = async () => {
    if (!order) return;

    try {
      setIsSavingNotes(true);

      await updateOrderNotes(order.id, {
        notes,
      });

      await refetch();
    } catch (error: any) {
      console.error(
        "Failed to update order notes:",
        error,
      );

      alert(
        error.response?.data?.message ||
          "Failed to update order notes.",
      );
    } finally {
      setIsSavingNotes(false);
    }
  };

  // UPDATE STATUS
  const handleStatusChange = async () => {
    if (!order || !selectedStatus) return;

    if (selectedStatus === order.status) {
      return;
    }

    try {
      setIsChangingStatus(true);

      await updateOrderStatus(order.id, {
        status: selectedStatus,
        comment: statusComment.trim(),
      });

      setStatusComment("");

      await refetch();
    } catch (error: any) {
      console.error(
        "Failed to update order status:",
        error,
      );

      alert(
        error.response?.data?.message ||
          "Failed to update order status.",
      );
    } finally {
      setIsChangingStatus(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="
          rounded-2xl
          border border-gray-200
          bg-white p-12
          text-center text-sm
          text-gray-400
          shadow-sm

          dark:border-gray-800
          dark:bg-gray-900
          dark:text-gray-500
        "
      >
        Loading order...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate("/orders")}
          className="
            flex cursor-pointer
            items-center gap-2
            text-sm font-semibold
            text-gray-600

            dark:text-gray-300
          "
        >
          <ArrowLeft size={16} />
          Back to orders
        </button>

        <div
          className="
            rounded-2xl
            border border-red-200
            bg-red-50 p-12
            text-center text-sm
            text-red-500

            dark:border-red-900
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          {error || "Order not found"}
        </div>
      </div>
    );
  }

  const hasStatusChanged =
    selectedStatus !== null &&
    selectedStatus !== order.status;

  const hasNotesChanged =
    notes !== (order.notes || "");

  return (
    <div className="space-y-6">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="
              mb-3 flex cursor-pointer
              items-center gap-2
              text-xs font-semibold
              text-gray-500
              transition-colors

              hover:text-emerald-600

              dark:text-gray-400
              dark:hover:text-emerald-400
            "
          >
            <ArrowLeft size={15} />
            Back to orders
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {order.orderNumber}
            </h1>

            <span
              className={`
                inline-flex rounded-full
                px-3 py-1
                text-xs font-semibold

                ${getStatusClass(order.status)}
              `}
            >
              {getStatusLabel(order.status)}
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Created {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="text-left md:text-right">
          <p className="text-xs text-gray-400">
            Order total
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>

      {/* =========================
          CUSTOMER + ADDRESS
      ========================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CUSTOMER */}

        <div
          className="
            rounded-2xl
            border border-gray-200
            bg-white p-6
            shadow-sm

            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          <div className="mb-5 flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-emerald-50
                text-emerald-600

                dark:bg-emerald-950/50
                dark:text-emerald-400
              "
            >
              <UserRound size={19} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Customer
              </h2>

              <p className="text-xs text-gray-400">
                Customer information
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[11px] text-gray-400">
                Full name
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                {order.customerSnapshot.firstName}{" "}
                {order.customerSnapshot.lastName}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-gray-400">
                Email
              </p>

              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {order.customerSnapshot.email}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-gray-400">
                Phone
              </p>

              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {order.customerSnapshot.phone}
              </p>
            </div>
          </div>
        </div>

        {/* ADDRESS */}

        <div
          className="
            rounded-2xl
            border border-gray-200
            bg-white p-6
            shadow-sm

            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          <div className="mb-5 flex items-center gap-3">
            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                bg-emerald-50
                text-emerald-600

                dark:bg-emerald-950/50
                dark:text-emerald-400
              "
            >
              <MapPin size={19} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Delivery Address
              </h2>

              <p className="text-xs text-gray-400">
                {order.addressSnapshot.title}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-[11px] text-gray-400">
                Region / City
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-gray-200">
                {order.addressSnapshot.region},{" "}
                {order.addressSnapshot.city}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-gray-400">
                District
              </p>

              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {order.addressSnapshot.district}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-gray-400">
                Street / House
              </p>

              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {order.addressSnapshot.street},{" "}
                {order.addressSnapshot.house}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          ORDER ITEMS
      ========================= */}

      <div
        className="
          rounded-2xl
          border border-gray-200
          bg-white p-6
          shadow-sm

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div className="mb-5 flex items-center gap-3">
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-emerald-50
              text-emerald-600

              dark:bg-emerald-950/50
              dark:text-emerald-400
            "
          >
            <Package size={19} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              Order Items
            </h2>

            <p className="text-xs text-gray-400">
              {order.items.length} item
              {order.items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr
                className="
                  bg-emerald-50/60
                  text-left text-xs
                  text-gray-500

                  dark:bg-emerald-950/30
                  dark:text-gray-400
                "
              >
                <th className="rounded-l-xl px-4 py-3">
                  Product
                </th>

                <th className="px-4 py-3">
                  SKU
                </th>

                <th className="px-4 py-3">
                  Price
                </th>

                <th className="px-4 py-3">
                  Qty
                </th>

                <th className="rounded-r-xl px-4 py-3">
                  Total
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-10 w-10
                          shrink-0 items-center
                          justify-center
                          overflow-hidden
                          rounded-xl
                          bg-gray-100

                          dark:bg-gray-800
                        "
                      >
                        {item.productImage ? (
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <ImageIcon
                            size={16}
                            className="text-gray-400"
                          />
                        )}
                      </div>

                      <p className="max-w-[250px] truncate text-xs font-semibold text-gray-800 dark:text-gray-200">
                        {item.productName}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-xs text-gray-500 dark:text-gray-400">
                    {item.productSku}
                  </td>

                  <td className="px-4 py-4 text-xs text-gray-700 dark:text-gray-300">
                    {formatPrice(item.price)}
                  </td>

                  <td className="px-4 py-4 text-xs text-gray-700 dark:text-gray-300">
                    {item.quantity}
                  </td>

                  <td className="px-4 py-4 text-xs font-bold text-gray-900 dark:text-white">
                    {formatPrice(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================
          NOTES / STATUS / SUMMARY
      ========================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* NOTES */}

        <div
          className="
            rounded-2xl
            border border-gray-200
            bg-white p-6
            shadow-sm

            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">
            Order Notes
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Internal notes for this order
          </p>

          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(event.target.value)
            }
            rows={6}
            placeholder="Add order notes..."
            className="
              mt-5 w-full resize-none
              rounded-xl
              border border-gray-200
              bg-gray-50/50 p-3
              text-xs text-gray-800
              outline-none transition

              focus:border-emerald-500

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-200
            "
          />

          <button
            type="button"
            onClick={handleSaveNotes}
            disabled={
              isSavingNotes ||
              !hasNotesChanged
            }
            className="
              mt-3 flex w-full
              cursor-pointer
              items-center
              justify-center gap-2
              rounded-xl
              bg-emerald-600
              px-4 py-2.5
              text-xs font-semibold
              text-white
              transition

              hover:bg-emerald-700

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Save size={15} />

            {isSavingNotes
              ? "Saving..."
              : "Save Notes"}
          </button>
        </div>

        {/* STATUS */}

        <div
          className="
            rounded-2xl
            border border-gray-200
            bg-white p-6
            shadow-sm

            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">
            Order Status
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Select a new status and confirm the change
          </p>

          <div className="mt-5 space-y-2">
            {statuses.map((status) => {
              const isCurrent =
                order.status === status;

              const isSelected =
                selectedStatus === status;

              return (
                <button
                  key={status}
                  type="button"
                  disabled={isChangingStatus}
                  onClick={() =>
                    setSelectedStatus(status)
                  }
                  className={`
                    flex w-full cursor-pointer
                    items-center justify-between
                    rounded-xl border
                    px-4 py-3
                    text-xs font-semibold
                    transition

                    disabled:cursor-not-allowed
                    disabled:opacity-50

                    ${
                      isSelected
                        ? `
                            border-emerald-300
                            bg-emerald-50
                            text-emerald-600

                            dark:border-emerald-800
                            dark:bg-emerald-950/40
                            dark:text-emerald-400
                          `
                        : `
                            border-gray-200
                            text-gray-600

                            hover:border-emerald-300
                            hover:bg-emerald-50/50

                            dark:border-gray-700
                            dark:text-gray-300
                            dark:hover:bg-gray-800
                          `
                    }
                  `}
                >
                  <span>
                    {getStatusLabel(status)}

                    {isCurrent && (
                      <span className="ml-2 text-[10px] font-medium text-gray-400">
                        Current
                      </span>
                    )}
                  </span>

                  {isSelected && (
                    <Check size={15} />
                  )}
                </button>
              );
            })}
          </div>

          <textarea
            value={statusComment}
            onChange={(event) =>
              setStatusComment(
                event.target.value,
              )
            }
            disabled={isChangingStatus}
            rows={3}
            placeholder="Status comment..."
            className="
              mt-4 w-full resize-none
              rounded-xl
              border border-gray-200
              bg-gray-50/50 p-3
              text-xs text-gray-800
              outline-none transition

              focus:border-emerald-500

              disabled:cursor-not-allowed
              disabled:opacity-60

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-200
            "
          />

          <button
            type="button"
            onClick={handleStatusChange}
            disabled={
              isChangingStatus ||
              !hasStatusChanged
            }
            className="
              mt-3 flex w-full
              cursor-pointer
              items-center
              justify-center gap-2
              rounded-xl
              bg-emerald-600
              px-4 py-2.5
              text-xs font-semibold
              text-white
              transition

              hover:bg-emerald-700

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Check size={15} />

            {isChangingStatus
              ? "Updating..."
              : "Update Status"}
          </button>
        </div>

        {/* SUMMARY */}

        <div
          className="
            rounded-2xl
            border border-gray-200
            bg-white p-6
            shadow-sm

            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">
            Order Summary
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {formatPrice(order.subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-gray-500">
                Discount
              </span>

              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {formatPrice(order.discount)}
              </span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-gray-500">
                Delivery Fee
              </span>

              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {formatPrice(order.deliveryFee)}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  Total
                </span>

                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
              <p className="text-[11px] text-gray-400">
                Payment Method
              </p>

              <p className="mt-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                {order.paymentMethod}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-gray-400">
                Payment Status
              </p>

              <p className="mt-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                {order.paymentStatus}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          STATUS HISTORY
      ========================= */}

      <div
        className="
          rounded-2xl
          border border-gray-200
          bg-white p-6
          shadow-sm

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div className="mb-5 flex items-center gap-3">
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-emerald-50
              text-emerald-600

              dark:bg-emerald-950/50
              dark:text-emerald-400
            "
          >
            <Clock3 size={19} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              Status History
            </h2>

            <p className="text-xs text-gray-400">
              Order status changes
            </p>
          </div>
        </div>

        {order.statusHistory.length === 0 ? (
          <p className="text-xs text-gray-400">
            No status history
          </p>
        ) : (
          <div className="space-y-3">
            {order.statusHistory.map(
              (history) => (
                <div
                  key={history.id}
                  className="
                    flex flex-col gap-3
                    rounded-xl
                    border border-gray-100
                    p-4

                    sm:flex-row
                    sm:items-center
                    sm:justify-between

                    dark:border-gray-800
                  "
                >
                  <div>
                    <span
                      className={`
                        inline-flex rounded-full
                        px-3 py-1
                        text-[11px] font-semibold

                        ${getStatusClass(
                          history.status,
                        )}
                      `}
                    >
                      {getStatusLabel(
                        history.status,
                      )}
                    </span>

                    {history.comment && (
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {history.comment}
                      </p>
                    )}
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(
                        history.createdAt,
                      )}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-400">
                      Changed by{" "}
                      {history.changedBy}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;