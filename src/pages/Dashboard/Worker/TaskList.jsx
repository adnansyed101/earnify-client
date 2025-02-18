import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <h2 className="text-lg md:text-3xl font-bold text-center mb-4">
        {tasks.data.length > 0 ? "Available Tasks" : "No Tasks Availavble"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.data.map((task) => (
          <div
            key={task._id}
            className="card bg-base-200 shadow-lg rounded-lg p-4 space-y-4"
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
    </section>
  );
};

export default TaskList;
