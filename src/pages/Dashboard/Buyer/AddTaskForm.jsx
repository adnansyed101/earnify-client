import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { imageUpload } from "../../../api/utils";
import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useGetUser from "../../../hooks/useGetUser";
import { useNavigate } from "react-router-dom";

const AddTaskForm = () => {
  const axiosPublic = useAxiosPublic();
  const { userDB, refetch } = useGetUser();
  const navigate = useNavigate();
  const [completionDate, setCompletionDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const taskDetail = form.taskDetail.value;
    const requiredWorkers = parseFloat(form.requiredWorkers.value);
    const payableAmount = parseFloat(form.payableAmount.value);
    const totalPayableAmount = requiredWorkers * payableAmount;
    const submissionInfo = form.submissionInfo.value;

    if (totalPayableAmount > userDB?.coin) {
      toast.error("Not Enough Coins. Purchase Coins");
      navigate("/purchaseCoin");
      return;
    }

    const image = form.image.files[0];
    const imageURL = await imageUpload(image);

    // Create Task object
    const taskData = {
      title,
      taskDetail,
      requiredWorkers,
      payableAmount,
      completionDate,
      submissionInfo,
      imageURL,
      buyerEmail: userDB.email,
      buyer: userDB._id,
    };

    try {
      await axiosPublic.post("/task", taskData);
      await axiosPublic.patch(`/user/updatecoin/${userDB?._id}`, {
        coin: userDB?.coin - totalPayableAmount,
      });
      refetch();
      toast.success("Data added successfully.");
    } catch (err) {
      toast.err(err.message);
    }
  };

  return (
    <section className="bg-gray-100 py-10 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Add a New Task</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 space-y-4"
        >
          {/* Task Title */}
          <div className="form-control">
            <label className="label font-medium">Task Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Task Detail */}
          <div className="form-control">
            <label className="label font-medium">Task Detail</label>
            <textarea
              name="taskDetail"
              placeholder="Provide detailed task description"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>
          {/* Required Workers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-medium">Required Workers</label>
              <input
                type="number"
                name="requiredWorkers"
                placeholder="Enter number of workers"
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Payable Amount */}
            <div className="form-control">
              <label className="label font-medium">Payable Amount</label>
              <input
                type="number"
                name="payableAmount"
                placeholder="Enter payable amount"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>
          {/* Completion Date */}
          <div className="form-control">
            <label className="label font-medium">Completion Date</label>
            <DatePicker
              selected={completionDate}
              onChange={(date) => setCompletionDate(date)}
              minDate={new Date()}
              className="input input-bordered w-full"
            />
          </div>
          {/* Submission Info */}
          <div className="form-control">
            <label className="label font-medium">Submission Info</label>
            <textarea
              name="submissionInfo"
              placeholder="Provide instructions for submission"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>
          {/* Task Image */}
          <div className="form-control">
            <label className="label font-medium">Task Image</label>
            <input
              required
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="form-control mt-4">
            <button className="btn btn-primary w-full" type="submit">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTaskForm;
