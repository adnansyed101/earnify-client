import { FaBriefcase, FaDollarSign } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { BsCoin } from "react-icons/bs";

const AdminStats = () => {
  return (
    <div className="stats shadow mb-4">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaBriefcase className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Worker</div>
        <div className="stat-value">{0}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <GrUserWorker className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Buyer</div>
        <div className="stat-value">{0}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <BsCoin className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Available Coin</div>
        <div className="stat-value">{0}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaDollarSign className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Payments</div>
        <div className="stat-value">{0}</div>
      </div>
    </div>
  );
};

export default AdminStats;
