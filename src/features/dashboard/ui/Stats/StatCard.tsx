import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MoreOutlined,
} from "@ant-design/icons";

type StatCardProps = {
  title: string;
  period?: string;
  value: string;
  label?: string;
  change?: number;
  previous?: string;
  onDetails?: () => void;
};

const StatCard = ({
  title,
  period = "Last 7 days",
  value,
  label,
  change,
  previous,
  onDetails,
}: StatCardProps) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className="
        rounded-2xl border border-[#EAECF0]
        bg-white p-5
        transition-colors
        dark:border-gray-800 dark:bg-gray-900
      "
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-[#667085] dark:text-gray-400">
            {title}
          </h3>

          <p className="mt-0.5 text-xs text-[#98A2B3] dark:text-gray-500">
            {period}
          </p>
        </div>

        <button
          type="button"
          className="
            flex h-8 w-8 cursor-pointer items-center justify-center
            rounded-lg text-[#98A2B3]
            transition hover:bg-[#F5F7F9] hover:text-[#344054]
            dark:hover:bg-gray-800 dark:hover:text-gray-200
          "
        >
          <MoreOutlined />
        </button>
      </div>

      <div className="mb-5 flex flex-wrap items-end gap-3">
        <span className="text-[28px] font-bold leading-none text-[#1D2939] dark:text-white">
          {value}
        </span>

        {label && (
          <span className="text-sm font-medium text-[#667085] dark:text-gray-400">
            {label}
          </span>
        )}

        {change !== undefined && (
          <span
            className={`
              flex items-center gap-1 text-xs font-semibold
              ${
                isPositive
                  ? "text-[#3F9F6F]"
                  : "text-[#F04438]"
              }
            `}
          >
            {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}

            {Math.abs(change)}%
          </span>
        )}
      </div>

      <div className="flex min-h-10 items-center justify-between border-t border-[#F0F1F3] pt-4 dark:border-gray-800">
        {previous ? (
          <p className="text-xs text-[#98A2B3] dark:text-gray-500">
            Previous 7 days{" "}
            <span className="font-semibold text-[#3F9F6F]">
              {previous}
            </span>
          </p>
        ) : (
          <span />
        )}

        <button
          type="button"
          onClick={onDetails}
          className="
            cursor-pointer rounded-full
            border border-[#4CAF7A]
            px-4 py-1.5
            text-xs font-semibold text-[#3F9F6F]
            transition
            hover:bg-[#EAF7F0]
            dark:hover:bg-emerald-950/40
          "
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default StatCard;