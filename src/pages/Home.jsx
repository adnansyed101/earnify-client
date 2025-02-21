import { useEffect } from "react";
import Banner from "../components/Home/Hero/Banner";
import BestWorkerSection from "../components/Home/BestWorkerSection";
import Newsletter from "../components/Home/Newsletter";
import TestimonialSection from "../components/Home/TestimonialSection";
import HowItWorks from "../components/Home/HowItWorks";
import BenefitsOfJoining from "../components/Home/BenefitsOfJoining";
import Pricing from "../components/Home/Pricing";

const Home = () => {
  useEffect(() => {
    document.title = "Earnify | Home";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Banner />
      <HowItWorks />
      <BestWorkerSection />
      <BenefitsOfJoining />
      <Pricing />
      <TestimonialSection />
      <Newsletter />
    </>
  );
};

export default Home;
