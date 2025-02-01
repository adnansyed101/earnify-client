import { Navigate, Outlet } from "react-router-dom";
import DashNavbar from "../components/Dashboard/DashNavbar";
import Sidebar from "../components/Dashboard/Sidebar";
import Footer from "../components/Home/Footer";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Earnify | Dashboard Home";
    window.scrollTo(0, 0);
  }, []);

  if (!user?.emailVerified) {
    console.log("Hello world");

    toast.warn("Please verify your email.", {
      toastId: "verifyEmail",
    });
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <DashNavbar />
      <div className="md:flex">
        {/* dashboard side bar */}
        <div className="min-w-56 min-h-screen bg-accent hidden lg:block">
          <Sidebar />
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-2 md:p-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
