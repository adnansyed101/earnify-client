import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import { format } from "date-fns";

const MyTasks = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: tasks = {}, isLoading } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task/user/${user?.email}`);
      return data;
    },
  });

  const handleUpdate = (taskId) => {
    alert(`Update Task ID: ${taskId}`);
    // Implement update logic here
  };

  const handleDelete = (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      alert(`Deleted Task ID: ${taskId}`);
      // Implement delete logic here
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-gray-100 py-10 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="p-4">Task Title</th>
                <th className="p-4">Required Workers</th>
                <th className="p-4">Payable Amount</th>
                <th className="p-4">Completion Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.data.map((task) => (
                <tr key={task._id} className="hover:bg-gray-100">
                  <td className="p-4">{task.title}</td>
                  <td className="p-4">{task.requiredWorkers}</td>
                  <td className="p-4">{task.payableAmount}</td>
                  <td className="p-4">
                    {format(new Date(task.completionDate), "PP")}
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
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
