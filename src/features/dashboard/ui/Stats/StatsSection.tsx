import type { DashboardKpis } from "../../types/dashboard.types";

import StatCard from "./StatCard";

interface StatsSectionProps {
  kpis: DashboardKpis;
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

const formatPeriod = (label: string) => {
  if (label === "7d") {
    return "Last 7 days";
  }

  if (label === "30d") {
    return "Last 30 days";
  }

  return label;
};

const StatsSection = ({
  kpis,
}: StatsSectionProps) => {
  const period = formatPeriod(kpis.label);

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Sales"
        value={formatNumber(
          kpis.totalSales.value,
        )}
        label="Sales"
        period={period}
        change={
          kpis.totalSales.changePercent
        }
        previous={formatNumber(
          kpis.totalSales.previousValue,
        )}
      />

      <StatCard
        title="Total Orders"
        value={formatNumber(
          kpis.totalOrders.value,
        )}
        period={period}
        change={
          kpis.totalOrders.changePercent
        }
        previous={formatNumber(
          kpis.totalOrders.previousValue,
        )}
      />

      <StatCard
        title="Canceled Orders"
        value={formatNumber(
          kpis.cancelled.value,
        )}
        period={period}
        change={
          kpis.cancelled.changePercent
        }
        previous={formatNumber(
          kpis.cancelled.previousValue,
        )}
      />
    </section>
  );
};

export default StatsSection;