import { useQuery } from "@tanstack/react-query";
import { BsCoin } from "react-icons/bs";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../Loading";

const BestWorkerSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: bestWorkers = {}, isLoading } = useQuery({
    queryKey: ["bestWorkers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user/bestworker`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {bestWorkers.data.length > 0 && (
        <section className="py-10 bg-base-200">
          <div className="container mx-auto px-2">
            <h2 className="text-3xl font-bold text-center mb-8">
              Best Workers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {bestWorkers.data.map((worker) => (
                <div
                  key={worker._id}
                  className="card shadow-lg p-6 rounded-lg flex flex-col items-center bg-base-100 border"
                >
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={worker.image} alt={worker.name} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-4">{worker.name}</h3>
                  <p className="flex gap-1 items-center">
                    {worker.coin} <BsCoin />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BestWorkerSection;
