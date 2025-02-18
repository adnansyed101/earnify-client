import { Outlet } from "react-router-dom";
import DashNavbar from "../components/Dashboard/DashNavbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import useGetUser from "../hooks/useGetUser";
import BuyerMenu from "../components/Dashboard/Menu/BuyerMenu";
import WorkerMenu from "../components/Dashboard/Menu/WorkerMenu";
import AdminMenu from "../components/Dashboard/Menu/AdminMenu";

const Dashboard = () => {
  const { userDB } = useGetUser();
  const role = userDB?.role;

  useEffect(() => {
    document.title = "Earnify | Dashboard Home";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <DashNavbar />
      {/* Dashboard Content */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-2 md:p-6 bg-base-200">
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-accent text-base-content min-h-full w-60 md:w-72 p-4 gap-2">
            {/* Sidebar content here */}
            {role === "Buyer" && <BuyerMenu />}
            {role === "Worker" && <WorkerMenu />}
            {role === "Admin" && <AdminMenu />}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
