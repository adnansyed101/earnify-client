import { useEffect } from "react";
import Banner from "../components/Hero/Banner";
import BestWorkerSection from "../components/BestWorkerSection";
import Newsletter from "../components/Newsletter";
import TestimonialSection from "../components/TestimonialSection";

const Home = () => {
  useEffect(() => {
    document.title = "Earnify | Home";
  }, []);

  return (
    <>
      <Banner />
      <BestWorkerSection />
      <TestimonialSection />
      <Newsletter />
    </>
  );
};

export default Home;
