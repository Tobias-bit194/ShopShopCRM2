import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  UserRound,
} from "lucide-react";

import { updateCustomerStatus } from "../../services/customers.service";

import type { Customer } from "../../types/customers.types";

interface CustomersTableProps {
  customers: Customer[];
  isLoading: boolean;
  onSuccess?: () => void | Promise<void>;
}

const CustomersTable = ({
  customers,
  isLoading,
  onSuccess,
}: CustomersTableProps) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [updatingCustomerId, setUpdatingCustomerId] =
    useState<string | null>(null);

  const pageSize = 10;

  /* =========================
     SEARCH
  ========================= */

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return customers;
    }

    return customers.filter((customer) => {
      const fullName =
        `${customer.firstName} ${customer.lastName}`.toLowerCase();

      return (
        fullName.includes(query) ||
        customer.firstName.toLowerCase().includes(query) ||
        customer.lastName.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone?.toLowerCase().includes(query)
      );
    });
  }, [customers, search]);

  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / pageSize),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const paginatedCustomers = filteredCustomers.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize,
  );

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  /* =========================
     CUSTOMER DETAILS
  ========================= */

  const handleViewCustomer = (id: string) => {
    navigate(`/customers/${id}`);
  };

  /* =========================
     STATUS
  ========================= */

  const handleStatusChange = async (
    customer: Customer,
  ) => {
    if (updatingCustomerId) return;

    const nextStatus = !customer.isActive;

    const action = nextStatus
      ? "activate"
      : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} "${customer.firstName} ${customer.lastName}"?`,
    );

    if (!confirmed) return;

    try {
      setUpdatingCustomerId(customer.id);

      await updateCustomerStatus(
        customer.id,
        nextStatus,
      );

      await onSuccess?.();
    } catch (error) {
      console.error(
        "Failed to update customer status:",
        error,
      );

      window.alert(
        "Failed to update customer status.",
      );
    } finally {
      setUpdatingCustomerId(null);
    }
  };

  /* =========================
     HELPERS
  ========================= */

  const formatPrice = (value: number) => {
    return `${value.toLocaleString()} UZS`;
  };

  const formatDate = (value: string) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (customer: Customer) => {
    const first = customer.firstName
      ?.charAt(0)
      .toUpperCase();

    const last = customer.lastName
      ?.charAt(0)
      .toUpperCase();

    return `${first || ""}${last || ""}` || "U";
  };

  return (
    <div
      className="
        space-y-6 rounded-2xl
        border border-[#EAECF0]
        bg-white p-6
        shadow-sm
        transition-colors

        dark:border-gray-800
        dark:bg-gray-900
      "
    >
      {/* Toolbar */}
      <div
        className="
          flex flex-col justify-between
          gap-4
          md:flex-row
          md:items-center
        "
      >
        <div>
          <h2
            className="
              text-base font-bold
              text-[#344054]
              dark:text-gray-100
            "
          >
            All Customers
          </h2>

          <p
            className="
              mt-1 text-[11px]
              text-[#98A2B3]
              dark:text-gray-500
            "
          >
            {filteredCustomers.length} customers
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search
            size={14}
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-[#98A2B3]
            "
          />

          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search customer"
            className="
              w-full rounded-xl
              border border-[#EAECF0]
              bg-[#F8FAF9]
              py-2.5 pl-9 pr-3
              text-xs text-[#344054]
              outline-none transition

              placeholder:text-[#98A2B3]

              focus:border-[#48A375]
              focus:bg-white
              focus:ring-2
              focus:ring-[#48A375]/10

              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-100
              dark:placeholder:text-gray-500
              dark:focus:bg-gray-800
            "
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr
              className="
                bg-[#F2F7F4]
                text-xs text-[#667085]

                dark:bg-gray-800
                dark:text-gray-300
              "
            >
              <th className="rounded-l-xl px-4 py-3 font-semibold">
                Customer
              </th>

              <th className="px-4 py-3 font-semibold">
                Phone
              </th>

              <th className="px-4 py-3 font-semibold">
                Orders
              </th>

              <th className="px-4 py-3 font-semibold">
                Total Spent
              </th>

              <th className="px-4 py-3 font-semibold">
                Reviews
              </th>

              <th className="px-4 py-3 font-semibold">
                Joined
              </th>

              <th className="px-4 py-3 font-semibold">
                Status
              </th>

              <th className="rounded-r-xl px-4 py-3 text-right font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody
            className="
              divide-y divide-[#F2F4F7]
              dark:divide-gray-800
            "
          >
            {isLoading ? (
              <tr>
                <td
                  colSpan={8}
                  className="
                    px-4 py-12
                    text-center
                    text-xs text-[#98A2B3]
                    dark:text-gray-500
                  "
                >
                  Loading customers...
                </td>
              </tr>
            ) : paginatedCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="
                    px-4 py-12
                    text-center
                    text-xs text-[#98A2B3]
                    dark:text-gray-500
                  "
                >
                  No customers found
                </td>
              </tr>
            ) : (
              paginatedCustomers.map((customer) => {
                const isUpdating =
                  updatingCustomerId === customer.id;

                return (
                  <tr 
                  onClick={() =>
                            handleViewCustomer(
                              customer.id,
                            )
                          }
                    key={customer.id}
                    className="
                      transition-colors
                      hover:bg-[#F8FAF9]
                      dark:hover:bg-gray-800/50
                    "
                  >
                    {/* Customer */}
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleViewCustomer(
                            customer.id,
                          )
                        }
                        className="
                          flex cursor-pointer
                          items-center gap-3
                          text-left
                        "
                      >
                        <div
                          className="
                            flex h-10 w-10
                            shrink-0
                            items-center justify-center
                            overflow-hidden
                            rounded-full
                            bg-[#ECF7F1]
                            text-[11px]
                            font-bold
                            text-[#48A375]

                            dark:bg-emerald-950/40
                            dark:text-emerald-400
                          "
                        >
                          {customer.avatar ? (
                            <img
                              src={customer.avatar}
                              alt={`${customer.firstName} ${customer.lastName}`}
                              className="
                                h-full w-full
                                object-cover
                              "
                            />
                          ) : customer.firstName ||
                            customer.lastName ? (
                            getInitials(customer)
                          ) : (
                            <UserRound size={16} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p
                            className="
                              max-w-[190px]
                              truncate
                              text-xs font-semibold
                              text-[#344054]
                              transition-colors

                              hover:text-[#48A375]

                              dark:text-gray-200
                              dark:hover:text-emerald-400
                            "
                          >
                            {customer.firstName}{" "}
                            {customer.lastName}
                          </p>

                          <p
                            className="
                              mt-1 max-w-[190px]
                              truncate
                              text-[10px]
                              text-[#98A2B3]
                              dark:text-gray-500
                            "
                          >
                            {customer.email}
                          </p>
                        </div>
                      </button>
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-3">
                      <span
                        className="
                          whitespace-nowrap
                          text-xs text-[#667085]
                          dark:text-gray-400
                        "
                      >
                        {customer.phone || "—"}
                      </span>
                    </td>

                    {/* Orders */}
                    <td className="px-4 py-3">
                      <span
                        className="
                          text-xs font-semibold
                          text-[#344054]
                          dark:text-gray-200
                        "
                      >
                        {customer.totalOrders}
                      </span>
                    </td>

                    {/* Total Spent */}
                    <td className="px-4 py-3">
                      <span
                        className="
                          whitespace-nowrap
                          text-xs font-semibold
                          text-[#344054]
                          dark:text-gray-200
                        "
                      >
                        {formatPrice(
                          customer.totalSpent,
                        )}
                      </span>
                    </td>

                    {/* Reviews */}
                    <td className="px-4 py-3">
                      <span
                        className="
                          text-xs text-[#667085]
                          dark:text-gray-400
                        "
                      >
                        {customer._count.reviews}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-3">
                      <span
                        className="
                          whitespace-nowrap
                          text-xs text-[#667085]
                          dark:text-gray-400
                        "
                      >
                        {formatDate(
                          customer.createdAt,
                        )}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
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
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div
                        className="
                          flex items-center
                          justify-end gap-2
                        "
                      >
                        <button
                          type="button"
                          title="View customer"
                          onClick={() =>
                            handleViewCustomer(
                              customer.id,
                            )
                          }
                          className="
                            cursor-pointer
                            rounded-lg p-2
                            text-[#98A2B3]
                            transition

                            hover:bg-[#F2F4F7]
                            hover:text-[#344054]

                            dark:hover:bg-gray-800
                            dark:hover:text-gray-200
                          "
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() =>
                            handleStatusChange(
                              customer,
                            )
                          }
                          className={`
                            cursor-pointer
                            whitespace-nowrap
                            rounded-lg
                            px-3 py-2
                            text-[10px]
                            font-semibold
                            transition

                            disabled:cursor-not-allowed
                            disabled:opacity-50

                            ${
                              customer.isActive
                                ? `
                                  bg-red-50
                                  text-red-500
                                  hover:bg-red-100

                                  dark:bg-red-950/30
                                  dark:text-red-400
                                  dark:hover:bg-red-950/50
                                `
                                : `
                                  bg-emerald-50
                                  text-emerald-600
                                  hover:bg-emerald-100

                                  dark:bg-emerald-950/30
                                  dark:text-emerald-400
                                  dark:hover:bg-emerald-950/50
                                `
                            }
                          `}
                        >
                          {isUpdating
                            ? "Updating..."
                            : customer.isActive
                              ? "Deactivate"
                              : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="
          flex items-center justify-between
          border-t border-[#EAECF0]
          pt-5

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
            border border-[#EAECF0]
            px-4 py-2
            text-xs font-semibold
            text-[#667085]
            transition

            hover:bg-[#F8FAF9]

            disabled:cursor-not-allowed
            disabled:opacity-40

            dark:border-gray-700
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          <ChevronLeft size={14} />
          Previous
        </button>

        <span
          className="
            text-xs font-medium
            text-[#98A2B3]
            dark:text-gray-500
          "
        >
          Page {safeCurrentPage} of {totalPages}
        </span>

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
            border border-[#EAECF0]
            px-4 py-2
            text-xs font-semibold
            text-[#667085]
            transition

            hover:bg-[#F8FAF9]

            disabled:cursor-not-allowed
            disabled:opacity-40

            dark:border-gray-700
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default CustomersTable;