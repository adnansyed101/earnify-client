import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../components/Loading";
import { format } from "date-fns";

const MySubmissions = () => {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/submission`
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-gray-100 py-10 mt-20 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Submissions</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="p-4">Task Title</th>
                <th className="p-4">Submission Detail</th>
                <th className="p-4">Submission Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.data.map((submission) => (
                <tr key={submission._id} className="hover:bg-gray-100">
                  <td className="p-4">{submission.taskTitle}</td>
                  <td className="p-4">{submission.submissionDetails}</td>
                  <td className="p-4">
                    {format(new Date(submission.currentDate), "PP")}
                  </td>
                  <td className="p-4">
                    <span
                      className={`badge ${
                        submission.status === "Approved"
                          ? "badge-success"
                          : submission.status === "Pending"
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
