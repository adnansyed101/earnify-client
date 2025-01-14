const myTasks = [
  {
    id: 1,
    taskTitle: "Data Entry for Marketing Survey",
    requiredWorkers: 5,
    payableAmount: "$15.00",
    completionDate: "2025-01-20",
  },
  {
    id: 2,
    taskTitle: "Social Media Post Design",
    requiredWorkers: 3,
    payableAmount: "$20.00",
    completionDate: "2025-01-25",
  },
  {
    id: 3,
    taskTitle: "Product Review Writing",
    requiredWorkers: 2,
    payableAmount: "$10.00",
    completionDate: "2025-01-18",
  },
];

const MyTasks = () => {
  const handleUpdate = (taskId) => {
    alert(`Update Task ID: ${taskId}`);
    // Implement update logic here
  };

  const handleDelete = (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      alert(`Deleted Task ID: ${taskId}`);
      // Implement delete logic here
    }
  };

  return (
    <section className="bg-gray-100 py-10 mt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Tasks</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="p-4">Task Title</th>
                <th className="p-4">Required Workers</th>
                <th className="p-4">Payable Amount</th>
                <th className="p-4">Completion Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-100">
                  <td className="p-4">{task.taskTitle}</td>
                  <td className="p-4">{task.requiredWorkers}</td>
                  <td className="p-4">{task.payableAmount}</td>
                  <td className="p-4">{task.completionDate}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
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

export default MyTasks;
