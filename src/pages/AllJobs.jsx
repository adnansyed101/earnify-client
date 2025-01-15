import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import { format } from "date-fns";

const AllJobs = () => {
  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/job`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-gray-100 pb-10 pt-20 min-h-[calc(100vh-20px)]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">All Jobs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobs && jobs.data.length > 0 ? (
            jobs.data.map((job) => (
              <div
                key={job._id}
                className="card bg-base-200 shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={job.imageURL}
                  alt={job.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl text-neutral font-semibold mb-2">{job.title}</h3>
                  <p className=" text-neutral">{job.taskDetail}</p>
                  <p className="mb-4 text-neutral">
                    Completion Date:{" "}
                    {format(new Date(job.completionDate), "PP")}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary font-bold">
                      $ {job.payableAmount}
                    </span>
                    <button className="btn btn-primary btn-sm text-neutral">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>No jobs here</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllJobs;
