import useAuth from "../hooks/useAuth";
import useGetUser from "../hooks/useGetUser";
import { Link } from "react-router-dom";

const NavbarButtons = () => {
  const { user, logOut, theme, toggleTheme } = useAuth();
  const { userDB } = useGetUser();

  return user && user?.email ? (
    <>
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
          <li className="text-center mb-2">
            {user?.displayName} ({userDB?.role})
          </li>
          <li className="mb-2">
            <button onClick={toggleTheme} className="btn btn-primary btn-sm">
              {theme === "acid" ? "light" : "dark"}
            </button>
          </li>
          <li>
            <button onClick={logOut} className="btn btn-warning btn-sm">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  ) : (
    <Link to="/signin" className="btn btn-accent">
      Sign In
    </Link>
  );
};

export default NavbarButtons;
