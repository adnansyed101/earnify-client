import AdminStats from "./AdminStats";

const AdminHome = () => {
  return (
    <div className="mt-12">
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <AdminStats />
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Withdraw Request
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="p-4">Worker Name</th>
                  <th className="p-4">Withdraw Coins</th>
                  <th className="p-4">Withdraw Amount</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* {submissions.data.submissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-100">
                    <td className="p-4">{submission.worker.name}</td>
                    <td className="p-4">{submission.task.title}</td>
                    <td className="p-4">{submission.task.payableAmount}</td>

                    <td className="p-4 space-x-2">
                      {submission.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleApprove(
                                submission._id,
                                submission.worker._id,
                                submission.worker.coin,
                                submission.task.payableAmount
                              )
                            }
                            className="btn btn-success btn-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleReject(
                                submission._id,
                                submission.task._id,
                                submission.task.requiredWorkers
                              )
                            }
                            className="btn btn-error btn-sm"
                          >
                            Reject
                          </button>
                        </>
                      ) : submission.status === "accepted" ? (
                        <div className="badge badge-success">Accepted</div>
                      ) : (
                        <div className="badge badge-error">Rejected</div>
                      )}
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
