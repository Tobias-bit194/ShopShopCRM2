import {
  MoreVertical,
  Plus,
} from "lucide-react";

const OrdersHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Order List
        </h1>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Manage and track customer orders.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="
            flex cursor-pointer items-center gap-2
            rounded-xl bg-emerald-600
            px-4 py-2
            text-xs font-semibold text-white
            shadow-sm transition-colors

            hover:bg-emerald-700

            dark:bg-emerald-500
            dark:hover:bg-emerald-600
          "
        >
          <Plus size={16} />
          Add Order
        </button>

        <button
          type="button"
          className="
            flex cursor-pointer items-center gap-2
            rounded-xl border border-gray-200
            bg-white px-4 py-2
            text-xs font-semibold text-gray-700
            shadow-sm transition-colors

            hover:bg-gray-50

            dark:border-gray-800
            dark:bg-gray-900
            dark:text-gray-300
            dark:hover:bg-gray-800
          "
        >
          More Action

          <MoreVertical size={14} />
        </button>
      </div>
    </div>
  );
};

export default OrdersHeader;