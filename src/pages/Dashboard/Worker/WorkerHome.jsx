import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import Stats from "./WorkerStats";
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

  const lineChartData = {
    labels: ["Submission", "Pending", "Earning"],
    datasets: [
      {
        label: "Amount",
        data: [
          submissions.data?.pendingSubmissionsCount,
          submissions.data?.pendingSubmissionsCount,
          submissions.data?.totalEarning?.totalPayableAmount,
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
        <Stats
          submissionCount={submissions.data?.submissionCount || 0}
          pendingSubmission={submissions.data?.pendingSubmissionsCount || 0}
          totalEarning={submissions.data?.totalEarning?.totalPayableAmount || 0}
        />
      </div>
      <div className="relative md:w-1/2 mx-auto">
        <Line data={lineChartData} />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-center mb-4">
          Approved Submissions
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100 shadow-md rounded-lg whitespace-nowrap">
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
      </div>
    </section>
  );
};

export default WorkerHome;
