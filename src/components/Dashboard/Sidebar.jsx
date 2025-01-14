import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="menu px-4 pt-20">
      <li className="font-semibold text-lg">
        <NavLink to="/dashboard">Home</NavLink>
      </li>
      <li className="font-semibold text-lg">
        <NavLink to="/dashboard/addItems">Add New Tasks</NavLink>
      </li>
      <li className="font-semibold text-lg">
        <NavLink to="/dashboard/manageItems">My Task&apos;s</NavLink>
      </li>
      <li className="font-semibold text-lg">
        <NavLink to="/dashboard/bookings">Purchase Coin</NavLink>
      </li>
      <li className="font-semibold text-lg">
        <NavLink to="/dashboard/users">Payment History</NavLink>
      </li>
    </ul>
  );
};

export default Sidebar;
