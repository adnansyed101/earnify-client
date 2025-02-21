import CountUp from "react-countup";

const LivePlatformStats = () => {
  const stats = [
    { id: 1, label: "Total Users", value: 500, suffix: "+" },
    { id: 2, label: "Tasks Completed", value: 1000, suffix: "+" },
    {
      id: 3,
      label: "Total Earnings Paid",
      value: 2000,
      prefix: "$",
      suffix: "+",
    },
    { id: 4, label: "Active Jobs", value: 100, suffix: "+" },
  ];

  return (
    <section className="py-12 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-6">
          Live Platform Stats
        </h2>
        <p className="mb-8">See how our platform is growing every day.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className="shadow-lg p-6 rounded-lg border">
              <h3 className="text-3xl font-bold text-primary">
                {stat.prefix}
                <CountUp end={stat.value} duration={3} separator="," />
                {stat.suffix}
              </h3>
              <p className="text-lg mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LivePlatformStats;
