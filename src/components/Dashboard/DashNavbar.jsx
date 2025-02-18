import { Link } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { BsCoin } from "react-icons/bs";
import NavbarButtons from "../NavbarButtons";
import useGetUser from "../../hooks/useGetUser";
import NotificationModal from "./NotificationModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";

const DashNavbar = () => {
  const { theme } = useAuth();
  const { userDB } = useGetUser();
  const [open, setOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const { data: userNotifications = {}, isLoading } = useQuery({
    queryKey: ["userNotications"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/notification?email=${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <header className="bg-secondary">
      <div className="navbar justify-between w-11/12 mx-auto">
        <div className="navbar-start">
          <Link
            to="/"
            className="btn btn-ghost rounded-full px-2 md:px-4 md:text-xl"
          >
            <BsCoin />
            Earnify
          </Link>
        </div>
        <div className="navbar-end space-x-1">
          <button className="btn btn-ghost px-0 md:px-4">
            {userDB?.coin}
            <BsCoin />
          </button>
          <NavbarButtons />
          <button className="btn btn-ghost btn-circle">
            <div className="indicator" onClick={() => setOpen(true)}>
              <FaBell className="h-5 w-5" />
              <span className="badge badge-xs badge-primary indicator-item">
                {userNotifications?.data?.length}
              </span>
            </div>
          </button>
          <label htmlFor="my-drawer-2" className="drawer-button md:hidden">
            <FaBars />
          </label>
        </div>
      </div>
      <NotificationModal
        isOpen={open}
        setIsOpen={setOpen}
        notifications={userNotifications.data}
      />
    </header>
  );
};

export default DashNavbar;
