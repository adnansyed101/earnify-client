import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="menu px-4 pt-20">
      <li className="font-semibold text-lg">
        <Link to="/dashboard">Home</Link>
      </li>
      <li className="font-semibold text-lg">
        <Link to="/dashboard/addTask">Add New Tasks</Link>
      </li>
      <li className="font-semibold text-lg">
        <Link to="/dashboard/myTasks">My Task&apos;s</Link>
      </li>
      <li className="font-semibold text-lg">
        <Link to="/dashboard/purchaseCoin">Purchase Coin</Link>
      </li>
      <li className="font-semibold text-lg">
        <Link to="/dashboard/paymentHistory">Payment History</Link>
      </li>
    </ul>
  );
};

export default Sidebar;
