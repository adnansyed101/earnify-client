import { useEffect } from "react";
import Banner from "../components/Home/Hero/Banner";
import BestWorkerSection from "../components/Home/BestWorkerSection";
import Newsletter from "../components/Home/Newsletter";
import TestimonialSection from "../components/Home/TestimonialSection";
import HowItWorks from "../components/Home/HowItWorks";
import BenefitsOfJoining from "../components/Home/BenefitsOfJoining";
import Pricing from "../components/Home/Pricing";
import CallToAction from "../components/Home/CallToAction";
import SuccessStories from "../components/Home/SuccessStories";
import LivePlatformStats from "../components/Home/LivePlatformStats";

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
      <SuccessStories />
      <LivePlatformStats />
      <Pricing />
      <CallToAction />
      <TestimonialSection />
      <Newsletter />
    </>
  );
};

export default Home;
