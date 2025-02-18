import PropTypes from "prop-types";
import { BsCoin } from "react-icons/bs";
import { FaBriefcase, FaClock } from "react-icons/fa";

const WorkerStats = ({ submissionCount, pendingSubmission, totalEarning }) => {
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow mb-4 bg-base-100">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaBriefcase className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Submission</div>
        <div className="stat-value">{submissionCount}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaClock className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Pending</div>
        <div className="stat-value">{pendingSubmission}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <BsCoin className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Earning</div>
        <div className="stat-value">{totalEarning}</div>
      </div>
    </div>
  );
};

WorkerStats.propTypes = {
  submissionCount: PropTypes.number.isRequired,
  pendingSubmission: PropTypes.number.isRequired,
  totalEarning: PropTypes.number.isRequired,
};

export default WorkerStats;
