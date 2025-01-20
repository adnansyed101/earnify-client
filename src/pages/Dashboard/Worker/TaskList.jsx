import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TaskList = () => {
  const axiosPublic = useAxiosPublic();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="py-10 mt-6">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {tasks.data.length > 0 ? "Available Tasks" : "No Tasks Availavble"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.data.map((task) => (
            <div
              key={task._id}
              className="card bg-white shadow-lg rounded-lg p-4 space-y-4"
            >
              <h3 className="text-xl font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                {task.title}
              </h3>
              <p>
                <span className="font-semibold">Buyer: </span>
                {task.buyer.name}
              </p>
              <p>
                <span className="font-semibold">Completion Date: </span>
                {format(new Date(task.completionDate), "PP")}
              </p>
              <p>
                <span className="font-semibold">Payable Amount: </span>
                {task.payableAmount}
              </p>
              <p>
                <span className="font-semibold">Required Workers: </span>
                {task.requiredWorkers}
              </p>
              <Link
                to={`/dashboard/taskDetails/${task._id}`}
                className="btn btn-primary btn-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaskList;
