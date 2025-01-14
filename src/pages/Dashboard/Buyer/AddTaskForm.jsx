import { useState } from "react";

const AddTaskForm = () => {
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDetail: "",
    requiredWorkers: "",
    payableAmount: "",
    completionDate: "",
    submissionInfo: "",
    taskImageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Added:", formData);
    alert("Task has been added successfully!");
    // Reset the form
    setFormData({
      taskTitle: "",
      taskDetail: "",
      requiredWorkers: "",
      payableAmount: "",
      completionDate: "",
      submissionInfo: "",
      taskImageUrl: "",
    });
  };

  return (
    <section className="bg-gray-100 py-10 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Add a New Task</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 space-y-4"
        >
          <div className="form-control">
            <label className="label font-medium">Task Title</label>
            <input
              type="text"
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleChange}
              placeholder="Enter task title"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Task Detail</label>
            <textarea
              name="taskDetail"
              value={formData.taskDetail}
              onChange={handleChange}
              placeholder="Provide detailed task description"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-medium">Required Workers</label>
              <input
                type="number"
                name="requiredWorkers"
                value={formData.requiredWorkers}
                onChange={handleChange}
                placeholder="Enter number of workers"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-medium">Payable Amount</label>
              <input
                type="number"
                name="payableAmount"
                value={formData.payableAmount}
                onChange={handleChange}
                placeholder="Enter payable amount"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label font-medium">Completion Date</label>
            <input
              type="date"
              name="completionDate"
              value={formData.completionDate}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Submission Info</label>
            <textarea
              name="submissionInfo"
              value={formData.submissionInfo}
              onChange={handleChange}
              placeholder="Provide instructions for submission"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label font-medium">Task Image URL</label>
            <input
              type="url"
              name="taskImageUrl"
              value={formData.taskImageUrl}
              onChange={handleChange}
              placeholder="Enter image URL for the task"
              className="input input-bordered w-full"
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
