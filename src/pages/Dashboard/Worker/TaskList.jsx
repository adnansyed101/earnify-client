import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const TaskList = () => {
  const [sort, setSort] = useState("");

  const axiosSecure = useAxiosSecure();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", sort],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/task?sort=${sort}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-2xl font-bold md:text-center mb-4">
          {tasks.data.length > 0 ? "Available Tasks" : "No Tasks Availavble"}
        </h2>
        <select
          name="payableAmount"
          id="payableAmount"
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered max-w-xs"
          value={sort}
        >
          <option value="">Sort By Payable Amount</option>
          <option value="dsc">High {">"} Low</option>
          <option value="asc">Low {">"} High</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.data.map((task) => (
          <div
            key={task._id}
            className="card bg-base-100 shadow-lg rounded-lg p-4 space-y-4"
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
