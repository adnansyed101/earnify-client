import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import { format } from "date-fns";

const AllTasks = () => {
  const [sort, setSort] = useState("");

  const axiosPublic = useAxiosPublic();
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["allTasks", sort],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task?sort=${sort}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="py-20 min-h-[calc(100vh-30px)] bg-base-200 ">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div></div>
          <h2 className="text-4xl font-bold md:text-center mb-4">
            {tasks.data.length > 0 ? "All Tasks" : "No Tasks Availavble"}
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
      </div>
    </section>
  );
};

export default AllTasks;
