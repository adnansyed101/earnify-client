const HowItWorks = () => {
  const stepsForWorkers = [
    {
      title: "Browse Tasks",
      description: "Explore a variety of tasks available on the platform.",
      icon: "🛠️",
    },
    {
      title: "Complete Tasks",
      description: "Work on tasks you select and submit your work.",
      icon: "✅",
    },
    {
      title: "Get Paid",
      description: "Earn coins and withdraw them as real money securely.",
      icon: "💰",
    },
  ];

  const stepsForBuyers = [
    {
      title: "Post a Task",
      description: "Describe your task and set your budget.",
      icon: "📄",
    },
    {
      title: "Hire Workers",
      description: "Select qualified workers to complete your task.",
      icon: "👩‍💻",
    },
    {
      title: "Pay Upon Completion",
      description: "Approve submissions and release payments.",
      icon: "💸",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* For Workers */}
          <div className="card shadow-md p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              For Workers
            </h3>
            <ul>
              {stepsForWorkers.map((step, index) => (
                <li key={index} className="flex items-start mb-6">
                  <div className="text-4xl text-secondary mr-4">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{step.title}</h4>
                    <p className="font-thin">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* For Buyers */}
          <div className="card shadow-md p-6">
            <h3 className="text-2xl font-bold mb-4 text-primary">For Buyers</h3>
            <ul>
              {stepsForBuyers.map((step, index) => (
                <li key={index} className="flex items-start mb-6">
                  <div className="text-4xl text-secondary mr-4">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{step.title}</h4>
                    <p className="font-thin">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
