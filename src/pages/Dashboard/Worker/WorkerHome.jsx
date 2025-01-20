import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import Stats from "./WorkerStats";

const WorkerHome = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: submissions = {}, isLoading } = useQuery({
    queryKey: ["workerSubmission"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/overview/worker?email=${user.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-16">
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <Stats
        submissionCount={submissions.data?.submissionCount || 0}
        pendingSubmission={submissions.data?.pendingSubmissionsCount || 0}
        totalEarning={submissions.data.totalEarning?.totalPayableAmount || 0}
      />
      <section className="py-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Approved Submissions
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg whitespace-nowrap">
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
                  <tr key={submission._id} className="hover:bg-gray-100">
                    <td className="p-2 md:p-4">{submission.task.title}</td>
                    <td className="p-2 md:p-4">{submission.task.payableAmount}</td>
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
        </div>
      </section>
    </div>
  );
};

export default WorkerHome;
