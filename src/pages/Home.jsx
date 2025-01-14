import { useEffect } from "react";
import Banner from "../components/Hero/Banner";
import BestWorkerSection from "../components/BestWorkerSection";
import Newsletter from "../components/Newsletter";

const Home = () => {
  useEffect(() => {
    document.title = "Earnify | Home";
  }, []);

  return (
    <>
      <Banner />
      <BestWorkerSection />
      <Newsletter />
    </>
  );
};

export default Home;
