const tasks = [
  {
    id: 1,
    workerName: "Alice Johnson",
    taskTitle: "Data Entry for Marketing Survey",
    payableAmount: "$15.00",
  },
  {
    id: 2,
    workerName: "Bob Smith",
    taskTitle: "Social Media Post Design",
    payableAmount: "$20.00",
  },
  {
    id: 3,
    workerName: "Catherine Brown",
    taskTitle: "Product Review Writing",
    payableAmount: "$10.00",
  },
];

const TasksToReviewTable = () => {
  const handleViewSubmission = (taskId) => {
    alert(`Viewing submission for Task ID: ${taskId}`);
  };

  const handleApprove = (taskId) => {
    alert(`Approved Task ID: ${taskId}`);
  };

  const handleReject = (taskId) => {
    alert(`Rejected Task ID: ${taskId}`);
  };

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Tasks to Review</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="p-4">Worker Name</th>
                <th className="p-4">Task Title</th>
                <th className="p-4">Payable Amount</th>
                <th className="p-4">View Submission</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-100">
                  <td className="p-4">{task.workerName}</td>
                  <td className="p-4">{task.taskTitle}</td>
                  <td className="p-4">{task.payableAmount}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewSubmission(task.id)}
                      className="btn btn-primary btn-sm"
                    >
                      View Submission
                    </button>
                  </td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleApprove(task.id)}
                      className="btn btn-success btn-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(task.id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TasksToReviewTable;
