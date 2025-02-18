import { Link } from "react-router-dom";

const WorkerMenu = () => {
  return (
    <>
      <li className="font-semibold text-lg">
        <Link to="/dashboard">Home</Link>
      </li>
      <li className="font-semibold text-lg">
        <Link to="/dashboard/tasklist">Task List</Link>
      </li>
      <li className="font-semibold text-lg">
        <Link to="/dashboard/mysubmission">My Submission</Link>
      </li>
      <li className="font-semibold text-lg">
        <Link to="/dashboard/withdrawals">Withdrawals</Link>
      </li>
    </>
  );
};

export default WorkerMenu;
