import { useEffect } from "react";
import Banner from "../components/Hero/Banner";

const Home = () => {
  
  useEffect(() => {
    document.title = "Earnify | Home";
  }, []);

  return (
    <>
      <Banner />
    </>
  );
};

export default Home;
