import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <li className="font-semibold text-lg">
        <Link to="/dashboard">Home</Link>
      </li>
      <li className="font-semibold text-lg">
        <Link to="/dashboard/manageusers">Manage Users</Link>
      </li>
      <li className="font-semibold text-lg">
        <Link to="/dashboard/managetasks">Manage Task</Link>
      </li>
    </>
  );
};

export default AdminMenu;
