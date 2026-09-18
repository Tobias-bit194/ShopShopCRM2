import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const series = [
  {
    name: "Revenue",
    data: [15000, 22000, 19000, 31000, 42000, 25000, 28000],
  },
];

const RevenueChart = () => {
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
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

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
      max: 50000,
      tickAmount: 5,

      labels: {
        formatter: (value) => `${value / 1000}k`,

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