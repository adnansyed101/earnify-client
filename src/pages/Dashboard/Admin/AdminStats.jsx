import { FaBriefcase, FaDollarSign } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { BsCoin } from "react-icons/bs";
import PropTypes from "prop-types";

const AdminStats = ({
  totalWorker,
  totalBuyer,
  totalAvailableCoin,
  totalPayment,
}) => {
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow mb-4 bg-base-200">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaBriefcase className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Worker</div>
        <div className="stat-value">{totalWorker}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <GrUserWorker className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Buyer</div>
        <div className="stat-value">{totalBuyer}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <BsCoin className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Available Coin</div>
        <div className="stat-value">{totalAvailableCoin}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaDollarSign className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Payments</div>
        <div className="stat-value">{totalPayment}</div>
      </div>
    </div>
  );
};

AdminStats.propTypes = {
  totalWorker: PropTypes.number.isRequired,
  totalBuyer: PropTypes.number.isRequired,
  totalAvailableCoin: PropTypes.number.isRequired,
  totalPayment: PropTypes.number.isRequired,
};

export default AdminStats;
