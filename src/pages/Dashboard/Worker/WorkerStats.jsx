import PropTypes from "prop-types";

const WorkerStats = ({ submissionCount, pendingSubmission, totalEarning }) => {
  return (
    <div className="stats stats-vertical md:stats-horizontal shadow mb-4 bg-base-100 text-center">
      <div className="stat">
        <div className="stat-title">Submission</div>
        <div className="stat-value">{submissionCount}</div>
      </div>

      <div className="stat">
        <div className="stat-title">Pending</div>
        <div className="stat-value">{pendingSubmission}</div>
      </div>

      <div className="stat">
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
