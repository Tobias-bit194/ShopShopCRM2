import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  Mail,
  MapPin,
  Package,
  Phone,
  ReceiptText,
  ShoppingBag,
  Star,
  User,
  Wallet,
} from "lucide-react";

import useCustomerDetails from "../hooks/useCustomerDetails";

const CustomerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    customer,
    isLoading,
    error,
  } = useCustomerDetails(id);

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <div
        className="
          rounded-2xl
          border border-[#EAECF0]
          bg-white
          p-10 text-center
          text-xs text-[#98A2B3]
          shadow-sm

          dark:border-gray-800
          dark:bg-gray-900
          dark:text-gray-500
        "
      >
        Loading customer...
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate("/customers")}
          className="
            flex cursor-pointer
            items-center gap-2
            text-xs font-semibold
            text-[#667085]
            transition

            hover:text-[#48A375]

            dark:text-gray-400
            dark:hover:text-emerald-400
          "
        >
          <ArrowLeft size={15} />
          Back to Customers
        </button>

        <div
          className="
            rounded-2xl
            border border-red-200
            bg-red-50
            p-8 text-center
            text-xs text-red-500

            dark:border-red-900
            dark:bg-red-950/30
            dark:text-red-400
          "
        >
          {error}
        </div>
      </div>
    );
  }

  /* =========================
     NO CUSTOMER
  ========================= */

  if (!customer) {
    return (
      <div
        className="
          rounded-2xl
          border border-[#EAECF0]
          bg-white
          p-10 text-center
          text-xs text-[#98A2B3]

          dark:border-gray-800
          dark:bg-gray-900
          dark:text-gray-500
        "
      >
        Customer not found
      </div>
    );
  }

  const fullName =
    `${customer.firstName} ${customer.lastName}`.trim();

  const initials =
    `${customer.firstName?.[0] ?? ""}${customer.lastName?.[0] ?? ""}`
      .toUpperCase();

  const registeredDate = new Date(
    customer.createdAt,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* =========================
          BACK
      ========================= */}

      <button
        type="button"
        onClick={() => navigate("/customers")}
        className="
          flex cursor-pointer
          items-center gap-2
          text-xs font-semibold
          text-[#667085]
          transition

          hover:text-[#48A375]

          dark:text-gray-400
          dark:hover:text-emerald-400
        "
      >
        <ArrowLeft size={15} />
        Back to Customers
      </button>

      {/* =========================
          CUSTOMER HEADER
      ========================= */}

      <div
        className="
          flex flex-col justify-between
          gap-5 rounded-2xl
          border border-[#EAECF0]
          bg-white p-6
          shadow-sm

          md:flex-row
          md:items-center

          dark:border-gray-800
          dark:bg-gray-900
        "
      >
        <div className="flex items-center gap-4">
          {/* Avatar */}

          <div
            className="
              flex h-16 w-16
              shrink-0 items-center
              justify-center overflow-hidden
              rounded-2xl
              bg-[#EAF5EF]
              text-lg font-bold
              text-[#48A375]

              dark:bg-emerald-950/40
              dark:text-emerald-400
            "
          >
            {customer.avatar ? (
              <img
                src={customer.avatar}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              initials || <User size={22} />
            )}
          </div>

          {/* Information */}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1
                className="
                  text-xl font-bold
                  text-[#344054]

                  dark:text-gray-100
                "
              >
                {fullName}
              </h1>

              <span
                className={`
                  inline-flex rounded-full
                  px-2.5 py-1
                  text-[10px] font-semibold

                  ${
                    customer.isActive
                      ? `
                          bg-emerald-50
                          text-emerald-600

                          dark:bg-emerald-950/40
                          dark:text-emerald-400
                        `
                      : `
                          bg-gray-100
                          text-gray-500

                          dark:bg-gray-800
                          dark:text-gray-400
                        `
                  }
                `}
              >
                {customer.isActive
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <div
              className="
                mt-2 flex flex-wrap
                items-center gap-x-4 gap-y-2
                text-[11px]
                text-[#98A2B3]

                dark:text-gray-500
              "
            >
              <span className="flex items-center gap-1.5">
                <Mail size={12} />
                {customer.email}
              </span>

              <span className="flex items-center gap-1.5">
                <Phone size={12} />
                {customer.phone || "No phone"}
              </span>
            </div>
          </div>
        </div>

        <div
          className="
            flex items-center gap-2
            text-[11px]
            text-[#98A2B3]

            dark:text-gray-500
          "
        >
          <CalendarDays size={14} />

          Customer since {registeredDate}
        </div>
      </div>

      {/* =========================
          STATISTICS
      ========================= */}

      <div
        className="
          grid grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <StatCard
          title="Total Orders"
          value={customer.totalOrders.toLocaleString()}
          icon={<ShoppingBag size={18} />}
        />

        <StatCard
          title="Delivered Orders"
          value={customer.deliveredOrders.toLocaleString()}
          icon={<CheckCircle2 size={18} />}
        />

        <StatCard
          title="Total Spent"
          value={`${customer.totalSpent.toLocaleString()} UZS`}
          icon={<Wallet size={18} />}
        />

        <StatCard
          title="Average Order"
          value={`${customer.averageOrderValue.toLocaleString()} UZS`}
          icon={<ReceiptText size={18} />}
        />
      </div>

      {/* =========================
          CONTENT
      ========================= */}

      <div
        className="
          grid grid-cols-1
          gap-6
          xl:grid-cols-3
        "
      >
        {/* LEFT */}

        <div className="space-y-6 xl:col-span-2">
          <CustomerSection
            title="Orders"
            description="Customer order history."
            icon={<ShoppingBag size={16} />}
            count={customer.orders.length}
            emptyText="No orders found"
          />

          <CustomerSection
            title="Purchased Products"
            description="Products purchased by this customer."
            icon={<Package size={16} />}
            count={customer.purchasedProducts.length}
            emptyText="No purchased products"
          />

          <CustomerSection
            title="Reviews"
            description="Reviews submitted by the customer."
            icon={<Star size={16} />}
            count={customer.reviews.length}
            emptyText="No reviews found"
          />
        </div>

        {/* RIGHT */}

        <div className="space-y-6">
          {/* Addresses */}

          <CustomerSection
            title="Addresses"
            description="Saved delivery addresses."
            icon={<MapPin size={16} />}
            count={customer.addresses.length}
            emptyText="No addresses saved"
          />

          {/* Wishlist */}

          <CustomerSection
            title="Wishlist"
            description="Products saved for later."
            icon={<Heart size={16} />}
            count={
              customer.wishlist?.items.length ?? 0
            }
            emptyText="Wishlist is empty"
          />

          {/* Activity */}

          <div
            className="
              rounded-2xl
              border border-[#EAECF0]
              bg-white p-5
              shadow-sm

              dark:border-gray-800
              dark:bg-gray-900
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Clock3
                    size={16}
                    className="
                      text-[#48A375]
                      dark:text-emerald-400
                    "
                  />

                  <h2
                    className="
                      text-sm font-bold
                      text-[#344054]

                      dark:text-gray-100
                    "
                  >
                    Recent Activity
                  </h2>
                </div>

                <p
                  className="
                    mt-1 text-[10px]
                    text-[#98A2B3]

                    dark:text-gray-500
                  "
                >
                  Customer account activity.
                </p>
              </div>

              <span
                className="
                  rounded-full
                  bg-[#F2F7F4]
                  px-2.5 py-1
                  text-[10px] font-semibold
                  text-[#48A375]

                  dark:bg-emerald-950/30
                  dark:text-emerald-400
                "
              >
                {customer.activities.length}
              </span>
            </div>

            {customer.activities.length === 0 ? (
              <EmptyState text="No activity found" />
            ) : (
              <div className="mt-5 space-y-4">
                {customer.activities.map(
                  (activity) => (
                    <div
                      key={activity.id}
                      className="
                        flex items-start gap-3
                        border-b border-[#F2F4F7]
                        pb-4 last:border-0
                        last:pb-0

                        dark:border-gray-800
                      "
                    >
                      <div
                        className="
                          mt-0.5 flex h-8 w-8
                          shrink-0 items-center
                          justify-center
                          rounded-lg
                          bg-[#F2F7F4]
                          text-[#48A375]

                          dark:bg-emerald-950/30
                          dark:text-emerald-400
                        "
                      >
                        <Clock3 size={13} />
                      </div>

                      <div className="min-w-0">
                        <p
                          className="
                            text-[11px]
                            font-semibold
                            text-[#344054]

                            dark:text-gray-200
                          "
                        >
                          {formatActivityType(
                            activity.type,
                          )}
                        </p>

                        <p
                          className="
                            mt-1 text-[10px]
                            text-[#98A2B3]

                            dark:text-gray-500
                          "
                        >
                          {formatDateTime(
                            activity.createdAt,
                          )}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================
   STAT CARD
========================= */

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({
  title,
  value,
  icon,
}: StatCardProps) => {
  return (
    <div
      className="
        flex items-center gap-4
        rounded-2xl
        border border-[#EAECF0]
        bg-white p-5
        shadow-sm

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      <div
        className="
          flex h-10 w-10
          shrink-0 items-center
          justify-center
          rounded-xl
          bg-[#EAF5EF]
          text-[#48A375]

          dark:bg-emerald-950/40
          dark:text-emerald-400
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-medium
            text-[#98A2B3]

            dark:text-gray-500
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1 truncate
            text-base font-bold
            text-[#344054]

            dark:text-gray-100
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
};

/* =========================
   CUSTOMER SECTION
========================= */

interface CustomerSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  emptyText: string;
}

const CustomerSection = ({
  title,
  description,
  icon,
  count,
  emptyText,
}: CustomerSectionProps) => {
  return (
    <div
      className="
        rounded-2xl
        border border-[#EAECF0]
        bg-white p-5
        shadow-sm

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="
                text-[#48A375]
                dark:text-emerald-400
              "
            >
              {icon}
            </span>

            <h2
              className="
                text-sm font-bold
                text-[#344054]

                dark:text-gray-100
              "
            >
              {title}
            </h2>
          </div>

          <p
            className="
              mt-1 text-[10px]
              text-[#98A2B3]

              dark:text-gray-500
            "
          >
            {description}
          </p>
        </div>

        <span
          className="
            rounded-full
            bg-[#F2F7F4]
            px-2.5 py-1
            text-[10px] font-semibold
            text-[#48A375]

            dark:bg-emerald-950/30
            dark:text-emerald-400
          "
        >
          {count}
        </span>
      </div>

      {count === 0 ? (
        <EmptyState text={emptyText} />
      ) : (
        <div
          className="
            mt-5 rounded-xl
            border border-dashed
            border-[#D0D5DD]
            px-4 py-5
            text-center
            text-[11px]
            text-[#98A2B3]

            dark:border-gray-700
            dark:text-gray-500
          "
        >
          {count} {count === 1 ? "item" : "items"}
        </div>
      )}
    </div>
  );
};

/* =========================
   EMPTY STATE
========================= */

const EmptyState = ({
  text,
}: {
  text: string;
}) => {
  return (
    <div
      className="
        mt-5 rounded-xl
        border border-dashed
        border-[#D0D5DD]
        px-4 py-6
        text-center
        text-[11px]
        text-[#98A2B3]

        dark:border-gray-700
        dark:text-gray-500
      "
    >
      {text}
    </div>
  );
};

/* =========================
   HELPERS
========================= */

const formatActivityType = (
  type: string,
) => {
  return type
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1),
    )
    .join(" ");
};

const formatDateTime = (
  value: string,
) => {
  return new Date(value).toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
};

export default CustomerDetailsPage;