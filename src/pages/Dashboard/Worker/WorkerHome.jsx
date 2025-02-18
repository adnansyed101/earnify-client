import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import Stats from "./WorkerStats";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: submissions = {}, isLoading } = useQuery({
    queryKey: ["workerSubmission"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/overview/worker?email=${user.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <Stats
        submissionCount={submissions.data?.submissionCount || 0}
        pendingSubmission={submissions.data?.pendingSubmissionsCount || 0}
        totalEarning={submissions.data.totalEarning?.totalPayableAmount || 0}
      />
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Approved Submissions
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-200 shadow-md rounded-lg whitespace-nowrap">
            <thead>
              <tr>
                <th className="p-2 md:p-4">Task Title</th>
                <th className="p-2 md:p-4">Payable Amount</th>
                <th className="p-2 md:p-4">Buyer Name</th>
                <th className="p-2 md:p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.data.acceptedSubmissions.map((submission) => (
                <tr key={submission._id} className="hover:bg-base-300">
                  <td className="p-2 md:p-4">{submission.task.title}</td>
                  <td className="p-2 md:p-4">
                    {submission.task.payableAmount}
                  </td>
                  <td className="p-2 md:p-4">{submission.buyer.name}</td>
                  <td className="p-2 md:p-4 space-x-2">
                    <span
                      className={`badge ${
                        submission.status === "accepted"
                          ? "badge-success"
                          : submission.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {submission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default WorkerHome;
