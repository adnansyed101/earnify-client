import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingPlans = [
    { id: 1, coins: 10, price: 1 },
    { id: 2, coins: 150, price: 10 },
    { id: 3, coins: 500, price: 20 },
    { id: 4, coins: 1000, price: 35 },
  ];

  return (
    <section className="py-10 bg-base-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Buy Coins</h2>
        <p className="mb-8">
          Purchase coins to unlock and complete tasks on our platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => (
            <div key={plan.id} className="card shadow-lg p-6 rounded-lg bg-base-100 border">
              <h3 className="text-2xl font-bold text-primary">
                {plan.coins} Coins
              </h3>
              <p className="ext-lg my-2">${plan.price}</p>
              <Link to={"/signin"} className="btn btn-primary w-full mt-4">
                Buy Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
