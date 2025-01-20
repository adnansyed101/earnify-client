import { Outlet } from "react-router-dom";
import DashNavbar from "../components/Dashboard/DashNavbar";
import Sidebar from "../components/Dashboard/Sidebar";
import Footer from "../components/Home/Footer";

const Dashboard = () => {
  return (
    <>
      <DashNavbar  />
      <div className="md:flex">
        {/* dashboard side bar */}
        <div className="min-w-50 min-h-screen bg-accent hidden lg:block">
          <Sidebar />
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-2 md:p-4">
          <Outlet />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Dashboard;
