import { useState } from "react";
import RevenueChart from "./RevenueChart";

type Period = "current" | "previous";

const reportStats = [
    {
        value: "52K",
        label: "Customers",
    },
    {
        value: "3.5K",
        label: "Total Products",
    },
    {
        value: "2.5K",
        label: "Stock Products",
    },
    {
        value: "0.5K",
        label: "Out of Stock",
    },
    {
        value: "$250K",
        label: "Revenue",
    },
];

const WeeklyReport = () => {
    const [period, setPeriod] = useState<Period>("current");

    return (
        <section
            className="
        rounded-2xl border border-[#EAECF0]
        bg-white p-6
        dark:border-gray-800 dark:bg-gray-900
      "
        >
            {/* Header */}
            <div className="mb-7 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-[#1D2939] dark:text-white">
                        Report for this week
                    </h2>

                    <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
                        Overview of your store performance
                    </p>
                </div>

                {/* Period switch */}
                <div className="relative flex rounded-full bg-[#F2F7F4] p-1 dark:bg-gray-800">
                    {/* Sliding background */}
                    <div
                        className={`
      absolute bottom-1 top-1 w-[calc(50%-4px)]
      rounded-full bg-white shadow-sm
      transition-transform duration-300 ease-in-out
      dark:bg-gray-700
      ${period === "previous" ? "translate-x-full" : "translate-x-0"}
    `}
                    />

                    <button
                        type="button"
                        onClick={() => setPeriod("current")}
                        className={`
      relative z-10 cursor-pointer rounded-full
      px-4 py-2 text-xs font-semibold
      transition-colors duration-300
      ${period === "current"
                                ? "text-[#3F9F6F] dark:text-emerald-400"
                                : "text-[#98A2B3] hover:text-[#667085] dark:text-gray-500"
                            }
    `}
                    >
                        This week
                    </button>

                    <button
                        type="button"
                        onClick={() => setPeriod("previous")}
                        className={`
      relative z-10 cursor-pointer rounded-full
      px-4 py-2 text-xs font-semibold
      transition-colors duration-300
      ${period === "previous"
                                ? "text-[#3F9F6F] dark:text-emerald-400"
                                : "text-[#98A2B3] hover:text-[#667085] dark:text-gray-500"
                            }
    `}
                    >
                        Last week
                    </button>
                </div>
            </div>

            {/* Statistics */}
            <div className="mb-6 grid grid-cols-5 gap-5">
                {reportStats.map((item) => (
                    <div key={item.label}>
                        <p className="text-xl font-bold text-[#1D2939] dark:text-white">
                            {item.value}
                        </p>

                        <p className="mt-1 text-xs text-[#98A2B3] dark:text-gray-500">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div
                className="
          overflow-hidden rounded-xl
          border border-[#EAF2ED]
          bg-white px-2 pt-3
          dark:border-gray-800 dark:bg-gray-900
        "
            >
                <RevenueChart />
            </div>
        </section>
    );
};

export default WeeklyReport;