const submissions = [
  {
    id: 1,
    taskTitle: "Data Entry for Marketing Survey",
    submissionDetail: "Submitted CSV file with 500 entries.",
    submissionDate: "2025-01-10",
    status: "Approved",
  },
  {
    id: 2,
    taskTitle: "Social Media Post Design",
    submissionDetail: "Uploaded 3 post designs in PNG format.",
    submissionDate: "2025-01-12",
    status: "Pending",
  },
  {
    id: 3,
    taskTitle: "Product Review Writing",
    submissionDetail: "Submitted 2 product reviews in Word format.",
    submissionDate: "2025-01-13",
    status: "Rejected",
  },
];

const MySubmissions = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Submissions</h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="p-4">Task Title</th>
                <th className="p-4">Submission Detail</th>
                <th className="p-4">Submission Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-100">
                  <td className="p-4">{submission.taskTitle}</td>
                  <td className="p-4">{submission.submissionDetail}</td>
                  <td className="p-4">{submission.submissionDate}</td>
                  <td className="p-4">
                    <span
                      className={`badge ${
                        submission.status === "Approved"
                          ? "badge-success"
                          : submission.status === "Pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {submission.status}
                    </span>
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

export default MySubmissions;
