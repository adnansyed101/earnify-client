import { useQuery } from "@tanstack/react-query";
import BuyerStats from "./BuyerStats";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BuyerHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: submissions = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyerSubmission"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/overview/buyer?email=${user.email}`
      );
      return data;
    },
  });

  const handleViewSubmission = () => {
    setIsOpen(true);
  };

  const handleApprove = async (submission) => {
    try {
      // Update Workers coin
      await axiosSecure.patch(`/user/updatecoin/${submission.worker._id}`, {
        coin: submission.worker.coin + submission.task.payableAmount,
      });
      // Update status of submission.
      await axiosSecure.patch(`/submission/update/status/${submission._id}`, {
        status: "accepted",
      });
      // Create Notification
      await axiosSecure.post("/notification", {
        message: `Earned ${submission.task.payableAmount} from ${submission.buyerEmail} for completing ${submission.task.title}`,
        toEmail: submission.worker.email,
        time: new Date(),
      });
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Update Status and also increase the task required worker by 1.
  const handleReject = async (submission) => {
    try {
      await axiosSecure.patch(`/submission/update/status/${submission._id}`, {
        status: "rejected",
      });
      await axiosSecure.patch(
        `/task/update/requiredWorker/${submission.task._id}`,
        {
          requiredWorkers: submission.task.requiredWorkers + 1,
        }
      );
      await axiosSecure.post("/notification", {
        message: `${submission.task.title} was rejected.`,
        toEmail: submission.worker.email,
        time: new Date(),
      });
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const lineChartData = {
    labels: ["Tasks", "Pending", "Payments"],
    datasets: [
      {
        label: "Amount",
        data: [
          submissions.data?.overview[0]?.countOfTasks,
          submissions.data?.overview[0]?.totalRequiredWorkers,
          submissions.data?.totalPayments[0]?.totalPaid,
        ],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-2">Overview</h1>
        <BuyerStats
          totalTasks={submissions.data?.overview[0]?.countOfTasks || 0}
          pendingTasks={
            submissions.data?.overview[0]?.totalRequiredWorkers || 0
          }
          totalPayments={submissions.data?.totalPayments[0]?.totalPaid || 0}
        />
      </div>
      <div className="relative md:w-1/2 mx-auto">
        <Line data={lineChartData} />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Tasks to Review</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100 shadow-md rounded-lg whitespace-nowrap text-center">
            <thead>
              <tr>
                <th className="p-2 md:p-4">Worker Name</th>
                <th className="p-2 md:p-4">Task Title</th>
                <th className="p-2 md:p-4">Payable Amount</th>
                <th className="p-2 md:p-4">View Submission</th>
                <th className="p-2 md:p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.data.submissions.map((submission) => (
                <tr key={submission._id} className="hover:bg-base-300">
                  <td className="p-2 md:p-4">{submission.worker.name}</td>
                  <td className="p-2 md:p-4">{submission.task.title}</td>
                  <td className="p-2 md:p-4">
                    {submission.task.payableAmount}
                  </td>
                  <td className="p-2 md:p-4">
                    <button
                      onClick={() => handleViewSubmission(submission._id)}
                      className="btn btn-primary btn-sm"
                    >
                      View Submission
                    </button>
                    <Modal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      submission={submission}
                    />
                  </td>
                  <td className="p-2 md:p-4 flex gap-2 justify-center">
                    {submission.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApprove(submission)}
                          className="btn btn-success btn-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(submission)}
                          className="btn btn-error btn-sm"
                        >
                          Reject
                        </button>
                      </>
                    ) : submission.status === "accepted" ? (
                      <div className="badge badge-success">Accepted</div>
                    ) : (
                      <div className="badge badge-error">Rejected</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BuyerHome;
