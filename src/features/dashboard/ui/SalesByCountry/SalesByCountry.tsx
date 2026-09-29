import {
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

import type { SalesByCountryItem } from "../../types/dashboard.types";

interface SalesByCountryProps {
  data: SalesByCountryItem[];
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

const SalesByCountry = ({
  data,
}: SalesByCountryProps) => {
  return (
    <div className="border-t border-[#EAECF0] px-5 py-5 dark:border-gray-800">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#1D2939] dark:text-white">
          Sales by Region
        </h3>

        <span className="text-xs text-[#98A2B3] dark:text-gray-500">
          Sales
        </span>
      </div>

      <div className="space-y-5">
        {data.map((item) => {
          const isPositive =
            item.changePercent >= 0;

          return (
            <div
              key={item.code}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                {/* Region code */}
                <div
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-[#EAF7F0]
                    text-[10px] font-bold
                    text-[#3F9F6F]

                    dark:bg-emerald-950/40
                    dark:text-emerald-400
                  "
                >
                  {item.code}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#344054] dark:text-gray-200">
                    {formatNumber(
                      item.sales,
                    )}
                  </p>

                  <p className="truncate text-[10px] text-[#98A2B3]">
                    {item.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-[#F2F4F7] sm:block dark:bg-gray-800">
                  <div
                    style={{
                      width: `${Math.min(
                        Math.max(
                          item.share,
                          0,
                        ),
                        100,
                      )}%`,
                    }}
                    className="h-full rounded-full bg-[#4CAF7A] transition-all duration-500"
                  />
                </div>

                <span
                  className={`
                    flex min-w-[58px]
                    items-center justify-end
                    gap-1 text-[11px]
                    font-semibold

                    ${
                      isPositive
                        ? "text-[#3F9F6F]"
                        : "text-[#F04438]"
                    }
                  `}
                >
                  {isPositive ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )}

                  {Math.abs(
                    item.changePercent,
                  )}
                  %
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="
          mt-6 w-full cursor-pointer
          rounded-full
          border border-[#DDE7E1]
          py-2.5 text-xs
          font-semibold
          text-[#3F9F6F]
          transition

          hover:border-[#4CAF7A]
          hover:bg-[#EAF7F0]

          dark:border-gray-800
          dark:hover:bg-emerald-950/30
        "
      >
        View Insight
      </button>
    </div>
  );
};

export default SalesByCountry;