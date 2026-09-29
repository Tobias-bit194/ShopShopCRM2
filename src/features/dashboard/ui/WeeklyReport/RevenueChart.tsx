import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

import type { WeeklyChartItem } from "../../types/dashboard.types";

interface RevenueChartProps {
  data: WeeklyChartItem[];
}

const RevenueChart = ({
  data,
}: RevenueChartProps) => {
  const values = data.map(
    (item) => item.revenue,
  );

  const maxValue = Math.max(
    ...values,
    0,
  );

  const yAxisMax =
    maxValue > 0
      ? Math.ceil(maxValue * 1.2)
      : 100;

  const series = [
    {
      name: "Revenue",
      data: values,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 280,

      toolbar: {
        show: false,
      },

      zoom: {
        enabled: false,
      },

      animations: {
        enabled: true,
        speed: 500,
      },

      background: "transparent",
      fontFamily: "inherit",
    },

    colors: ["#4CAF7A"],

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 3,
    },

    fill: {
      type: "gradient",

      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },

    xaxis: {
      categories: data.map(
        (item) => item.day,
      ),

      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },

      labels: {
        style: {
          colors: "#98A2B3",
          fontSize: "12px",
        },
      },
    },

    yaxis: {
      min: 0,
      max: yAxisMax,
      tickAmount: 5,

      labels: {
        formatter: (value) =>
          new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
          }).format(value),

        style: {
          colors: "#98A2B3",
          fontSize: "12px",
        },
      },
    },

    grid: {
      borderColor: "#EAECF0",
      strokeDashArray: 4,
    },

    tooltip: {
      theme: "light",

      y: {
        formatter: (value) =>
          new Intl.NumberFormat(
            "en-US",
          ).format(value),
      },
    },

    legend: {
      show: false,
    },
  };

  return (
    <div className="w-full">
      <Chart
        options={options}
        series={series}
        type="area"
        height={280}
      />
    </div>
  );
};

export default RevenueChart;