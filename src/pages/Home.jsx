import { useEffect } from "react";
import Banner from "../components/Hero/Banner";
import BestWorkerSection from "../components/BestWorkerSection";

const Home = () => {
  useEffect(() => {
    document.title = "Earnify | Home";
  }, []);

  return (
    <>
      <Banner />
      <BestWorkerSection />
    </>
  );
};

export default Home;
