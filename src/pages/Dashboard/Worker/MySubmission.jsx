import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MySubmissions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["workerSubmissions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/submission/worker?email=${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-10 mt-6 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Submissions</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg whitespace-nowrap">
            <thead>
              <tr>
                <th className="p-2 md:p-4">Task Title</th>
                <th className="p-2 md:p-4">Buyer Email</th>
                <th className="p-2 md:p-4">Submission Date</th>
                <th className="p-2 md:p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.data.map((submission) => (
                <tr key={submission._id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-4">{submission.task.title}</td>
                  <td className="p-2 md:p-4">{submission.buyerEmail}</td>
                  <td className="p-2 md:p-4">
                    {format(new Date(submission.currentDate), "PP")}
                  </td>
                  <td className="p-2 md:p-4">
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

export default MySubmissions;
