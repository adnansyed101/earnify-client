import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading";
import { format } from "date-fns";

const ManageTasks = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allTasks = {}, isLoading } = useQuery({
    queryKey: ["allTasks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task`);
      return data;
    },
  });

  const handleDeleteTask = (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      console.log("Deleted " + taskId);
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
                <tr key={task.id} className="hover:bg-gray-100">
                  <td className="p-4">{task.title}</td>
                  <td className="p-4">{task.taskDetail}</td>
                  <td className="p-4 text-center">{task.requiredWorkers}</td>
                  <td className="p-4 text-center">${task.payableAmount}</td>
                  <td className="p-4 text-center">
                    {format(new Date(task.completionDate), "PP")}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteTask(task.id)}
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
