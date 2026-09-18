import StatCard from "./StatCard";

const StatsSection = () => {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Sales"
        value="$350K"
        label="Sales"
        change={10.4}
        previous="$235K"
      />

      <StatCard
        title="Total Orders"
        value="10.7K"
        change={14.4}
        previous="7.6K"
      />

      <StatCard
        title="Canceled Orders"
        value="94"
        change={-14.4}
        previous="110"
      />
    </section>
  );
};

export default StatsSection;