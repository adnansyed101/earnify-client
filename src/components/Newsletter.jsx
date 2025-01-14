const Newsletter = () => {
  return (
    <div className="newsletter">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-xl md:text-5xl font-bold">
            Subscribe to our Newsletter
          </h1>
          <p className="text-lg py-6">
            Get the latest updates and news right in your inbox
          </p>
          <form>
            <fieldset className="flex flex-col md:flex-row justify-center gap-2">
              <input
                type="text"
                placeholder="Enter your email"
                className="input input-bordered mb-4 "
              />
              <button className="btn btn-primary">Subscribe</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
