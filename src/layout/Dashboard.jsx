import { Outlet } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-accent">
          <Sidebar />
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
