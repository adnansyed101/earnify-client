import { Link } from "react-router-dom";

const WorkerMenu = () => {
  return (
    <div>
      <>
        <li className="font-semibold text-lg">
          <Link to="/dashboard">Home</Link>
        </li>
        <li className="font-semibold text-lg">
          <Link to="/dashboard/addTask">Task List</Link>
        </li>
        <li className="font-semibold text-lg">
          <Link to="/dashboard/myTasks">My Submission</Link>
        </li>
        <li className="font-semibold text-lg">
          <Link to="/dashboard/purchaseCoin">Withdrawals</Link>
        </li>
        
      </>
    </div>
  );
};

export default WorkerMenu;
