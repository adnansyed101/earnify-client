import { useState } from "react";

const taskData = {
  title: "Data Entry for Marketing Survey",
  taskDetail:
    "Enter data for a marketing survey. Accuracy and attention to detail are crucial.",
  requiredWorkers: 5,
  payableAmount: "$15.00",
  completionDate: "2025-01-20",
  submissionInfo: "Submit a CSV file containing the entered data.",
  imageURL: "https://via.placeholder.com/150",
};

const UpdateTaskForm = () => {
  const [formData, setFormData] = useState({
    title: taskData.title,
    taskDetail: taskData.taskDetail,
    submissionInfo: taskData.submissionInfo,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Task updated successfully!\n\n${JSON.stringify(formData, null, 2)}`);
    // Replace with actual API call to update the task
  };

  return (
    <section className="bg-gray-100 py-10">
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
              value={formData.title}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Task Detail</label>
            <textarea
              name="taskDetail"
              value={formData.taskDetail}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label font-medium">Required Workers</label>
            <input
              type="number"
              value={taskData.requiredWorkers}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Payable Amount</label>
            <input
              type="text"
              value={taskData.payableAmount}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Completion Date</label>
            <input
              type="date"
              value={taskData.completionDate}
              className="input input-bordered w-full"
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Submission Info</label>
            <textarea
              name="submissionInfo"
              value={formData.submissionInfo}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label font-medium">Task Image URL</label>
            <input
              type="url"
              value={taskData.imageURL}
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
