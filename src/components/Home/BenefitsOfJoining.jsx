const BenefitsOfJoining = () => {
  const workerBenefits = [
    {
      title: "Flexible Working Hours",
      description: "Work anytime, anywhere, and earn money at your own pace.",
      icon: "⏰",
    },
    {
      title: "Instant Payouts",
      description: "Get paid instantly for completed and approved tasks.",
      icon: "💵",
    },
    {
      title: "Diverse Opportunities",
      description: "Explore a wide range of tasks to match your skills.",
      icon: "🌍",
    },
  ];

  const buyerBenefits = [
    {
      title: "Affordable Workforce",
      description: "Get your tasks done at competitive rates.",
      icon: "💸",
    },
    {
      title: "High-Quality Work",
      description:
        "Hire skilled workers to complete your tasks with excellence.",
      icon: "🎯",
    },
    {
      title: "Seamless Task Management",
      description:
        "Post tasks, review submissions, and manage payments easily.",
      icon: "📋",
    },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Benefits of Joining
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* For Workers */}
          <div className="shadow-md p-6 rounded-lg border">
            <h3 className="text-2xl font-bold text-primary mb-4">
              For Workers
            </h3>
            <ul>
              {workerBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start mb-6">
                  <div className="text-4xl text-secondary mr-4">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{benefit.title}</h4>
                    <p className="font-light">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* For Buyers */}
          <div className="shadow-md p-6 rounded-lg border">
            <h3 className="text-2xl font-bold text-primary mb-4">For Buyers</h3>
            <ul>
              {buyerBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start mb-6">
                  <div className="text-4xl text-secondary mr-4">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold">{benefit.title}</h4>
                    <p className="font-light">{benefit.description}</p>
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

export default BenefitsOfJoining;
