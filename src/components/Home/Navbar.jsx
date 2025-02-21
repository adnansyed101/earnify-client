import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import NavbarButtons from "../NavbarButtons";

const Navbar = () => {
  const { user, theme } = useAuth();

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const mainMenu = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user && user?.email && (
        <li>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/aboutus">About Us</NavLink>
      </li>
      <li>
        <a href="https://github.com/adnansyed101" target="_blank" to="/">
          Join as Developer
        </a>
      </li>
    </>
  );

  return (
    <header className="fixed top-0 z-50 w-full bg-base-100 border-b-2">
      <div className="navbar justify-between mx-auto w-11/12">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <FaBars />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {mainMenu}
            </ul>
          </div>
          <Link to="/" className="font-semibold text-lg">
            Earnify
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{mainMenu}</ul>
        </div>
        <div className="navbar-end space-x-2">
          <NavbarButtons />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
