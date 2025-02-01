import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useGetUser from "../../../hooks/useGetUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch: userRefetch } = useGetUser();

  const {
    data: tasks = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task/user/${user?.email}`);
      return data;
    },
  });

  const handleDelete = async (task) => {
    const refillAmount = task.requiredWorkers * task.payableAmount;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      try {
        await axiosSecure.delete(`/task/delete/${task._id}`);
        await axiosSecure.patch(`/user/updatecoin/${task.buyer._id}`, {
          coin: task.buyer.coin + refillAmount,
        });
        refetch();
        userRefetch();
        toast.warn("Task Deleted");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-10 mt-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">My Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-200 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="p-2 md:p-4">Task Title</th>
                <th className="p-2 md:p-4">Required Workers</th>
                <th className="p-2 md:p-4">Payable Amount</th>
                <th className="p-2 md:p-4">Completion Date</th>
                <th className="p-2 md:p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.data.map((task) => (
                <tr key={task._id} className="hover:bg-base-300">
                  <td className="p-2 md:p-4 whitespace-nowrap">{task.title}</td>
                  <td className="p-2 md:p-4">{task.requiredWorkers}</td>
                  <td className="p-2 md:p-4">{task.payableAmount}</td>
                  <td className="p-2 md:p-4">
                    {format(new Date(task.completionDate), "PP")}
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link
                      to={`/dashboard/task/update/${task._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(task)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
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

export default MyTasks;
