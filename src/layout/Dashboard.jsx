import { Outlet } from "react-router-dom";
import DashNavbar from "../components/Dashboard/DashNavbar";
import Footer from "../components/Home/Footer";
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
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
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
