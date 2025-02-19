import Footer from "../components/Footer";
import Navbar from "../components/Home/Navbar";
import faq from "../assets/FAQ.svg";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section className="py-20 min-h-[calc(100vh-30px)] bg-base-200 ">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        <p className="text-center mb-8">
          Learn more about our Micro Tasking & Earning Platform and how it
          benefits you.
        </p>
        <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row justify-center items-center gap-10">
          <div>
            <div className="max-w-2xl mx-auto">
              <div className="collapse collapse-arrow bg-base-100 shadow-md">
                <input type="radio" name="faq" defaultChecked />
                <div className="collapse-title text-lg font-medium">
                  What is this platform about?
                </div>
                <div className="collapse-content">
                  <p>
                    Our platform connects users with micro-tasks that they can
                    complete to earn money. Tasks range from data entry to
                    creative design and testing applications.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 shadow-md mt-2">
                <input type="radio" name="faq" />
                <div className="collapse-title text-lg font-medium">
                  How do I earn money?
                </div>
                <div className="collapse-content">
                  <p>
                    You can earn money by completing available tasks. Each task
                    has a specific payout, and once the task is approved, your
                    earnings are credited to your account.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 shadow-md mt-2">
                <input type="radio" name="faq" />
                <div className="collapse-title text-lg font-medium">
                  How do I withdraw my earnings?
                </div>
                <div className="collapse-content">
                  <p>
                    You can withdraw your earnings using various payment methods
                    such as PayPal, bank transfer, or mobile wallets. Minimum
                    withdrawal limits apply.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 shadow-md mt-2">
                <input type="radio" name="faq" />
                <div className="collapse-title text-lg font-medium">
                  Who can post tasks?
                </div>
                <div className="collapse-content">
                  <p>
                    Buyers or businesses can post tasks that need to be
                    completed. They set the task requirements, payout, and
                    deadline for completion.
                  </p>
                </div>
              </div>

              <div className="collapse collapse-arrow bg-base-100 shadow-md mt-2">
                <input type="radio" name="faq" />
                <div className="collapse-title text-lg font-medium">
                  How do I get started?
                </div>
                <div className="collapse-content">
                  <p>
                    Simply sign up for a free account, browse available tasks,
                    and start earning by completing tasks that match your skills
                    and interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <figure>
            <img src={faq} alt="faq" />
          </figure>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;
