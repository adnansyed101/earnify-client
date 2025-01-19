import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import AdminStats from "./AdminStats";
import Loading from "../../../components/Loading";
import { toast } from "react-toastify";

const AdminHome = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: adminOverview = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/overview/admin");
      return data;
    },
  });

  const handleApprove = async (
    workerID,
    workerCoin,
    withdrawalCoin,
    withdrawalID
  ) => {
    try {
      await axiosPublic.patch(`/user/updatecoin/${workerID}`, {
        coin: workerCoin - withdrawalCoin,
      });
      await axiosPublic.patch(`/withdrawal/status/${withdrawalID}`, {
        status: "accepted",
      });
      refetch();
      toast.success("Accepted Withdrawal.");
    } catch (err) {
      toast.err(err.message);
    }
  };

  const handleReject = async (withdrawalID) => {
    try {
      await axiosPublic.patch(`/withdrawal/status/${withdrawalID}`, {
        status: "rejected",
      });
      refetch();
      toast.success("Withdrawal Rejected");
    } catch (err) {
      toast.err(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  console.log(adminOverview);

  return (
    <div className="mt-12">
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <AdminStats
        totalWorker={adminOverview.data?.totalWorker || 0}
        totalBuyer={adminOverview.data?.totalBuyer || 0}
        totalAvailableCoin={
          adminOverview.data.totalAvailableCoin[0]?.totalCoins || 0
        }
        totalPayment={adminOverview.data.totalPayment[0]?.totalPaid || 0}
      />
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
                {adminOverview.data.pendingPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-100">
                    <td className="p-4">{payment.worker.name}</td>
                    <td className="p-4">{payment.withdrawalCoin}</td>
                    <td className="p-4">$ {payment.withdrawalAmount}</td>

                    <td className="p-4 space-x-2">
                      {payment.status === "pending" ? (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() =>
                              handleApprove(
                                payment.worker._id,
                                payment.worker.coin,
                                payment.withdrawalCoin,
                                payment._id
                              )
                            }
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(payment._id)}
                            className="btn btn-error btn-sm"
                          >
                            Reject
                          </button>
                        </>
                      ) : payment.status === "accepted" ? (
                        <div className="badge badge-success">Accepted</div>
                      ) : (
                        <div className="badge badge-error">Rejected</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminHome;
