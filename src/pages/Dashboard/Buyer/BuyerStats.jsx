import { FaBriefcase, FaClock, FaDollarSign } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";

const BuyerStats = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/task/overview?email=${user.email}`
      );
      return data;
    },
  });

  const { data: totalPayments = {}, isLoading: loadingPayments } = useQuery({
    queryKey: ["totalPayments"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/payment/totalPayment?email=${user.email}`
      );
      return data;
    },
  });

  if (isLoading || loadingPayments) {
    return <Loading />;
  }

  return (
    <div className="stats shadow mb-4">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaBriefcase className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Tasks</div>
        <div className="stat-value">{overview.data[0]?.countOfTasks || 0}</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaClock className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Pending Tasks</div>
        <div className="stat-value">
          {overview.data[0]?.totalRequiredWorkers || 0}
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <FaDollarSign className="inline-block h-8 w-8 stroke-current" />
        </div>
        <div className="stat-title">Total Payments</div>
        <div className="stat-value">{totalPayments.data[0]?.totalPaid || 0}</div>
      </div>
    </div>
  );
};

export default BuyerStats;
