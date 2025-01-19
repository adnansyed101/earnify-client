import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import { toast } from "react-toastify";

const ManageTasks = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allTasks = {}, isLoading, refetch } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task`);
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
        await axiosPublic.delete(`/task/delete/${task._id}`);
        await axiosPublic.patch(`/user/updatecoin/${task.buyer._id}`, {
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
    <section className="bg-gray-100 py-10 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Manage Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Detail</th>
                <th className="p-4">Required Workers</th>
                <th className="p-4">Payable Amount</th>
                <th className="p-4">Completion Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.data.map((task) => (
                <tr key={task._id} className="hover:bg-gray-100">
                  <td className="p-4">{task.title}</td>
                  <td className="p-4">{task.taskDetail}</td>
                  <td className="p-4 text-center">{task.requiredWorkers}</td>
                  <td className="p-4 text-center">${task.payableAmount}</td>
                  <td className="p-4 text-center">
                    {format(new Date(task.completionDate), "PP")}
                  </td>
                  <td className="p-4">
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
