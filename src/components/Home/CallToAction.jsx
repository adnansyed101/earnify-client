import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Start Earning Today!</h2>
        <p className="text-lg mb-6">
          Join thousands of freelancers and start completing micro-tasks for
          real earnings.
        </p>
        <Link to={"/signup"} className="btn btn-primary px-6 py-3 text-lg">
          Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
