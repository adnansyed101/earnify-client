import { Link } from "react-router-dom";
import { FaBars, FaBell } from "react-icons/fa";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { BsCoin } from "react-icons/bs";
import useGetUser from "../../hooks/useGetUser";

const Navbar = () => {
  const { user, logOut, theme, toggleTheme } = useAuth();
  const { userDB } = useGetUser();

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const logBtns =
    user && user?.email ? (
      <>
        <button className="btn btn-ghost px-0 md:px-4">
          1000
          <BsCoin />
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Photo"
                src={user?.photoURL}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li className="text-center mb-2">{user?.displayName} ({userDB.role})</li>
            <li className="mb-2">
              <button onClick={toggleTheme} className="btn btn-primary btn-sm">
                {theme === "acid" ? "light" : "Dark"}
              </button>
            </li>
            <li>
              <button onClick={logOut} className="btn btn-warning btn-sm">
                Logout
              </button>
            </li>
          </ul>
        </div>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FaBell className="h-5 w-5" />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle">
          <FaBars />
        </button>
      </>
    ) : (
      <div className="flex flex-col md:flex-row gap-1">
        <Link to="/signin" className="btn btn-xs md:btn-md btn-accent">
          Sign In
        </Link>
        <Link to="/signup" className="btn btn-xs md:btn-md  btn-secondary">
          Sign Up
        </Link>
      </div>
    );

  return (
    <header className="fixed top-2 z-50 w-full">
      <div className="navbar justify-between py-0 w-11/12 mx-auto bg-base-300 rounded-full">
        <div className="navbar-start">
          <Link
            to="/"
            className="btn btn-ghost rounded-full px-2 md:px-4 md:text-xl"
          >
            <BsCoin />
            Earnify
          </Link>
        </div>
        <div className="navbar-end space-x-1">{logBtns}</div>
      </div>
    </header>
  );
};

export default Navbar;
