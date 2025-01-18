import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { format } from "date-fns";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useGetUser from "../../../hooks/useGetUser";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { userDB } = useGetUser();

  const {
    data: task = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task/${id}`);
      return data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionDetail = e.target.submissionDetail.value;

    // Create Submission object
    const submissionData = {
      task: task.data._id,
      buyerEmail: task.data.buyerEmail,
      workerEmail: user?.email,
      submissionDetail: submissionDetail,
      currentDate: new Date(),
      status: "pending",
      worker: userDB?._id,
      buyer: task.data.buyer._id,
    };

    try {
      // Add a submission to submission collection.
      await axiosPublic.post("/submission", submissionData);
      // Update required number of workers from task collection.
      await axiosPublic.patch(`/task/update/requiredWorker/${task.data._id}`, {
        requiredWorkers: task.data.requiredWorkers - 1,
      });
      refetch();
      toast.success("Submission is successfull");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Task Details</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          {/* Task Information */}
          <div>
            <img
              src={task.data.imageURL}
              alt={task.data.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold">{task.data.title}</h3>
            <p className="text-gray-600 mt-2">{task.data.taskDetail}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <p>
                <span className="font-semibold">Required Workers: </span>
                {task.data.requiredWorkers}
              </p>
              <p>
                <span className="font-semibold">Payable Amount: </span>
                {task.data.payableAmount}
              </p>
              <p>
                <span className="font-semibold">Completion Date: </span>
                {format(new Date(task.data.completionDate), "PP")}
              </p>
              <p>
                <span className="font-semibold">Submission Info: </span>
                {task.data.submissionInfo}
              </p>
            </div>
          </div>

          {/* Buyer Information */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img
              src={task.data.buyer.image}
              alt={task.data.buyer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-bold">{task.data.buyer.name}</h4>
              <p className="text-gray-600">{task.data.buyer.email}</p>
            </div>
          </div>

          {/* Submission Form */}
          <div>
            <h3 className="text-xl font-bold mb-4">Submit Your Work</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label font-medium">Submission Detail</label>
                <textarea
                  name="submissionDetail"
                  placeholder="Describe your submission here"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskDetails;
