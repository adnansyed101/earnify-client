import { Outlet } from "react-router-dom";
import DashNavbar from "../components/Dashboard/DashNavbar";
import Footer from "../components/Home/Footer";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Earnify | Dashboard Home";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DashNavbar />
      {/* Dashboard Content */}
      <Outlet />
      <Footer />
    </>
  );
};

export default Dashboard;
