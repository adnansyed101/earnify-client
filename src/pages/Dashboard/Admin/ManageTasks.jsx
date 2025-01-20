import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure()

  const {
    data: allTasks = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task`);
      return data;
    },
  });

  const handleDeleteTask = async (task) => {
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
        <h2 className="text-3xl font-bold text-center mb-8">Manage Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="p-2 md:p-4">Title</th>
                <th className="hidden md:block p-2 md:p-4">Detail</th>
                <th className="p-2 md:p-4">Required Workers</th>
                <th className="p-2 md:p-4">Payable Amount</th>
                <th className="p-2 md:p-4">Completion Date</th>
                <th className="p-2 md:p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.data.map((task) => (
                <tr key={task._id} className="hover:bg-gray-100">
                  <td className="p-2 md:p-4">{task.title}</td>
                  <td className="hidden md:block p-2 md:p-4">
                    {task.taskDetail}
                  </td>
                  <td className="p-2 md:p-4 text-center">
                    {task.requiredWorkers}
                  </td>
                  <td className="p-2 md:p-4 text-center">
                    ${task.payableAmount}
                  </td>
                  <td className="p-2 md:p-4 text-center">
                    {format(new Date(task.completionDate), "PP")}
                  </td>
                  <td className="p-2 md:p-4">
                    <button
                      onClick={() => handleDeleteTask(task)}
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

export default ManageTasks;
