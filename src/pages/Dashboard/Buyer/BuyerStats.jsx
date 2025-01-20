import PropTypes from "prop-types";
import { FaBriefcase, FaClock, FaDollarSign } from "react-icons/fa";

const BuyerStats = ({ totalTasks, pendingTasks, totalPayments }) => {
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow mb-4">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaBriefcase className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Tasks</div>
        <div className="stat-value">{totalTasks}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaClock className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Pending Tasks</div>
        <div className="stat-value">{pendingTasks}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaDollarSign className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Payments</div>
        <div className="stat-value">{totalPayments}</div>
      </div>
    </div>
  );
};

BuyerStats.propTypes = {
  totalTasks: PropTypes.number.isRequired,
  pendingTasks: PropTypes.number.isRequired,
  totalPayments: PropTypes.number.isRequired,
};

export default BuyerStats;
