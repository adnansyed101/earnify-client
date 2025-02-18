import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const MySubmissions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const itemsPerPage = 5;
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["workerSubmissions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/submission/worker?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  const { isLoading: loadingCount } = useQuery({
    queryKey: ["workerSubmissionsCount"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/submission/worker/count?email=${user?.email}`
      );
      setCount(data.data);
      return data;
    },
  });

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (isLoading || loadingCount) {
    return <Loading />;
  }

  return (
    <section>
      <h2 className="text-lg md:text-3xl font-bold text-center">
        My Submissions
      </h2>
      {submissions.data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-200 shadow-md rounded-lg whitespace-nowrap">
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
                <tr key={submission._id} className="hover:bg-base-300">
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
      ) : (
        <h3 className="text-xl">No submissions maded yet.</h3>
      )}
      {/* Pagination */}
      {submissions.length > 0 && (
        <div className="join flex items-center justify-center mb-4">
          <button className="join-item btn" onClick={handlePreviousPage}>
            «
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={`join-item btn ${
                currentPage === page && "btn-active"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </button>
          ))}
          <button className="join-item btn" onClick={handleNextPage}>
            »
          </button>
        </div>
      )}
    </section>
  );
};

export default MySubmissions;
