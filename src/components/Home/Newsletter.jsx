const Newsletter = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="shadow-md rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="font-light mb-6">
            Stay updated with the latest tasks, earning opportunities, and
            platform updates.
          </p>
          <form className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full md:w-2/3 lg:w-1/2"
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
          <p className="text-sm font-light mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
