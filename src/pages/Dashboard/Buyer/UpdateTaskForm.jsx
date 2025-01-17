import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../../components/Loading";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";

const UpdateTaskForm = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: task = {}, isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/task/${id}`);
      return data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const taskDetail = form.taskDetail.value;
    const submissionInfo = form.submissionInfo.value;

    try {
      await axiosPublic.patch(`/task/update/${id}`, {
        title,
        taskDetail,
        submissionInfo,
      });
      toast.success("Task Updated");
      navigate("/dashboard/myTasks");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-gray-100 py-10 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Update Task</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-6"
        >
          <div className="form-control">
            <label className="label font-medium">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={task.data.title}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Task Detail</label>
            <textarea
              name="taskDetail"
              defaultValue={task.data.taskDetail}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label font-medium">Required Workers</label>
            <input
              type="number"
              defaultValue={task.data.requiredWorkers}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Payable Amount</label>
            <input
              type="text"
              defaultValue={task.data.payableAmount}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Completion Date</label>
            <DatePicker
              selected={task.data.completionDate}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Submission Info</label>
            <textarea
              name="submissionInfo"
              defaultValue={task.data.submissionInfo}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label font-medium">Task Image URL</label>
            <input
              type="url"
              defaultValue={task.data.imageURL}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Update Task
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateTaskForm;
