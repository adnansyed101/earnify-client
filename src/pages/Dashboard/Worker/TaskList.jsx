import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const TaskList = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/task`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Available Tasks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.data.map((task) => (
            <div
              key={task._id}
              className="card bg-white shadow-lg rounded-lg p-4 space-y-4"
            >
              <h3 className="text-xl font-bold">{task.title}</h3>
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
