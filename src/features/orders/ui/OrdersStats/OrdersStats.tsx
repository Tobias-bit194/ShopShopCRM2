import {
  ArrowDownRight,
  ArrowUpRight,
  MoreVertical,
} from "lucide-react";

const stats = [
  {
    title: "Total Orders",
    value: "1,240",
    change: "14.4%",
    trend: "up" as const,
  },
  {
    title: "New Orders",
    value: "240",
    change: "20%",
    trend: "up" as const,
  },
  {
    title: "Completed Orders",
    value: "960",
    change: "85%",
    trend: "neutral" as const,
  },
  {
    title: "Canceled Orders",
    value: "87",
    change: "5%",
    trend: "down" as const,
  },
];

const OrdersStats = () => {
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

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </span>

            <span
              className={`
                flex items-center
                text-sm font-medium

                ${
                  stat.trend === "down"
                    ? "text-rose-500 dark:text-rose-400"
                    : "text-emerald-600 dark:text-emerald-400"
                }
              `}
            >
              {stat.trend === "up" && (
                <ArrowUpRight size={16} />
              )}

              {stat.trend === "down" && (
                <ArrowDownRight size={16} />
              )}

              {stat.change}
            </span>
          </div>

          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Last 7 days
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrdersStats;