import {
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

type CountrySale = {
  country: string;
  flag: string;
  sales: string;
  progress: number;
  change: number;
};

const countries: CountrySale[] = [
  {
    country: "United States",
    flag: "🇺🇸",
    sales: "30K",
    progress: 80,
    change: 25.8,
  },
  {
    country: "Brazil",
    flag: "🇧🇷",
    sales: "30K",
    progress: 60,
    change: -15.8,
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    sales: "25K",
    progress: 70,
    change: 35.8,
  },
];

const SalesByCountry = () => {
  return (
    <div className="border-t border-[#EAECF0] px-5 py-5 dark:border-gray-800">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#1D2939] dark:text-white">
          Sales by Country
        </h3>

        <span className="text-xs text-[#98A2B3] dark:text-gray-500">
          Sales
        </span>
      </div>

      <div className="space-y-5">
        {countries.map((item) => {
          const isPositive = item.change >= 0;

          return (
            <div
              key={item.country}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-xl">
                  {item.flag}
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#344054] dark:text-gray-200">
                    {item.sales}
                  </p>

                  <p className="truncate text-[10px] text-[#98A2B3]">
                    {item.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-[#F2F4F7] sm:block dark:bg-gray-800">
                  <div
                    style={{ width: `${item.progress}%` }}
                    className="h-full rounded-full bg-[#4CAF7A]"
                  />
                </div>

                <span
                  className={`
                    flex min-w-[58px] items-center justify-end
                    gap-1 text-[11px] font-semibold
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

                  {Math.abs(item.change)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="
          mt-6 w-full cursor-pointer rounded-full
          border border-[#DDE7E1]
          py-2.5 text-xs font-semibold
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