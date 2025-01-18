import { useQuery } from "@tanstack/react-query";
import Stats from "./Stats";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";

const BuyerHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    data: submissions = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["submission"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/submission?email=${user.email}`);
      return data;
    },
  });

  const handleViewSubmission = () => {
    setIsOpen(true);
  };

  const handleApprove = async (
    submissionID,
    workerID,
    coins,
    payableAmount
  ) => {
    try {
      // Update Workers coin
      await axiosPublic.patch(`/user/updatecoin/${workerID}`, {
        coin: coins + payableAmount,
      });
      // Update status of submission.
      await axiosPublic.patch(`/submission/update/status/${submissionID}`, {
        status: "accepted",
      });
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Update Status and also increase the task required worker by 1.
  const handleReject = async (submissionID, taskID, requiredWorker) => {
    try {
      await axiosPublic.patch(`/submission/update/status/${submissionID}`, {
        status: "rejected",
      });
      await axiosPublic.patch(`/task/update/requiredWorker/${taskID}`, {
        requiredWorkers: requiredWorker + 1,
      });
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <Stats />
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Tasks to Review
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="p-4">Worker Name</th>
                  <th className="p-4">Task Title</th>
                  <th className="p-4">Payable Amount</th>
                  <th className="p-4">View Submission</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.data.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-100">
                    <td className="p-4">{submission.worker.name}</td>
                    <td className="p-4">{submission.task.title}</td>
                    <td className="p-4">{submission.task.payableAmount}</td>
                    <td className="p-4">
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
                    <td className="p-4 space-x-2">
                      {submission.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleApprove(
                                submission._id,
                                submission.worker._id,
                                submission.worker.coin,
                                submission.task.payableAmount
                              )
                            }
                            className="btn btn-success btn-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleReject(
                                submission._id,
                                submission.task._id,
                                submission.task.requiredWorkers
                              )
                            }
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
    </div>
  );
};

export default BuyerHome;
